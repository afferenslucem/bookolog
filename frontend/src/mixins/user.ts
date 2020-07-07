import Vue from 'vue';
import { UserModule } from '@/types/user-module';
import { UserActions } from '@/store/modules/user/storage-methods';

export default Vue.extend({
    methods: {
        login(): Promise<void> {
            return this.$store.dispatch(UserActions.login);
        },
        logout() {
            this.$store.dispatch(UserActions.logout);
            this.$router.push({name: 'Main'});
        }
    },
    computed: {
        user(): UserModule {
            return this.$store.state.user;
        },
        
        loggedIn(): boolean {
            return this.user.loggedIn;
        }
    }
});