<template>
    <div>
        <side-menu :class="{ opened: shouldShowSideMenu, left: true }">
            <user-info/>
            <book-menu @itemClick="closeAllMenus()"/>
            <statistic-menu @itemClick="closeAllMenus()"/>
            <user-menu @itemClick="closeAllMenus()"/>
            <bottom-menu class="bottom-menu" @itemClick="closeAllMenus()"/>
        </side-menu>
        <div
                class="overlay"
                :class="{ active: showOverlay }"
                @click="closeAllMenus()"
        ></div>
        <div class="main">
            <Header
                    class="top"
                    @menuClick="openLeftMenu()"
                    :title="title"
            />
            <div class="content container pt-1">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/navigation/Header";
    import SideMenu from "@/components/navigation/SideMenu";
    import BookMenu from "@/components/navigation/BookMenu";
    import StatisticMenu from "@/components/navigation/StatisticMenu";
    import UserMenu from "@/components/navigation/UserMenu";
    import BottomMenu from "@/components/navigation/BottomMenu";
    import {getLogger} from "@/logger";
    import UserInfo from "@/components/user/UserInfo";

    const logger = getLogger("HomePage");

    export default {
        name: "Home",
        components: {
            UserInfo,
            Header,
            SideMenu,
            BookMenu,
            UserMenu,
            StatisticMenu,
            BottomMenu,
        },
        data() {
            return {
                title: '',
                shouldShowSideMenu: false,
            };
        },
        methods: {
            openLeftMenu() {
                this.shouldShowSideMenu = true;
                logger.debug("Opened left menu");
            },
            closeAllMenus() {
                this.shouldShowSideMenu = false;
                logger.debug("Closed all menus");
            },
        },
        computed: {
            showOverlay() {
                return this.shouldShowSideMenu;
            },
        },
        beforeRouteEnter(to, from, next) {
            next(vm => vm.title = to.meta?.title || to.params.name || '');
        },
        beforeRouteUpdate(to, from, next) {
            this.title = to.meta?.title || to.params.name || '';
            next();
        },
    };
</script>

<style lang="scss" scoped>
    @import "@/styles/variables";

    .main {
        height: 100vh;
        width: 100%;

        .content {
            height: calc(100vh - #{$header-height});
            width: 100%;

            overflow: auto;
            position: absolute;
            top: $header-height;
            left: 0;

            .container {
                height: 100%;
                overflow: auto;
            }
        }
    }

    .overlay {
        height: 100%;
        width: 100%;

        visibility: hidden;

        opacity: 0;

        transition: opacity 0.5s ease-in-out;

        position: fixed;

        z-index: 5000;

        background-color: $overlay-color;

        &.active {
            visibility: visible;
            opacity: 1;
        }
    }

    .side-menu {
        width: 75%;

        position: fixed;
        top: 0;
        z-index: 10000;

        height: 100vh;

        background-color: $bg-color;

        $menu-open-time: 0.5s;
        $menu-open-animation: ease-in-out;

        &.left {
            left: -100%;

            transition: left $menu-open-time $menu-open-animation;

            &.opened {
                left: 0;
            }
        }
    }

    .bottom-menu {
        position: absolute;

        bottom: 0;

        width: 100%;
    }
</style>

<style lang="scss">
    @import "@/styles/variables";

    .menu {
        &__header {
            font-weight: $fat-font-weight;
            font-size: $large-font-size;
        }

        &__body {
            padding-left: 1rem;

            .menu-item {
                color: $link-color;

                cursor: pointer;

                height: 2em;
            }
        }
    }
</style>
