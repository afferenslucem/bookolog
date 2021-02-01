using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;
using Newtonsoft.Json;

namespace backend.Models.Authentication
{
    public class Session
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Column(TypeName = "uuid")]
        public Guid? Guid { get; set; }

        public User User { get; set; }

        public long UserId { get; set; }

        [Column(TypeName = "varchar(256)")]
        public string SessionKey { get; set; }

        [Column(TypeName = "varchar(256)")]
        public string SessionSalt { get; set; }

        public DateTime AccessExpired { get; set; }
        public DateTime RefreshExpired { get; set; }

        public string StateJson { get; set; }

        [NotMapped]
        public IEnumerable<Claim> Claims  {get; set;}

        [NotMapped]
        public string Login {get; set;}

        [NotMapped]
        private Dictionary<string, string> State {
            get {
                if (this.StateJson != null) {
                    return JsonConvert.DeserializeObject<Dictionary<string, string>>(this.StateJson);
                } else {
                    return new Dictionary<string, string>();
                }
            }
            set {
                this.StateJson = JsonConvert.SerializeObject(value);
            }
        }

        public void Set(string key, string value) {
            var state = this.State;

            state[key] = value;

            this.State = state;
        }

        public string Get(string key) {
            var state = this.State;

            return state.ContainsKey(key) ? state[key] : null;
        }

        public void Remove(string key) {
            var state = this.State;

            state[key] = null;

            this.State = state;
        }

        public Session WithoutPrivate()
        {
            return new Session
            {
                Guid = this.Guid,
                UserId = this.UserId,
                AccessExpired = this.AccessExpired,
                RefreshExpired = this.RefreshExpired,
            };
        }
    }
}
