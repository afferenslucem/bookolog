<template functional>
  <div class="icon profile">
    <profile-pic :avatar="props.avatar" />
    <connection-marker class="marker" />
    <total-read-count class="total-count" />
  </div>
</template>