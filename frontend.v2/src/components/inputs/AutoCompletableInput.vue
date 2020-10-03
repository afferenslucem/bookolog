<template>
  <div class="selectable-input">
    <input
      v-model.trim="innerValue"
      type="text"
      class="form-control"
      :placeholder="placeholder"
      :list="completeId"
      autocomplete="on"
      @input="onInput()"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    />
    <div
      class="dropdown-menu datalist"
      :id="completeId"
      v-if="autocomplete.length > 0"
    >
      <a class="dropdown-item" v-for="value of autocomplete" :key="value" @click="optionClick(value)">
        {{ value | capital }}
      </a>
    </div>
  </div>
</template>

<script>
import { fuzzyThrough } from "@/utils/fuzzy-throw.js";
import _ from "declarray";
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
      type: String,
    },
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
      this.$emit("update:value", this.innerValue);
    },
    optionClick(value) {
      this.value = value;
      this.$emit("update:value", value);
    }
  },
  computed: {
    autocomplete() {
      let result = [];
      if (!this.innerValue) {
        result = this.datalist;
      } else {
        result = fuzzyThrough(this.datalist, this.innerValue);
      }
      return _(result).take(5).toArray();
    },
    completeId() {
      return `${this.name}-list`;
    },
  },
};
</script>

<style>
</style>