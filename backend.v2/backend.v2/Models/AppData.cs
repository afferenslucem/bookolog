using System.Collections.Generic;

namespace backend.v2.Models
{
    /// <summary>
    /// Модель для инициализации устройства.
    /// </summary>
    public class AppData
    {
        /// <summary>
        /// Все книги пользователя.
        /// </summary>
        public IEnumerable<Book> Books {get; set;}
        
        
        /// <summary>
        /// Все коллекции пользователя.
        /// </summary>
        public IEnumerable<Collection> Collections {get; set;}
    }
}