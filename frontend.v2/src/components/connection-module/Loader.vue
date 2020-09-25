<template>
    <div class="preloader" v-show="showLoader">
        <div class="overlay"></div>
        <div class="loader-placeholder">
            <div class="loader">
            </div>
        </div>        
    </div>
</template>

<script>
export default {
    computed: {
        showLoader() {
            return this.$store.getters.showLoader;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

    .preloader {
        width: 100vw;
        height: 100vh;

        position: absolute;

        left: 0;
        top: 0;

        z-index: 10000;
    }

    .overlay {
        @extend .preloader;

        background-color: $loader-overlay-color;
    }

    .loader-placeholder {
        @extend .preloader;

        display: flex;

        align-items: center;

        justify-content: center;

        .loader {
            background-image: url('/img/loader.gif');

            background-origin: content-box;
            background-position: center;
            background-repeat: no-repeat;

            height: 200px;
            width: 200px;
        }
    }
</style>