<template>
  <ul class="nav flex-column">
    <li class="nav-item">
      <a class="nav-link" href="#" @click="goToInProgress()">Читаю сейчас</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">К прочтению</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Прочитал</a>
    </li>
  </ul>
</template>

<script>
import sideMenuMixin from '@/mixins/side-menu-mixin';

export default {
  mixins: [sideMenuMixin],
  methods: {
    async goToInProgress() {
      this.$router.push({name: 'InProgress'});
      this.emitClick();
    }
  }
}
</script>