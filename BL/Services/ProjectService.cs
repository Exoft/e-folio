using AutoMapper;
using eFolio.DTO;
using eFolio.DTO.Common;
using eFolio.EF;
using eFolio.Elastic;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace eFolio.BL
{
    public class ProjectService : IProjectService
    {
        private readonly IMapper mapper;
        private ProjectRepository projectRepository;
        private ElasticSearch elastic;

        public ProjectService(eFolioDBContext DBContext, IMapper mapper)
        {
            projectRepository = new ProjectRepository(DBContext);
            elastic = new ElasticSearch();
            this.mapper = mapper;
        }

        public async Task AddAsync(Project item)
        {
            ProjectEntity pe = mapper.Map<ProjectEntity>(item);
            await projectRepository.AddAsync(pe);

            item.UpdateId(pe.Id);
            ElasticProjectData epd = mapper.Map<ElasticProjectData>(item);

            var list = (await projectRepository.GetItemsListAsync()).ToList();
            int newId = list[list.Count - 1].Id;
            epd.Id = newId;

            elastic.AddItem(epd);
        }

        public async Task DeleteAsync(int id)
        {
            await projectRepository.DeleteAsync(id);

            elastic.DeleteProjectItem(id);
        }

        public async Task<Project> GetItemAsync(int id, DescriptionKind isExtended, params string[] includedProperties)
        {
            var projectEntity = await projectRepository.GetItemAsync(id, includedProperties);
            var elasticProject = elastic.GetProjectById(id, isExtended);

            return await GetMergeProjectAsync(projectEntity, elasticProject);
        }

        public async Task<IEnumerable<Project>> GetItemsListAsync(DescriptionKind descriptionKind)
        {
            var projectEntities = await projectRepository.GetItemsListAsync();
            var elasticProjects = GetElasticProjects(projectEntities, descriptionKind).ToList();

            List<Project> list = new List<Project>();

            foreach (var project in projectEntities)
            {
                ElasticProjectData elasticProject =
                    elasticProjects.Find(elp => elp.Id == project.Id) ?? new ElasticProjectData();

                list.Add(await GetMergeProjectAsync(project, elasticProject));
            }
            return list;
        }

        public async Task<IEnumerable<Project>> SearchAsync(string request, Paging paging, DescriptionKind isExtended)
        {
            var elasticProjects = elastic.SearchItemsProject(request, paging, isExtended);
            var projectEntities = await GetEntityProjectsAsync(elasticProjects);

            var e1 = projectEntities.GetEnumerator();
            var e2 = elasticProjects.GetEnumerator();
            List<Project> list = new List<Project>();
            while (e1.MoveNext() && e2.MoveNext())
            {
                list.Add(await GetMergeProjectAsync(e1.Current, e2.Current));
            }
            return list;
        }

        public async Task UpdateAsync(Project item)
        {
            ProjectEntity oldProjectEntity = await projectRepository.GetItemAsync(item.Id);

            if (oldProjectEntity == null)
            {
                return;
            }

            await projectRepository.UpdateAsync(new ProjectEntity()
            {
                Id = item.Id,
                Name = item.Name,
                Context = oldProjectEntity.Context,
                ContextId = oldProjectEntity.ContextId,
                Developers = oldProjectEntity.Developers,
                PhotoLink = oldProjectEntity.PhotoLink
            });

            elastic.UpdateProjectData(mapper.Map<ElasticProjectData>(item));
        }

        public Task<int> GetSizeAsync()
        {
            return projectRepository.GetSizeAsync();
        }

        public async Task UpdateDetailsAsync(int project, Context context)
        {
            ProjectEntity oldProjectEntity = await projectRepository.GetItemAsync(project);
            if (oldProjectEntity == null)
            {
                return;
            }

            oldProjectEntity.Context.Update(context);

            await projectRepository.UpdateAsync(oldProjectEntity);
        }

        /// <summary>
        /// Updates existing screenshots, or adds new.
        /// </summary>
        /// <param name="project"></param>
        /// <param name="files"></param>
        public async Task UpdateScreenshotsAsync(int project, Dictionary<int, FolioFile> files)
        {
            ProjectEntity oldProjectEntity = await projectRepository.GetItemAsync(project);
            if (oldProjectEntity == null)
            {
                return;
            }

            List<int> ids = oldProjectEntity.Context.ScreenLinkIds();
            foreach (var item in files)
            {
                var where = ids.BinarySearch(item.Key);

                if (where > -1)
                {
                    oldProjectEntity.Context.ScreenLinks[where].Update(item.Value);
                }
                else
                {
                    oldProjectEntity.Context.ScreenLinks.Add(
                        new FolioFileEntity(item.Value, oldProjectEntity.ContextId)
                    );
                }
            }

            await projectRepository.UpdateAsync(oldProjectEntity);
        }

        public async Task DeleteScreeenshotsAsync(int project, int[] deleted)
        {
            ProjectEntity oldProjectEntity = await projectRepository.GetItemAsync(project);
            if (oldProjectEntity == null)
            {
                return;
            }

            List<int> ids = oldProjectEntity.Context.ScreenLinkIds();
            foreach (var id in deleted)
            {
                var where = ids.BinarySearch(id);
                if (where > -1)
                {
                    oldProjectEntity.Context.ScreenLinks.RemoveAt(where);
                }
            }
            await projectRepository.UpdateAsync(oldProjectEntity);
        }

        private IEnumerable<ElasticProjectData> GetElasticProjects(IEnumerable<ProjectEntity> projects, DescriptionKind isExtended)
        {
            foreach (var item in projects)
            {
                yield return elastic.GetProjectById(item.Id, isExtended);
            }
        }

        private async Task<IEnumerable<ProjectEntity>> GetEntityProjectsAsync(IEnumerable<ElasticProjectData> projects)
        {
            List<ProjectEntity> list = new List<ProjectEntity>();
            foreach (var item in projects)
            {
                list.Add(await projectRepository.GetItemAsync(item.Id));
            }
            return list;
        }

        private async Task<Project> GetMergeProjectAsync(ProjectEntity projectEntity, ElasticProjectData elasticProjectData)
        {
            var project = mapper.Map<Project>(Tuple.Create(elasticProjectData, projectEntity));
            if (projectEntity.PhotoLink != null)
            {
                project.HasPhoto(
                    await File.ReadAllBytesAsync(projectEntity.PhotoLink),
                    Path.GetExtension(projectEntity.PhotoLink)
                );
            }
            return project;
        }
    }
}
