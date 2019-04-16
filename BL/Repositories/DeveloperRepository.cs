using eFolio.EF;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eFolio.BL
{
    public class DeveloperRepository : IRepository<DeveloperEntity>
    {
        private eFolioDBContext db;

        public DeveloperRepository(eFolioDBContext eFolioDBContext)
        {
            this.db = eFolioDBContext;
        }

        public async Task AddAsync(DeveloperEntity item)
        {
            db.Developers.Add(item);

            await db.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            DeveloperEntity developer = await db.Developers.FindAsync(id);

            if (developer != null)
            {
                db.Developers.Remove(developer);
                await db.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<DeveloperEntity>> GetItemsListAsync()
        {
            return await db.Developers.ToListAsync();
        }

        public async Task<DeveloperEntity> GetItemAsync(int id)
        {
            return await db.Developers.FindAsync(id);
        }

        public async Task UpdateAsync(DeveloperEntity item)
        {
            DeveloperEntity original = await db.Set<DeveloperEntity>().FindAsync(item.Id);
            original.FullName = item.FullName;
            original.CVLink = item.CVLink;
            db.Set<DeveloperEntity>().Update(original);
            await db.SaveChangesAsync();
        }

        public async Task ChangeAvatarAsync(int id, string path)
        {
            await db.Database.ExecuteSqlCommandAsync(
                "UPDATE dbo.Developers SET PhotoLink = @p0 WHERE Id = @p1", path, id
            );
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
