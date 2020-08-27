import {USER_LOGGED_IN_GETTER, USER_LOGIN_ACTION, USER_LOGOUT_ACTION} from '@/store/naming';

export default {
    methods: {
        async login() {
            await this.$store.dispatch(USER_LOGIN_ACTION);
            this.$router.push({name: 'InProgress'})
        },
        async logout() {
            await this.$store.dispatch(USER_LOGOUT_ACTION);
            this.$router.push({name: 'Home'})
        },
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters[USER_LOGGED_IN_GETTER];
        }
    }
}