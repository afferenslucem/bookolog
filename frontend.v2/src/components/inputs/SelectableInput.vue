<template>
  <div class="selectable-input form-group">
    <form @submit="submit($event)">
      <div class="form-row">
        <div class="col-8">
          <input
            v-model="value"
            type="text"
            class="form-control"
            :placeholder="placeholder"
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
              @click="pushValue(value)"
            >
              {{ value | capital }}
            </button>
          </div>
        </div>
        <div class="col-4">
          <button type="submit" class="btn btn-primary">{{ $t('common.buttons.add') }}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {fuzzyThrough} from '@/utils/fuzzy-throw.js'
import _ from 'declarray';
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
    placeholder: {
        type: String,
        default: () => '',
    },
  },
  methods: {
    submit(e) {
      this.pushBySubmit();
      e.preventDefault();
      e.stopPropagation();
    },
    pushBySubmit() {
      this.pushValue(this.value.trim().toLowerCase());
      this.value = "";
    },
    pushValue(value) {
      this.pushEvent(value);
      this.value = "";
    },
    pushEvent(value) {
      this.$emit("submitted", value);
    },
  },
  computed: {
    autocomplete() {
      let result = [];
      if (!this.value) {
        result = this.list;
      } else {
        result = fuzzyThrough(this.list, this.value);
      }
      return _(result).take(5).toArray();
    },
  },
};
</script>

<style>
</style>