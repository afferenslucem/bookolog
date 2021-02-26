using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.v2.Models;

namespace backend.v2.Storages
{
    public interface IEntityStorage<T> where T: class, IEntity
    {
        Task<T> Save(T entity);
        Task<T> Update(T entity);
        
        // Task<T> SaveOrUpdate(T entity);
        Task<T> GetByGuid(Guid guid);
        Task<T[]> GetByGuids(Guid[] guids);
        Task<T> Delete(Guid guid);
        Task<T[]> SaveMany(T[] entities);
        Task<T[]> UpdateMany(T[] entities);
        Task<T[]> SaveOrUpdateMany(T[] entities);
        Task<T[]> DeleteMany(T[] entities);
        Task DeleteMany(Guid[] guids);
        Task<T[]> GetChangedAfter(long userId, DateTime date);
        Task<T[]> GetDeletedAfter(long userId, DateTime date);
        Task<IEnumerable<T>> GetByUserId(long id);
    }

    public abstract class EntityStorage<T> where T: class, IEntity
    {
        public async Task<T> Save(T entity)
        {
            using var context = new BookologContext();
            var set = this.GetEntitiesSet(context);

            entity = this.MarkForSave(entity);
            await set.AddAsync(entity);

            await context.SaveChangesAsync();

            return entity;
        }

        public async Task<T> Update(T entity)
        {
            using var context = new BookologContext();
            var set = this.GetEntitiesSet(context);

            entity = this.MarkForUpdate(entity);
            set.Update(entity);

            await context.SaveChangesAsync();

            return entity;
        }

        public async Task<T> SaveOrUpdate(T entity)
        {
            using var context = new BookologContext();
            var set = this.GetEntitiesSet(context);

            var exists = set.Any(item => item.Guid == entity.Guid);

            if (exists)
            {
                entity = this.MarkForUpdate(entity);
                set.Update(entity);
            }
            else
            {
                entity = this.MarkForSave(entity);
                context.Add(entity);
            }

            await context.SaveChangesAsync();

            return entity;
        }
        
        public async Task<T> GetByGuid(Guid guid)
        {
            using var context = new BookologContext();
            var set = this.GetEntitiesSet(context);

            var result = await set.Where(item => item.Guid == guid).SingleAsync();

            return result;
        }
        
        public async Task<T[]> GetByGuids(Guid[] guids)
        {
            using var context = new BookologContext();
            var set = this.GetEntitiesSet(context);

            var result = await set.Where(item => guids.Contains(item.Guid.Value)).ToArrayAsync();

            return result;
        }

        public async Task<T> Delete(Guid guid)
        {
            using var context = new BookologContext();
            var set = this.GetEntitiesSet(context);

            var result = await set.Where(item => item.Guid == guid).SingleAsync();

            result = this.MarkForDelete(result);

            set.Update(result);

            await context.SaveChangesAsync();

            return result;
        }

        public async Task<T[]> SaveMany(T[] entities)
        {
            using var context = new BookologContext();
            var set = this.GetEntitiesSet(context);

            entities = entities.Select(item => this.MarkForSave(item)).ToArray();

            await set.AddRangeAsync(entities);
            await context.SaveChangesAsync();

            return entities;
        }
        
        public async Task<T[]> UpdateMany(T[] entities)
        {
            using var context = new BookologContext();
            var set = this.GetEntitiesSet(context);

            entities = entities.Select(item => this.MarkForUpdate(item)).ToArray();

            set.UpdateRange(entities);
            await context.SaveChangesAsync();

            return entities;
        }

        public async Task<T[]> SaveOrUpdateMany(T[] entities)
        {
            using var context = new BookologContext();
            var set = this.GetEntitiesSet(context);

            var toAdd = entities.Where(item => set.All(entity => entity.Guid != item.Guid)).ToArray();
            var toUpdate = entities.Where(item => set.Any(entity => entity.Guid == item.Guid)).ToArray();

            toUpdate = toUpdate.Select(item => this.MarkForUpdate(item)).ToArray();
            toAdd = toAdd.Select(item => this.MarkForSave(item)).ToArray();

            var addingAwait = set.AddRangeAsync(toAdd);
            set.UpdateRange(toUpdate);

            await addingAwait;
            await context.SaveChangesAsync();

            return entities;
        }

        public async Task<T[]> DeleteMany(T[] entities)
        {
            using var context = new BookologContext();
            var set = this.GetEntitiesSet(context);

            entities = entities.Select(item => this.MarkForDelete(item)).ToArray();

            set.UpdateRange(entities);
            await context.SaveChangesAsync();

            return entities;
        }

        public async Task DeleteMany(Guid[] guids)
        {
            using var context = new BookologContext();
            var set = this.GetEntitiesSet(context);

            var result = set.Where(item => guids.Contains(item.Guid.Value));

            set.RemoveRange(result);

            await context.SaveChangesAsync();
        }

        public async Task<T[]> GetDeletedAfter(long userId, DateTime date)
        {
            using var context = new BookologContext();
            var set = this.GetEntitiesSet(context);

            var result = await set.Where(item => item.DeleteDate >= date && item.UserId == userId).IgnoreQueryFilters().ToArrayAsync();

            return result;
        }

        public async Task<T[]> GetChangedAfter(long userId, DateTime date)
        {
            using var context = new BookologContext();
            var set = this.GetEntitiesSet(context);

            var result = await set.Where(item => (item.ModifyDate >= date || item.CreateDate >= date) && item.UserId == userId).ToArrayAsync();

            return result;
        }

        public async Task<IEnumerable<T>> GetByUserId(long id)
        {
            using var context = new BookologContext();
            var set = this.GetEntitiesSet(context);

            var result = await set.Where(item => item.UserId == id).ToArrayAsync();

            return result;
        }
        
        protected T MarkForDelete(T book)
        {
            book.DeleteDate = DateSessionUtils.Now;

            return book;
        }

        protected T MarkForUpdate(T book)
        {
            book.ModifyDate = DateSessionUtils.Now;

            return book;
        }

        protected T MarkForSave(T book)
        {
            book.CreateDate = DateSessionUtils.Now;

            return book;
        }
    
        protected abstract DbSet<T> GetEntitiesSet(BookologContext context);
    }
}