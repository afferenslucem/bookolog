<template>
    <form @submit.prevent="submit" class="login">
        <h2 class="form-group">Войти</h2>

        <div class="form-group">
            <label for="login-input">Логин</label>
            <input id="login-input" class="form-control" v-model="username" type="text"/>
        </div>

        <div class="form-group">
            <label for="password-input">Пароль</label>
            <input id="password-input" class="form-control" v-model="password" type="password"/>
        </div>

        <div class="alert alert-danger error" v-if="loginError">
            {{loginErrorText}}
        </div>

        <input type="submit" class="btn btn-primary" value="Войти" />
    </form>
</template>

<script lang="ts">
import Vue from 'vue'
import userMixin from '@/mixins/user'
import { UserActions } from '../store/modules/user/storage-methods';

interface AuthData {
    username: string;
    password: string;
}

export default Vue.extend({
    mixins: [userMixin],
    data(): AuthData {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        async submit(): Promise<void> {
            const login = this.username;
            const password = this.password;

            await this.$store.dispatch(UserActions.login, { login, password });

            if(this.loggedIn) {
                this.$router.push({name: 'Reading'})
            }
        }
    }
})
</script>

<style lang="scss" scoped>

</style>