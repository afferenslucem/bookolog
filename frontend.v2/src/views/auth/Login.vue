<template>
  <div class="container">
    <form @submit="login($event)">
      <div class="form-group">
        <input
          class="form-control"
          placeholder="Логин"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="username"
        />
      </div>
      <div class="form-group">
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Пароль" v-model="password" />
      </div>

      <div class="form-group" v-if="errors.incorrectCredentials">
        <div class="alert alert-danger text-center">
           Неверный логин или пароль.
        </div>
      </div>

      <button class="btn btn-primary" type="submit" >Войти</button>
    </form>
  </div>
</template>

<script>
import {USER_LOGIN_ACTION} from '@/store/naming';
import { INCORRECT_CREDENTIALS_EXCEPTION } from '@/http/user-client'
import {getLogger} from '@/logger'

const logger = getLogger('LoginForm');

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
                this.errors = {};

                await this.$store.dispatch(USER_LOGIN_ACTION, {
                    username: this.username,
                    password: this.password
                });

                this.$router.push({ name: 'InProgress'});

                return false;
            } catch(e) {
                if(e == INCORRECT_CREDENTIALS_EXCEPTION) {
                  this.errors.incorrectCredentials = true;
                }
                logger.error('Login error', JSON.stringify(e))
            }
        }
    }
};
</script>

<style>
</style>