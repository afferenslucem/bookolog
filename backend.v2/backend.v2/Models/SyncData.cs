using System;

namespace backend.v2.Models
{
    /// <summary>
    /// Модель с данными для синхронизации устройства.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class SyncData<T>
    {
        /// <summary>
        /// Объекты для обновления.
        /// </summary>
        public T[] Update { get; set; }
        /// <summary>
        /// Идентификаторы объектов для удаления.
        /// </summary>
        public Guid[] Delete { get; set; }
    }
}