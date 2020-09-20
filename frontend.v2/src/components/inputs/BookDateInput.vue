<template>
  <div class="form-row">
    <div class="col">
      <input
        type="number"
        id="year"
        @blur="onChangeYear()"
        class="form-control"
        :placeholder="$t('book.form.titles.dateInput.year')"
        v-model.number="year"
        min="1970"
        max="10000"
        step="1"
      />
    </div>
    <div class="col">
      <input
        type="number"
        id="month"
        @blur="onChangeMonth()"
        class="form-control"
        :placeholder="$t('book.form.titles.dateInput.month')"
        v-model.number="month"
        min="1"
        max="12"
        step="1"
      />
    </div>
    <div class="col">
      <input
        type="number"
        id="day"
        @blur="onChangeDay()"
        class="form-control"
        :placeholder="$t('book.form.titles.dateInput.day')"
        v-model.number="day"
        min="1"
        max="31"
        step="1"
      />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onChangeYear() {
      this.$emit("update:year", this.year);
    },
    onChangeMonth() {
      this.$emit("update:month", this.month);
    },
    onChangeDay() {
      this.$emit("update:day", this.day);
    },
  },
  props: ["year", "month", "day"],
};
</script>

<style>
</style>