<template>
  <div class="selectable-input form-group">
    <form @submit="submit($event)">
      <div class="form-row">
        <div class="col-8">
          <input
            v-model.trim="value"
            type="text"
            class="form-control"
            placeholder="Тег"
            autocomplete="off"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          />
          <div
            class="dropdown-menu dropdown-menu-right"
            v-if="autocomplete.length > 0"
          >
            <button
              class="dropdown-item"
              v-for="value of autocomplete"
              :key="value"
              type="button"
            >
              {{ value }}
            </button>
          </div>
        </div>
        <div class="col-4">
          <button type="submit" class="btn btn-primary">Добавить</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {fuzzyThrough} from '@/utils/fuzzy-throw.js'
export default {
  data: () => ({
    value: "",
  }),
  props: {
    list: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  methods: {
    submit(e) {
      this.pushBySubmit();
      e.preventDefault();
      e.stopPropagation();
    },
    pushBySubmit() {
      this.pushValue(this.value);
      this.value = "";
    },
    pushValue(value) {
      this.pushEvent(value);
      this.value = "";
    },
    pushEvent(value) {
      this.$emit("submitted", value);
    },
    fuzzy(line, term, ratio = 0.25) {
      var string = line.toLowerCase();
      var compare = term.toLowerCase();
      var matches = 0;

      if (string.indexOf(compare) > -1) return true; // covers basic partial matches

      for (var i = 0; i < compare.length; i++) {
        string.indexOf(compare[i]) > -1 ? (matches += 1) : (matches -= 1);
      }

      return matches / line.length >= ratio || term == "";
    },
  },
  computed: {
    autocomplete() {
      if (!this.value) {
        return this.list;
      } else {
        const result = fuzzyThrough(this.value);
        return result;
      }
    },
  },
};
</script>

<style>
</style>