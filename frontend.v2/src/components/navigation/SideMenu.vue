<template>
    <div class="side-menu">
        <slot></slot>
    </div>
</template>
<style lang="scss" scoped>
    @import '@/styles/variables';

    .side-menu {
        height: 100vh;

        background-color: $bg-color;
    }
</style>