import {USER_LOGGED_IN_GETTER, USER_LOGOUT_ACTION} from '@/store/naming';

export default {
    methods: {
        async login() {
            this.$router.push({name: 'Login'})
        },
        async logout() {
            await this.$store.dispatch(USER_LOGOUT_ACTION);
            this.$router.push({name: 'Main'})
        },
        async registration() {
            this.$router.push({name: 'Registration'})
        },
        async settings() {
            this.$router.push({name: 'Settings'})
        },
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters[USER_LOGGED_IN_GETTER];
        }
    }
}