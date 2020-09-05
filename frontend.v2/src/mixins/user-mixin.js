import {USER_LOGGED_IN_GETTER, USER_LOGOUT_ACTION} from '@/store/naming';

export default {
    methods: {
        async login() {
            this.$router.push({name: 'Login'})
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