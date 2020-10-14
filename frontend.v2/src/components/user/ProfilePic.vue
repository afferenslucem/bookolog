<template functional>
    <img class="avatar" v-if="props.avatar" :src="props.avatar" />
    <person-icon v-else ></person-icon>
</template>