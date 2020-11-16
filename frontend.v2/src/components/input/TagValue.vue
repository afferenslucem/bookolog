<template>
    <span class="tag">
        <small class="tag__text">{{ name | capital }}</small>
        <i v-if="!hideButton" class="tag__close-button" @click="crossClick()">
            <cross-icon></cross-icon>
        </i>
    </span>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                required: true,
            },
            hideButton: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            crossClick() {
                this.$emit("closed");
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import "@/styles/variables";

    .tag {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        height: 1.75rem;

        padding: 0.2rem 0.4rem;

        line-height: 80%;

        &__close-button {
            margin-left: 0.3rem;
        }

        border: $split-line;
        border-radius: 0.25rem;
    }
</style>
