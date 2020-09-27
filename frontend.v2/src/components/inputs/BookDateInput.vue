<template>
  <div class="form-row">
    <div class="col">
      <input
        type="number"
        id="year"
        @blur="onChangeYear()"
        class="form-control"
        :placeholder="$t('book.form.titles.dateInput.year')"
        v-model.number="yearValue"
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
        v-model.number="monthValue"
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
        v-model.number="dayValue"
        min="1"
        max="31"
        step="1"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    yearValue: null,
    monthValue: null,
    dayValue: null
  }),
  methods: {
    onChangeYear() {
      this.$emit("update:year", this.yearValue);
    },
    onChangeMonth() {
      this.$emit("update:month", this.monthValue);
    },
    onChangeDay() {
      this.$emit("update:day", this.dayValue);
    },
  },
  props: ["year", "month", "day"],
  created() {
    this.yearValue = this.year;
    this.monthValue = this.month;
    this.dayValue = this.day;
  },
  watch: {
    year: function (newValue) { 
      this.yearValue = newValue; 
    },
    month: function (newValue) { 
      this.monthValue = newValue
    },
    day: function (newValue) { 
      this.dayValue = newValue
    },
  }
};
</script>

<style>
</style>