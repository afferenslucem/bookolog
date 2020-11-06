<template functional>
    <div class="profile-pic" v-if="props.avatar" :style="{ 'background-image': `url(\'${props.avatar}\')`}"> </div>
    <div v-else class="icon-place">
        <person-icon></person-icon>
    </div>
</template>

<style lang="scss" scoped>
    .profile-pic {
        background-origin: content-box;

        background-position: 50% 50%;
        background-size: 100% auto;

        height: 100%;
        width: 100%;

        border-radius: 50%;
    }
</style>
