<template>
  <div>
    <selectable-input
      @submitted="appendTag($event)"
      :list="datalist"
      :placeholder="placeholder"
    ></selectable-input>
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
    datalist: {
      type: Array,
    },
    placeholder: {
      type: String,
      default: () => "",
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
  flex-wrap: wrap;
  justify-content: flex-start;

  > * {
    flex: 0 0 auto;

    &:not(:last-child) {
      margin-right: 0.5rem;
    }

    margin-top: 0.5rem;
  }
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 0;
}
</style>