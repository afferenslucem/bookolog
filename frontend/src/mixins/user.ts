import Vue from 'vue';
import { UserModule } from '@/types/user-module';

export default Vue.extend({    
    methods: {
        login() {
            this.$store.dispatch('login');
        },
        logout() {
            this.$store.dispatch('logout');
        }
    },
    computed: {
        user(): UserModule {
            return this.$store.state.user;
        },
        loggedIn() {
            return this.user.loggedIn;
        }
    }
});