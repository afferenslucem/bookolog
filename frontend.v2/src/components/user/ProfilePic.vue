<template functional>
    <img class="avatar" v-if="props.avatar" :src="props.avatar" />
    <div v-else class="icon-place">
        <person-icon></person-icon>
    </div>
</template>
