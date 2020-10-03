<template>
  <div>
    <form class="form-row" @submit="submit($event)">
      <div class="col-10">
        <selectable-input
          :datalist="datalist"
          :placeholder="placeholder"
          :name="name"
          :value.sync="value"
        ></selectable-input>
      </div>
      <div class="col-2">
        <button class="btn btn-primary" type="submit">
          <i class="fa fa-plus-square-o plus" aria-hidden="true"></i>
        </button>
      </div>
    </form>

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
import SelectableInput from "./AutoCompletableInput";
import TagInputValue from "./TagInputValue";
export default {
  data: () => ({
    tagsValue: [],
    value: "",
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
    name: {
      type: String,
      required: true,
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
    submit(event) {
      event.preventDefault();
      event.stopPropagation();

      if (this.value == "") {
        return;
      }

      this.appendTag(this.value);
      this.value = "";
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

button {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;

  i {
    font-size: 1.2rem;
  }
}
</style>