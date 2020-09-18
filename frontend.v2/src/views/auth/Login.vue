<template>
  <div class="container">
    <form @submit="login($event)">
      <div class="form-group">
        <input
          class="form-control"
          placeholder="Логин"
          id="login"
          aria-describedby="emailHelp"
          v-model="username"
        />
      </div>
      <div class="form-group">
        <input type="password" class="form-control" id="password" placeholder="Пароль" v-model="password" />
      </div>

      <div class="form-group" v-if="errors.incorrectCredentials">
        <div class="alert alert-danger text-center">
           Неверный логин или пароль.
        </div>
      </div>

      <button class="btn btn-primary w-100" type="submit" >Войти</button>
    </form>
  </div>
</template>

<script>
import {USER_LOGIN_ACTION} from '@/store/naming';
import { INCORRECT_CREDENTIALS_EXCEPTION } from '@/http/user-client'

export default {
    data:() => ({
        username: '',
        password: '',
        errors: {}
    }),
    methods: {
        async login(event) {
            event.preventDefault();
            try {
                await this.$store.dispatch(USER_LOGIN_ACTION, {
                    username: this.username,
                    password: this.password
                });
                
                this.errors = {};

                this.$router.push({ name: 'InProgress'});

                return false;
            } catch(e) {
                if(e == INCORRECT_CREDENTIALS_EXCEPTION) {
                  this.$forceUpdate();
                  this.errors.incorrectCredentials = true;
                }
            }
        }
    }
};
</script>

<style>
</style>