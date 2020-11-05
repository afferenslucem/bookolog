<template>
    <form class="input-group" @focusout="onFormBlur()">
        <input
                type="number"
                @blur="onHoursChange()"
                @click="onHoursClick()"
                class="form-control hours"
                :placeholder="$t('book.form.titles.progressInput.hours')"
                v-model.number="hours"
                min="0"
                max="200"
                step="1"
        />
        <input
                type="number"
                @blur="onMinutesChange()"
                @click="onMinutesClick()"
                class="form-control minutes"
                :placeholder="$t('book.form.titles.progressInput.minutes')"
                v-model.number="minutes"
                min="0"
                max="59"
                step="1"
        />
    </form>
</template>

<script>
    export default {
        data: () => ({
            hours: null,
            minutes: null
        }),
        methods: {
            onHoursChange() {
                this.unitsToProgress(this.unitsValue);
            },
            onMinutesChange() {
                this.unitsToProgress(this.unitsValue);
            },
            onHoursClick() {
                if (this.hours === 0) {
                    this.hours = null;
                }
            },
            onFormBlur() {
                this.$emit("update:units", this.unitsValue);
            },
            onMinutesClick() {
                if (this.minutes === 0) {
                    this.minutes = null;
                }
            },
            unitsToProgress(units) {
                this.hours = Math.trunc(units / 60) || null;
                this.minutes = units % 60 || null;
            }
        },
        props: ["units"],
        created() {
            this.unitsToProgress(this.units || 0);
        },
        watch: {
            units(newValue) {
                this.unitsToProgress(newValue || 0);
            }
        },
        computed: {
            unitsValue() {
                return +this.hours * 60 + +this.minutes;
            }
        }
    };
</script>

<style>
</style>
