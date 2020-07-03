export default {    
    methods: {
        login() {
            this.$store.commit('login');
        },
        logout() {
            this.$store.commit('logout');
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
}