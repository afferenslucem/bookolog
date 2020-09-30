export default {
    methods: {
        emitChange(value) {
            this.$emit("change", value);
        },
    }
}