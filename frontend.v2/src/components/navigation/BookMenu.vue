<template>
  <ul class="nav flex-column">
    <li class="nav-item">
      <a class="nav-link" href="#" @click="goToInProgress()">Читаю Сейчас</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#" @click="goToToRead()">К Прочтению</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#" @click="goToDone()">Прочитал</a>
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
    },
    async goToToRead() {
      this.$router.push({name: 'ToRead'});
      this.emitClick();
    },
    async goToDone() {
      this.$router.push({name: 'Done'});
      this.emitClick();
    }
  }
}
</script>