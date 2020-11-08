<template>
    <div class="input-group">
        <input
                type="number"
                @blur="onChangeYear()"
                class="form-control year"
                :placeholder="$t('book.inputs.dateInput.year')"
                v-model.number="yearValue"
                min="1970"
                max="10000"
                step="1"
        />
        <input
                type="number"
                @blur="onChangeMonth()"
                class="form-control month"
                :placeholder="$t('book.inputs.dateInput.month')"
                v-model.number="monthValue"
                min="1"
                max="12"
                step="1"
                :disabled="!enabledMonth"
        />
        <input
                type="number"
                @blur="onChangeDay()"
                class="form-control day"
                :placeholder="$t('book.inputs.dateInput.day')"
                v-model.number="dayValue"
                min="1"
                max="31"
                step="1"
                :disabled="!enabledDay"
        />
    </div>
</template>

<script>
    import inputMixin from '@/mixins/input-mixin';

    export default {
        data: () => ({
            yearValue: null,
            monthValue: null,
            dayValue: null
        }),
        mixins: [inputMixin],
        methods: {
            onChangeYear() {
                this.emitUpdateYear();

                if (!this.yearValue) {
                    this.resetMonth();
                    this.resetDay();
                }

                this.emitChangeValue();
            },
            onChangeMonth() {
                this.emitUpdateMonth();

                if (!this.monthValue) {
                    this.resetDay();
                }

                this.emitChangeValue();
            },
            onChangeDay() {
                this.emitUpdateDay();
                this.emitChangeValue();
            },

            resetYear() {
                this.yearValue = null;
                this.emitUpdateYear();
            },
            resetMonth() {
                this.monthValue = null;
                this.emitUpdateMonth();
            },
            resetDay() {
                this.dayValue = null;
                this.emitUpdateDay();
            },

            emitUpdateYear() {
                this.$emit("update:year", this.cleanYear);
            },
            emitUpdateMonth() {
                this.$emit("update:month", this.cleanMonth);
            },
            emitUpdateDay() {
                this.$emit("update:day", this.cleanDay);
            },
            emitChangeValue() {
                this.emitChange([this.cleanYear, this.cleanMonth, this.cleanDay])
            }
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
        },
        computed: {
            cleanYear() {
                if (this.yearValue) {
                    return Number(this.yearValue)
                } else {
                    return null
                }
            },
            cleanMonth() {
                if (this.monthValue) {
                    return Number(this.monthValue)
                } else {
                    return null
                }
            },
            cleanDay() {
                if (this.dayValue) {
                    return Number(this.dayValue)
                } else {
                    return null
                }
            },
            enabledMonth() {
                return this.cleanYear !== null;
            },
            enabledDay() {
                return this.enabledMonth && (this.cleanMonth !== null);
            }
        }
    };
</script>

<style>
</style>
