<template>
  <div class="selectable-input">
    <input
      v-model.trim="innerValue"
      type="text"
      class="form-control"
      :placeholder="placeholder"
      :list="completeId"
      @input="onInput()"
    />
    <datalist :id="completeId" class="datalist" v-if="autocomplete.length > 0">
      <option
        v-for="value of autocomplete"
        :key="value"
      >
        {{ value | capital }}
      </option>
    </datalist>
  </div>
</template>

<script>
import { fuzzyThrough } from "@/utils/fuzzy-throw.js";
export default {
  data: () => ({
    innerValue: "",
  }),
  props: {
    datalist: {
      type: Array,
      required: false,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: () => "",
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String
    }
  },
  created() {
    this.innerValue = this.value;
  },
  watch: {
    value(newValue) {
      this.innerValue = newValue;
    },
  },
  methods: {
    onInput() {
      this.$emit('update:value', this.innerValue);
    }
  },
  computed: {
    autocomplete() {
      let result = [];
      if (!this.innerValue
      ) {
        result = this.datalist;
      } else {
        result = fuzzyThrough(this.datalist, this.innerValue
        );
      }
      return result;
    },
    completeId() {
      return `${this.name}-list`;
    }
  },
};
</script>

<style>
</style>