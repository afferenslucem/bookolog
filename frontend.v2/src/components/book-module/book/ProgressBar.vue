<template>
  <div class="progress mt-2">
    <div
      class="progress-bar"
      role="progressbar"
      :style="{'width': progress + '%'}"
      :aria-valuenow="progress"
      aria-valuemin="0"
      aria-valuemax="100"
    ></div>
  </div>
</template>

<script>
export default {
    props: {
        progress: {
            required: true,
            type: Number
        }
    }
};
</script>

<style>
</style>