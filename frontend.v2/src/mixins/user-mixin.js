import {USER_LOGGED_IN_GETTER, USER_LOGIN_ACTION, USER_LOGOUT_ACTION} from '@/store/naming';

export default {
    methods: {
        async login() {
            return this.$store.dispatch(USER_LOGIN_ACTION);
        },
        async logout() {
            return this.$store.dispatch(USER_LOGOUT_ACTION);
        },
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters[USER_LOGGED_IN_GETTER];
        }
    }
}