<template>
    <ul class="nav flex-column">
        <!--li class="nav-item" @click="onAbout()">
            <a class="nav-link" href="#" id="aboutButton">{{ $t('about.title') }}</a>
        </li-->

        <li class="nav-item sync">
            <div class="sync-button">
                <sync-button></sync-button>
            </div>
            <small class="last-sync-time secondary-text">
                Синхр. {{syncTimeFormatted}}
            </small>
        </li>

        <li class="version dark-text">
            <small> {{version}} </small>
        </li>
    </ul>

</template>
<script>
    import SyncButton from "@/components/connection/SyncButton.vue";
    import sideMenuMixin from '@/mixins/side-menu-mixin';
    import userMixin from '@/mixins/user-mixin';
    import {VERSION} from '@/config';
    import moment from 'moment';


    export default {
        mixins: [sideMenuMixin, userMixin],
        methods: {
            async onAbout() {
                await this.$router.push({name: 'About'});
                this.emitClick();
            },
        },
        computed: {
            version: () => VERSION,
            avatarLink() {
                const avatar = this.$store.state.user.avatar;

                return this.getAvatarLink(avatar);
            },
            syncTimeFormatted() {
                const time = this.lastSyncTime;
                return moment(time).format('DD.MM.YYYY HH:mm')
            }
        },
        components: {
            SyncButton,
        },
    }
</script>

<style lang="scss" scoped>
    @import "@/styles/variables";

    .sync-button {
        border: 1px solid $secondary-text-color;
        color: $secondary-text-color;

        border-radius: 0.25rem;

        padding: 0.35rem;

        display: flex;
        justify-content: center;
        align-content: center;
    }

    .sync {
        width: 100%;

        display: flex;

        align-items: center;

        padding-bottom: 0.2rem;
        padding-left: 0.2rem;

        > * {
            flex: 0 0 auto;
        }

        .last-sync-time {
            flex: 1 0 auto;
            text-align: center;

            color: $secondary-text-color;
        }
    }

    .version {
        font-size: 0.8rem;

        width: 100%;

        text-align: right;

        position: absolute;

        bottom: -2px;
    }
</style>
