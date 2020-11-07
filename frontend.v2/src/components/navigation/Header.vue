<template>
    <div class="header">
        <div class="header__menu-button">
            <div class="icon"
                 id="menuButton"
                 v-if="isLoggedIn"
                 @click="emitMenuClick($event)"
            >
                <i class="fa fa-bars" aria-hidden="true"></i>
            </div>
        </div>
        <div class="header__title pl-2">
            {{title | capital}}
        </div>
    </div>
</template>
<script>
    import userMixin from "@/mixins/user-mixin";

    export default {
        mixins: [userMixin],
        props: {
            title: {
                type: String,
                default: '',
            },
        },
        methods: {
            emitMenuClick(event) {
                event.stopPropagation();
                this.$emit("menuClick");
            }
        },
    };
</script>
<style lang="scss" scoped>
    @import "@/styles/variables";

    .header {
        width: 100%;

        height: $header-height;

        display: flex;
        align-items: center;

        background-color: $header-color;
        color: $header-text-color;

        &__title {
            font-weight: $fat-font-weight;
            font-size: $large-font-size;
        }
    }
</style>
