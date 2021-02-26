using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace backend.v2.Models.Authentication
{
    public class Session
    {
        [Column(TypeName = "uuid")]
        public Guid Guid { get; set; }

        public DateTime ValidityExpired {get; set;}

        public string StateJson { get; set; }

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
    }
}
