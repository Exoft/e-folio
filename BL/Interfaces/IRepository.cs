using System;
using System.Threading.Tasks;

namespace eFolio.BL
{
    public interface IRepository<T> : IDisposable where T : class
    {
        Task AddAsync(T item);
        Task UpdateAsync(T item);
        Task DeleteAsync(int id);
    }
}