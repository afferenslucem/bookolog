<template functional>
  <span>
    <span class="no-wrap">{{ props.values[0] }}</span
    ><span v-if="props.values.length > 1"
      ><span v-for="tag of props.values.slice(1)" :key="tag"
        >, <span class="no-wrap">{{ tag }}</span>
      </span>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    values: {
      type: Array,
      required: true,
    },
  },
};
</script>