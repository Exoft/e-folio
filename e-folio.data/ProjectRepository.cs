﻿using e_folio.core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace e_folio.data
{
    public class ProjectRepository : IRepository<Project>
    {
        private eFolioDBContext db;

        public ProjectRepository()
        {
            var optionsBuilder = new DbContextOptionsBuilder<eFolioDBContext>();

            var options = optionsBuilder.UseSqlServer(@"Data source=.\SQLEXPRESS;Initial Catalog=eFolio;User Id = sa; Password = intel123").Options;

            this.db = new eFolioDBContext(options);
        }

        public void Create(Project item)
        {
            db.Projects.Add(item);
        }

        public void Delete(int id)
        {
            Project project = db.Projects.Find(id);

            db.Projects.Remove(project);
        }

        public Project GetItem(int id)
        {
            Project project = db.Projects.Find(id);

            return project;
        }

        public IEnumerable<Project> GetItemsList()
        {
            return db.Projects.ToListAsync().Result;
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public IEnumerable<Project> Search(string request)
        {
            throw new NotImplementedException();
        }

        public void Update(Project item)
        {
            db.Projects.Update(item);
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
