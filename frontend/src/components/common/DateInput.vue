<template>
  <form>
      <div class="form-row">
        <div class="col">
            <input class="form-control" :class="{ 'is-invalid': !isValid(yearProp, yearMin, currentYear) }" type="number" step="1" v-model.number="yearProp" placeholder="Год" :min="yearMin" :max="currentYear" />
        </div>
        <div class="col">
            <input class="form-control" :class="{ 'is-invalid': !isValid(monthProp, monthMin, monthMax) }" type="number" step="1" v-model.number="monthProp" placeholder="Месяц" :max="monthMax" :min="monthMin" />
        </div>
        <div class="col">
            <input class="form-control" :class="{ 'is-invalid': !isValid(dayProp, dayMin, dayMax) }" type="number" step="1" v-model.number="dayProp" placeholder="День" :max="dayMax" :min="dayMin" />
        </div>
      </div>
  </form>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        props: {
            year: {
                type: Number,
            },
            month: {
                type: Number,
            },
            day: {
                type: Number,
            }
        },
        data() {
            return {
                yearMin: 1940,
                monthMin: 1,
                monthMax: 12,
                dayMin: 1,
                dayMax: 31,
            }
        },
        methods: {
            onChange(name: string, event: number): void {
                const value = event;

                if(event) {
                    this.$emit(name, value);
                } else {
                    this.$emit(name, null);
                }

                if(this.yearProp) {
                    this.$emit('setted');
                }

                if(!this.yearProp) {
                    this.$emit('removed');
                }
            },
            isValid(num: number, min?: number | undefined, max?: number | undefined): boolean {
                if(num == null) return true;

                if(min && num < min) return false;

                if(max && num > max) return false;

                return true;
            }
        },
        computed: {
            yearValid(): boolean {
                return this.isValid(this.yearProp, this.yearMin, this.currentYear);
            },
            monthValid(): boolean {
                return this.isValid(this.monthProp, this.monthMin, this.monthMax);
            },
            dayValid(): boolean {
                return this.isValid(this.dayProp, this.dayMin, this.dayMax);
            },
            currentYear(): number {
                return new Date().getFullYear();
            },
            yearProp: {
                set(value: number) {
                    this.onChange('year', value);

                    if(!value) {
                        this.monthProp = null;
                    }
                },
                get(): number | null {
                    return this.year;
                }
            },
            monthProp: {
                set(value: number) {
                    this.onChange('month', value);

                    if(!value) {
                        this.dayProp = null;
                    }
                },
                get(): number | null {
                    if(this.yearProp == null) {
                        return null;
                    }
                    return this.month;
                }
            },
            dayProp: {
                set(value: number) {
                    this.onChange('day', value);
                },
                get(): number | null {
                    if(this.monthProp == null) {
                        return null;
                    }

                    return this.day;
                }
            },

        }
    })
</script>

<style>

</style>