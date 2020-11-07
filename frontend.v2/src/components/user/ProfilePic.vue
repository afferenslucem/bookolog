<template functional>
    <div class="avatar" :class="data.staticClass" v-if="props.avatar" :style="{ 'background-image': `url(\'${props.avatar}\')`}"> </div>
    <div v-else class="icon-place">
        <person-icon></person-icon>
    </div>
</template>

<style lang="scss" scoped>
    .avatar {
        background-origin: content-box;

        background-position: 50% 50%;
        background-size: 100% auto;

        border-radius: 50%;
    }
</style>
