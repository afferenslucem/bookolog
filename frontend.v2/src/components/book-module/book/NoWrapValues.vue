<template>
  <span>
    <span class="no-wrap"
    >{{ first }}</span
    ><span v-for="tag of notFirst" :key="tag"
      >, <span class="no-wrap">{{ tag }}</span></span
    >
  </span>
</template>

<script>
import _ from "declarray";
export default {
  props: {
    values: {
      type: Array,
      required: true,
    },
  },
  computed: {
    first() {
      return _(this.values).first();
    },
    notFirst() {
      return _(this.values).skip(1).toArray();
    },
  },
};
</script>