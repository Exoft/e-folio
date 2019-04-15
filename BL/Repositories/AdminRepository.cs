using eFolio.EF;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eFolio.BL.Repositories
{
    class AdminRepository : IRepository<UserEntity>
    {
        private AuthDBContext authDB;
        public AdminRepository(AuthDBContext db)
        {
            authDB = db;
        }
        public async Task<IEnumerable<UserEntity>> GetUsersListAsync()
        {
            return await authDB.Users.AsNoTracking().ToListAsync();
        }
        public async Task<UserEntity> GetUserAsync(int id)
        {
            return await authDB.Users.FindAsync(id);
        }

        public async Task AddAsync(UserEntity user)
        {
            authDB.Users.Add(user);
            await authDB.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            UserEntity user = await authDB.Users.FindAsync(id);
            if (user != null)
                authDB.Users.Remove(user);
            await authDB.SaveChangesAsync();
        }
        public async Task UpdateAsync(UserEntity user)
        {
            authDB.Users.Update(user);
            await authDB.SaveChangesAsync();
        }
        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    authDB.Dispose();
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