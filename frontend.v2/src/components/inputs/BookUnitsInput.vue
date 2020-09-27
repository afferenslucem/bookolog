<template>
  <div class="form-row">
    <div class="col">
      <input
        type="number"
        id="hours"
        @blur="onHoursChange()"
        class="form-control"
        :placeholder="$t('book.form.titles.progressInput.hours')"
        v-model.number="hours"
        min="0"
        max="200"
        step="1"
      />
    </div>
    <div class="col">
      <input
        type="number"
        id="minutes"
        @blur="onMinutesChange()"
        class="form-control"
        :placeholder="$t('book.form.titles.progressInput.minutes')"
        v-model.number="minutes"
        min="0"
        max="59"
        step="1"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    hours: null,
    minutes: null
  }),
  methods: {
    onHoursChange() {
      this.$emit("update:units", this.unitsVaule);
    },
    onMinutesChange() {
      this.$emit("update:units", this.unitsVaule);
    },
    unitsToData(units) {
      this.hours = Math.trunc(units / 60);
      this.minutes = units % 60;
    }
  },
  props: ["units"],
  created() {
    this.unitsToData(this.units);
  },
  watch: {
    units(newValue) { 
      console.log('units: ' + newValue),
      this.unitsToData(newValue || 0);
    }
  },
  computed: {
    unitsVaule() {
      return this.hours * 60 + this.minutes;
    }
  }
};
</script>

<style>
</style>