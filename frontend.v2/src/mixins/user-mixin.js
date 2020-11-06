import {
    USER_LOGGED_IN_GETTER,
    USER_LOGOUT_ACTION
} from '@/store/naming';

import {
    BACKEND_AVATAR_PATH
} from '@/config';

export default {
    methods: {
        async login() {
            this.$router.push({
                name: 'Login'
            })
        },
        async logout() {
            await this.$store.dispatch(USER_LOGOUT_ACTION);
            this.$router.push({
                name: 'Main'
            })
        },
        async registration() {
            this.$router.push({
                name: 'Registration'
            })
        },
        async settings() {
            this.$router.push({
                name: 'Settings'
            })
        },

        getAvatarLink(avatar) {
            if (avatar) {
                return BACKEND_AVATAR_PATH + avatar;
            } else {
                return null;
            }
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters[USER_LOGGED_IN_GETTER];
        },
        lastSyncTime() {
            return this.$store.state.user.lastSyncTime;
        },
        userLogin() {
            return this.$store.state.user.login;
        },
        avatarLink() {
            const avatar = this.$store.state.user.avatar;

            return this.getAvatarLink(avatar);
        },
    }
}
