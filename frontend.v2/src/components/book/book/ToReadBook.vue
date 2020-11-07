<template functional>
    <div class="book-line" @click="listeners.bookClick" :class="data.staticClass">
        <book-inline-header
                :book="props.book"
                @editIconClick="listeners.editIconClick"
        />
        <no-wrap-values v-if="props.book.authors" :values="props.book.authors"/>
    </div>
</template>

<script>
    export default {
        props: {
            book: {
                required: true,
                type: Object,
            },
        },
    };
</script>

<style>
</style>
