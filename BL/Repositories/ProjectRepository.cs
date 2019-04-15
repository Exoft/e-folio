using eFolio.EF;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eFolio.BL
{
    public class ProjectRepository : IRepository<ProjectEntity>
    {
        private eFolioDBContext db;

        public ProjectRepository(eFolioDBContext eFolioDBContext)
        {
            this.db = eFolioDBContext;
        }

        // TODO fix
        public async Task AddAsync(ProjectEntity item)
        {
            db.Projects.Add(new ProjectEntity()
            {
                Context = null,
                ContextId = 10,
                Developers = null,
                Name = item.Name,
                PhotoLink = @"D:\Exoft\e-Folio\e-Folio\Seeds\PhotoProject\efolio.png"
            });

            await db.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            ProjectEntity project = await db.Projects.FindAsync(id);

            if (project != null)
            {
                db.Projects.Remove(project);
                await db.SaveChangesAsync();
            }
        }

        public Task<int> GetSizeAsync()
        {
            return db.Projects.CountAsync();
        }

        public async Task<ProjectEntity> GetItemAsync(int id, params string[] extendWith)
        {
            IQueryable<ProjectEntity> query = db.Projects;

            bool addDevelopers = false;
            foreach (var item in extendWith)
            {
                switch (item.ToLower())
                {
                    case "details":
                        query = query.Include(proj => proj.Context);
                        break;
                    case "screenshots":
                        query = query.Include(proj => proj.Context)
                                     .ThenInclude(context => context.ScreenLinks);
                        break;
                    case "developers":
                        addDevelopers = true;
                        break;
                    default:
                        break;
                }
            }

            var project = await query.SingleOrDefaultAsync(item => item.Id == id);

            if (addDevelopers && project != null)
            {
                var developers = await db.Set<ProjectDeveloperEntity>()
                      .Include(pde => pde.DeveloperEntity)
                      .Where(pde => pde.ProjectId == id)
                      .ToListAsync();

                project.Developers = developers;
            }

            return project;
        }

        public async Task<IEnumerable<ProjectEntity>> GetItemsListAsync()
        {
            List<ProjectEntity> list = await db.Projects
                .Include(project => project.Context)
                .ThenInclude(context => context.ScreenLinks)
                .ToListAsync();

            var developers = await db.Set<ProjectDeveloperEntity>()
                .Include(pde => pde.DeveloperEntity)
                .GroupBy(pde => pde.ProjectId)
                .ToDictionaryAsync(pde => pde.Key);

            foreach (var item in list)
            {
                if (developers.ContainsKey(item.Id))
                {
                    item.Developers = developers[item.Id].ToList();
                }
            }

            return list;
        }

        public async Task UpdateAsync(ProjectEntity item)
        {
            var entity = await db.Projects.FindAsync(item.Id);
            db.Entry(entity).CurrentValues.SetValues(item);
            await db.SaveChangesAsync();
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
