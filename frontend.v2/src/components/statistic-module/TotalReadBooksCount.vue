<template>
    <div class="total-placeholder">
        <div v-if="total > 0">{{total}}</div>
    </div>
</template>

<script>
import { BOOKS_DONE_GETTER } from "@/store/naming";
export default {
    computed: {
        total() {            
            return this.$store.getters[BOOKS_DONE_GETTER]?.length || 0;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.total-placeholder {
    padding: 0.1rem 0.1rem;

    background-color: $total-placeholder-color;

    $size: $icon-size / 3.5;

    min-width: 1rem;

    line-height: $size;
    line-height: $size;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 0.3rem;
}

</style>