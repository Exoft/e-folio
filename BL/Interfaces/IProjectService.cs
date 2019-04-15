using System.Collections.Generic;
using System.Threading.Tasks;
using eFolio.DTO;
using eFolio.DTO.Common;

namespace eFolio.BL
{
    public interface IProjectService
    {
        Task AddAsync(Project item);
        Task UpdateAsync(Project item);
        Task UpdateDetailsAsync(int project, Context context);
        Task DeleteScreeenshotsAsync(int project, int[] deleted); 
        Task UpdateScreenshotsAsync(int project, Dictionary<int, FolioFile> files);
        Task DeleteAsync(int id);
        Task<int> GetSizeAsync();
        Task<Project> GetItemAsync(int id, DescriptionKind isExtended, params string[] includedProperties);
        Task<IEnumerable<Project>> GetItemsListAsync(DescriptionKind isExtended);
        Task<IEnumerable<Project>> SearchAsync(string request, Paging paging, DescriptionKind isExtended);
    }
}