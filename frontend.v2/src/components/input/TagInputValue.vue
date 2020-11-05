<template>
  <span class="tag">
    <small>{{ name | capital }}</small>
    <i class="fa fa-times" aria-hidden="true" @click="crossClick()"></i>
  </span>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    crossClick() {
      this.$emit("closed");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
.tag {
  display: flex;

  width: auto;

  padding: 0.2rem 0.4rem;

  justify-content: flex-start;
  align-items: center;

  i {
    margin-left: 0.3rem;
  }

  border: $split-line;
  border-radius: 0.4rem;
}
</style>