using System.Collections.Generic;
using System.Threading.Tasks;
using eFolio.BL.Repositories;
using eFolio.EF;

namespace eFolio.BL
{
    public class AdminService : IAdminService
    {
        private AdminRepository adminRepository;
        public AdminService(AuthDBContext authDB)
        {
            adminRepository = new AdminRepository(authDB);
        }
        public Task DeleteAsync(int id)
        {
            return adminRepository.DeleteAsync(id);
        }
        public Task UpdateAsync(UserEntity user)
        {
            return adminRepository.UpdateAsync(user);
        }
        public Task<UserEntity> GetUserAsync(int id)
        {
            return adminRepository.GetUserAsync(id); 
        }
        public Task<IEnumerable<UserEntity>> GetUsersListAsync()
        {
            return adminRepository.GetUsersListAsync();
        }
    }
}