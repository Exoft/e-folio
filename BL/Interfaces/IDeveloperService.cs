using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using eFolio.DTO;
using eFolio.DTO.Common;

namespace eFolio.BL
{
    public interface IDeveloperService
    {
        Task AddAsync(Developer item);
        Task UpdateAsync(Developer item);
        Task DeleteAsync(int id);
        Task<Developer> GetItemAsync(int id, CVKind isExtended);
        Task<IEnumerable<Developer>> GetItemsListAsync(CVKind isExtended);
        Task<IEnumerable<Developer>> SearchAsync(string request, Paging paging, CVKind isExtended);
        Task ChangeAvatar(int id, string extension, Stream stream);
    }
}