using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.v2.Exceptions.BookExceptions;
using backend.v2.Models;
using backend.v2.Storages;

namespace backend.v2.Services
{
    public interface IEntityService<T> where T : IEntity
    {
        Task<T> GetByGuid(Guid guid);
        Task<T> Save(T entity);
        Task<T> Update(T entity);
        Task<T> Delete(Guid guid);
        Task<T[]> SaveMany(T[] entities);
        Task<T[]> UpdateMany(T[] entities);
        Task<T[]> DeleteMany(T[] entities);
        Task DeleteMany(Guid[] guids);
        Task<SyncData<T>> Synch(SyncData<T> data);
        Task<IEnumerable<T>> GetByUserId(long userId);
    }

    public abstract class EntityService<T> : IEntityService<T> where T : class, IEntity
    {
        private IEntityStorage<T> storage;
        private IUserSession session;

        public EntityService(IEntityStorage<T> storage, IUserSession session)
        {
            this.storage = storage;
            this.session = session;
        }
        public async Task<T> GetByGuid(Guid guid)
        {
            var result = await this.storage.GetByGuid(guid);

            return result;
        }
        public async Task<T[]> GetByGuids(Guid[] guids)
        {
            var result = await this.storage.GetByGuids(guids);

            return result;
        }

        public virtual async Task<T> Save(T entity)
        {
            this.CheckEntity(entity);
            this.SetUserId(entity);

            var result = await this.storage.Save(entity);

            return result;
        }

        public virtual async Task<T> Update(T entity)
        {
            var prevState = await this.EntityAccessCheck(entity.Guid.Value);

            this.CopyMetadata(entity, prevState);
            this.SetUserId(entity);

            this.CheckEntity(entity);

            return await this.storage.Update(entity);
        }

        public virtual async Task<T> Delete(Guid guid)
        {
            await this.EntityAccessCheck(guid);

            return await this.storage.Delete(guid);
        }

        public virtual async Task<T[]> SaveMany(T[] entities)
        {
            this.SetUserId(entities);

            this.CheckEntity(entities);

            return await this.storage.SaveMany(entities);
        }

        public virtual async Task<T[]> UpdateMany(T[] entities)
        {
            var prevStates = await this.EntityAccessCheck(entities.Select(item => item.Guid.Value).ToArray());
            
            this.SetUserId(entities);

            this.CopyMetadata(entities, prevStates);

            this.CheckEntity(entities);

            return await this.storage.UpdateMany(entities);
        }

        public virtual async Task<T[]> DeleteMany(T[] entities)
        {
            await this.EntityAccessCheck(entities.Select(item => item.Guid.Value).ToArray());
            
            return await this.storage.DeleteMany(entities);
        }

        public virtual async Task DeleteMany(Guid[] guids)
        {
            await this.EntityAccessCheck(guids);
            
            await this.storage.DeleteMany(guids);
        }

        public async Task<IEnumerable<T>> GetByUserId(long userId)
        {
            var result = await this.storage.GetByUserId(userId);

            return result;
        }

        public async Task<SyncData<T>> Synch(SyncData<T> data)
        {
            try
            {
                data.Update = data.Update ?? new T[] {};
                data.Delete = data.Delete ?? new Guid[] {};

                var toDeleteAwait = this.EntityAccessCheck(data.Delete);
                var toUpdateAwait = this.EntityAccessCheck(data.Update.Select(item => item.Guid.Value).ToArray());

                await Task.WhenAll(toUpdateAwait, toDeleteAwait);

                this.SetUserId(data.Update);

                this.CopyMetadata(data.Update, toUpdateAwait.Result);

                var updatingAwait = this.storage.SaveOrUpdateMany(data.Update);
                var deletingAwait = this.DeleteMany(toDeleteAwait.Result);

                var synched = await Task.WhenAll(updatingAwait, deletingAwait);

                return await this.GetDifferenceForSession();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        
        private async Task<SyncData<T>> GetDifferenceForSession()
        {
            var thres = this.session.LastSyncTime ?? DateTime.MinValue;
            var user = this.session.User;

            var updateAwait = this.storage.GetChangedAfter(user.Id, thres);
            var deleteAwait = this.storage.GetDeletedAfter(user.Id, thres);

            var diff = await Task.WhenAll(updateAwait, deleteAwait);

            return new SyncData<T>
            {
                Update = updateAwait.Result,
                Delete = deleteAwait.Result.Select(item => item.Guid.Value).ToArray(),
            };
        }

        private async Task<T> EntityAccessCheck(Guid guid)
        {
            var currentState = await this.GetByGuid(guid);
            var user = this.session.User;

            this.CheckAccess(user.Id, currentState);

            return currentState;
        }

        private async Task<T[]> EntityAccessCheck(Guid[] guids)
        {
            var currentStates = await this.GetByGuids(guids);
            var user = this.session.User;

            foreach (var entity in currentStates)
            {
                this.CheckAccess(user.Id, entity);
            }

            return currentStates;
        }

        public abstract void CheckEntity(T entity);

        private void CheckEntity(params T[] entities)
        {
            foreach (var entity in entities)
            {
                this.CheckEntity(entity);
            }
        }

        public void CheckAccess(long userId, T entity)
        {
            if (entity.UserId != userId)
            {
                throw new EntityAccessDenied();
            }
        }
        
        public void CheckAccess(T book)
        {
            var currentUser = this.session.User;

            if (book.UserId != currentUser.Id)
            {
                throw new EntityAccessDenied();
            }
        }

        protected virtual void SetUserId(params T[] entities)
        {
            var user = this.session.User;

            foreach (var entity in entities)
            {
                entity.UserId = user.Id;
            }
        }

        private void CopyMetadata(T[] current, T[] oldState) {
            
            var pairs = current.Join(
                oldState,
                item => item.Guid, 
                item => item.Guid, 
                (current, prevous) => 
                    new {Current = current, Prevous = prevous}
                );

            foreach(var pair in pairs) {
                this.CopyMetadata(pair.Current, pair.Prevous);
            }
        }

        private void CopyMetadata(T current, T oldState) {
            current.CreateDate = oldState.CreateDate;
            current.DeleteDate = oldState.DeleteDate;
            current.ModifyDate = oldState.ModifyDate;
        }
    }
}