<template>
  <ul class="nav flex-column">
    <li class="nav-item" @click="onAbout()">
      <a class="nav-link" href="#" id="aboutButton">{{ $t('about.title') }}</a>
    </li>
    <li class="version dark-text nav-item">
      <small class="nav-link"> Version: {{version}} </small>
    </li>
  </ul>
  
</template>
<script>
import sideMenuMixin from '@/mixins/side-menu-mixin';
import {VERSION} from '@/config';


export default {
  mixins: [sideMenuMixin],
  methods: {
    async onAbout() {
      await this.$router.push({name: 'About'});
      this.emitClick();
    },
  },
  computed: {
    version: () => VERSION,
  }
}
</script>