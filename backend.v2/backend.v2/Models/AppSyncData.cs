namespace backend.v2.Models
{
    /// <summary>
    /// Модель для синхронизации устройства.
    /// </summary>
    public class AppSyncData
    {
        /// <summary>
        /// Данные для синхронизации книг.
        /// </summary>
        public SyncData<Book> Books {get; set;}
        
        /// <summary>
        /// Данные для синхронизации коллекций.
        /// </summary>
        public SyncData<Collection> Collections {get; set;}
    }
}