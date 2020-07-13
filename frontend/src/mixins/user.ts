import Vue from 'vue';
import { UserModule } from '@/types/user-module';
import { UserActions } from '@/store/modules/user/storage-methods';
import { HttpError } from '@/types/http-error';

export default Vue.extend({
    methods: {
        login(): Promise<void> {
            return this.$store.dispatch(UserActions.login);
        },
        logout() {
            this.$store.dispatch(UserActions.logout);
            this.$router.push({name: 'Main'});
        },
    },
    computed: {
        user(): UserModule {
            return this.$store.state.user;
        },
        loginError(): HttpError {
            return this.$store.state.user.error;
        },
        loggedIn(): boolean {
            return this.user.loggedIn;
        },
        loginErrorText(): string {
            switch(+this.loginError.code) {
                case 401: {
                    return 'Не удаётся войти.'
                }
                default: {
                    return 'Не известная ошибка.'
                }
            }
        }
    }
});