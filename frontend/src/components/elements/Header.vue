<template>
  <div class="menu">
      <main-icon class="main-icon"></main-icon>
      <span>Log in</span>
  </div>
</template>


<script lang="ts">
    import Vue from 'vue';
    import MainIcon from '@/components/elements/MainIcon.vue';

    export default Vue.extend({
        name: 'AppHeader',
        components: { MainIcon },
        data() {
            return {

            }
        }
    })
</script>

<style lang="scss" scoped>

</style>