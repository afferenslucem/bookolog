<template>
    <div class="menu">
        <h5>{{ $t('book.lists.user.title') }}</h5>
        <ul class="nav flex-column">
            <li class="nav-item" @click="onSettings()">
                <a class="nav-link" href="#" id="settingsButton">{{ $t('user.actions.settings') }}</a>
            </li>
            <li class="nav-item" @click="onLogout()">
                <a class="nav-link" href="#" id="logoutButton">{{ $t('auth.actions.logout.title') }}</a>
            </li>
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
