<template>
    <div class="header">
        <div class="icon">
            <i class="fa fa-bars" aria-hidden="true"></i>
        </div>
        <div class="icon" v-if="!isLoggedIn" @click="login()">
            <i class="fa fa-user-o" aria-hidden="true"></i>
        </div>
        <div class="icon avatar" v-else @click="logout()">
            <img src="/avatar.jpg"/>
        </div>
    </div>
</template>
<script>
import {USER_LOGIN_ACTION, USER_LOGOUT_ACTION, USER_LOGGED_IN_GETTER} from '@/store/naming';
export default {
    methods: {
        async login() {
            return this.$store.dispatch(USER_LOGIN_ACTION);
        },
        async logout() {
            return this.$store.dispatch(USER_LOGOUT_ACTION);
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters[USER_LOGGED_IN_GETTER];
        }
    },
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables';

.header {
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
        flex: 0 0 auto;
    }

    background-color: $header-color;
    color: $header-text-color;
}
</style>