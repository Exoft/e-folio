using eFolio.EF;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

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
        public void Add(ProjectEntity item)
        {
            db.Projects.Add(new ProjectEntity()
            {
                Context = null,
                ContextId = 10,
                Developers = null,
                Name = item.Name,
                PhotoLink = @"D:\Exoft\e-Folio\e-Folio\Seeds\PhotoProject\efolio.png"
            });

            db.SaveChanges();
        }

        public void Delete(int id)
        {
            ProjectEntity project = db.Projects.Find(id);

            if (project != null)
            {
                db.Projects.Remove(project);
                db.SaveChanges();
            }
        }

        public int GetSize()
        {
            return db.Projects.Count();
        }

        public ProjectEntity GetItem(int id, params string[] extendWith)
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
                    case "developers": addDevelopers = true;
                        break;
                    default:
                        break;
                }
            }

            var project = query.SingleOrDefault(item => item.Id == id);

            if (addDevelopers && project != null)
            {
                var developers = db.Set<ProjectDeveloperEntity>()
                      .Include(pde => pde.DeveloperEntity)
                      .Where(pde => pde.ProjectId == id)
                      .ToList();

                project.Developers = developers; 
            }

            return project;
        }

        public IEnumerable<ProjectEntity> GetItemsList()
        {
            List<ProjectEntity> list = db.Projects
                .Include(project => project.Context)
                .ThenInclude(context => context.ScreenLinks)
                .ToList();

            var developers = db.Set<ProjectDeveloperEntity>()
                .Include(pde => pde.DeveloperEntity)
                .GroupBy(pde => pde.ProjectId)
                .ToDictionary(pde => pde.Key);

            foreach (var item in list)
            {
                if (developers.ContainsKey(item.Id))
                {
                    item.Developers = developers[item.Id].ToList();
                }
            }

            return list;
        }

        public void Update(ProjectEntity item)
        {
            var entity = db.Projects.Find(item.Id);
            db.Entry(entity).CurrentValues.SetValues(item);
            db.SaveChanges();
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
