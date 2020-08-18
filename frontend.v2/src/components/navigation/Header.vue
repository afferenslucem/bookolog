<template>
    <div class="header">
        <div class="icon">
            <i class="fa fa-bars" aria-hidden="true"></i>
        </div>
        <div class="icon" @click="login()">
            <i class="fa fa-user-o" aria-hidden="true"></i>
        </div>
    </div>
</template>
<script>
import USER_LOGIN_ACTION from '@/store/naming';
export default {
    methods: {
        login: () => {
            this.$store.dispatch(USER_LOGIN_ACTION);
        }
    },
}
</script>
