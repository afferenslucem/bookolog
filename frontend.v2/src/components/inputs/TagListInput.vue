<template>
  <div>
    <selectable-input @submitted="appendTag($event)"></selectable-input>
    <div class="tags">
      <tag-input-value
        :name="tag"
        @closed="deleteTag(tag)"
        v-for="tag in tagsValue"
        :key="tag"
      >
      </tag-input-value>
    </div>
  </div>
</template>

<script>
import SelectableInput from "./SelectableInput";
import TagInputValue from "./TagInputValue";
export default {
  data: () => ({
    tagsValue: [],
  }),
  props: {
    tags: {
      type: Array,
    },
  },
  components: {
    SelectableInput,
    TagInputValue,
  },
  created() {
    this.tagsValue = this.tags;
  },
  watch: {
    tags: function (newValue) { 
      this.tagsValue = newValue; 
    },
  },
  methods: {
    appendTag(tag) {
      if (this.tagsValue.every((item) => item != tag)) {
        this.tagsValue.push(tag);
        this.emitTagsChange();
      }
    },
    deleteTag(tag) {
      this.tagsValue = this.tagsValue.filter((item) => item != tag);
      this.emitTagsChange();
    },
    emitTagsChange() {
      this.$emit("update:tags", this.tagsValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.tags {
  display: flex;

  justify-content: flex-start;

  > * {
    flex: 0 0 auto;

    &:not(:first-child) {
      margin-left: 0.5rem;
    }
  }
}
</style>