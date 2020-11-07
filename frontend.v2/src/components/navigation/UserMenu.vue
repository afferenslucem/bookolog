<template>
    <div class="menu">
        <span class="menu__header">{{ $t('book.lists.user.title') }}</span>
        <ul class="menu__body">
            <li class="menu-item" @click="onSettings()" id="settingsButton">{{ $t('user.actions.settings') }}</li>
            <li class="menu-item" @click="onLogout()" id="logoutButton">{{ $t('auth.actions.logout.title') }}</li>
        </ul>
    </div>
</template>
<script>
    import userMixin from '@/mixins/user-mixin';
    import sideMenuMixin from '@/mixins/side-menu-mixin';
    import {VERSION} from '@/config';

    export default {
        mixins: [userMixin, sideMenuMixin],
        methods: {
            async onLogout() {
                await this.logout();
                this.emitClick();
            },
            async onSettings() {
                await this.settings();
                this.emitClick();
            }
        },
        computed: {
            version: () => VERSION,
        }
    }
</script>
