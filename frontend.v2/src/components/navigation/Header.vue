<template>
    <div class="header">
        <div class="icon" @click="emitMenuClick($event)">
            <i class="fa fa-bars" aria-hidden="true"></i>
        </div>
        <div class="icon" v-if="!isLoggedIn" @click="emitAvatarClick($event)">
            <i class="fa fa-user-o" aria-hidden="true"></i>
        </div>
        <div class="icon avatar" v-else @click="emitAvatarClick($event)">
            <img src="/avatar.jpg"/>
        </div>
    </div>
</template>
<script>
import userMixin from '@/mixins/user-mixin';
export default {
    mixins: [userMixin],
    methods: {
        emitAvatarClick(event) {
            event.stopPropagation();
            this.$emit('avatarclick');
        },
        emitMenuClick(event) {
            event.stopPropagation();
            this.$emit('menuclick');
        },
    },
    computed: {
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