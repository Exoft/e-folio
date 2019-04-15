using System.Collections.Generic;
using System.Threading.Tasks;
using eFolio.EF;
namespace eFolio.BL
{
    public interface IAdminService
    {
        Task DeleteAsync(int id);
        Task UpdateAsync(UserEntity user);
        Task<UserEntity> GetUserAsync(int id);
        Task<IEnumerable<UserEntity>> GetUsersListAsync();
    }
}