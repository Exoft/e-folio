using AutoMapper;
using eFolio.DTO;
using eFolio.EF;
using eFolio.Elastic;
using System;
using System.Collections.Generic;
using eFolio.DTO.Common;
using System.IO;
using System.Threading.Tasks;
using System.Linq;

namespace eFolio.BL
{
    public class DeveloperService : IDeveloperService
    {
        private IMapper mapper;
        private DeveloperRepository developerRepository;
        private ElasticSearch elastic;

        public DeveloperService(eFolioDBContext DBContext, IMapper mapper)
        {
            developerRepository = new DeveloperRepository(DBContext);
            elastic = new ElasticSearch();
            this.mapper = mapper;
        }

        public async Task AddAsync(Developer item)
        {
            DeveloperEntity de = mapper.Map<DeveloperEntity>(item);
            await developerRepository.AddAsync(de);

            item.UpdateId(de.Id);
            ElasticDeveloperData eld = mapper.Map<ElasticDeveloperData>(item);
            elastic.AddItem(eld);
        }

        public async Task DeleteAsync(int id)
        {
            await developerRepository.DeleteAsync(id);

            elastic.DeleteDeveloperItem(id);
        }
        
        public async Task<Developer> GetItemAsync(int id, CVKind isExtended)
        {
            var developerEntity = await developerRepository.GetItemAsync(id);
            var elasticDeveloper = elastic.GetDeveloperById(id, isExtended);

            return await GetMergeDeveloperAsync(developerEntity, elasticDeveloper);
        } 

        public async Task<IEnumerable<Developer>> GetItemsListAsync(CVKind isExtended)
        {
            var developerEntities = await developerRepository.GetItemsListAsync();
            var elasticDevelopers = GetElasticDevelopers(developerEntities, isExtended).ToList();

            List<Developer> ret = new List<Developer>();

            foreach (var developer in developerEntities)
            {
                ElasticDeveloperData elasticDeveloper =
                    elasticDevelopers.Find(eld => eld.Id == developer.Id) ?? new ElasticDeveloperData();

                ret.Add(await GetMergeDeveloperAsync(developer, elasticDeveloper));
            }
            return ret;
        }

        public async Task<IEnumerable<Developer>> SearchAsync(string request, Paging paging, CVKind cvKind)
        {
            var elasticDevelopers = elastic.SearchItemsDeveloper(request, paging, cvKind);
            var developerEntities = await GetEntityDevelopersAsync(elasticDevelopers);

            var e1 = developerEntities.GetEnumerator();
            var e2 = elasticDevelopers.GetEnumerator();

            List<Developer> ret = new List<Developer>();
            while (e1.MoveNext() && e2.MoveNext())
            {
                ret.Add(await GetMergeDeveloperAsync(e1.Current, e2.Current));
            }
            return ret;
        }

        public async Task UpdateAsync(Developer item)
        {
            await developerRepository.UpdateAsync(mapper.Map<DeveloperEntity>(item));

            elastic.UpdateDeveloperData(mapper.Map<ElasticDeveloperData>(item));
        }

        private IEnumerable<ElasticDeveloperData> GetElasticDevelopers(IEnumerable<DeveloperEntity> developers, CVKind cvKind)
        {
            foreach (var item in developers)
            {
                yield return elastic.GetDeveloperById(item.Id, cvKind);
            }
        }

        private async Task<IEnumerable<DeveloperEntity>> GetEntityDevelopersAsync(IEnumerable<ElasticDeveloperData> developers)
        {
            List<DeveloperEntity> list = new List<DeveloperEntity>();
            foreach (var item in developers)
            {
               list.Add(await developerRepository.GetItemAsync(item.Id));
            }
            return list;
        }

        private async Task<Developer> GetMergeDeveloperAsync(DeveloperEntity developerEntity, ElasticDeveloperData elasticDeveloperData)
        {
            var developer = mapper.Map<Developer>(Tuple.Create(elasticDeveloperData, developerEntity));
            if (developerEntity.PhotoLink != null)
            {
                developer.HasPhoto(
                    await File.ReadAllBytesAsync(developerEntity.PhotoLink),
                    Path.GetExtension(developerEntity.PhotoLink)
                );
            }
            return developer;
        }
    }
}