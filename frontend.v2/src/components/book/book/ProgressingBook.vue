<template functional>
    <div class="book-line" @click="listeners.bookClick" :class="data.staticClass">
        <book-inline-header class="book-line__name" :book="props.book"
                            @editIconClick="listeners.editIconClick"
        />
        <no-wrap-values class="book-line__authors text-truncate" v-if="props.book.authors" :values="props.book.authors"/>
        <progress-bar class="book-line__progress" :progress="Math.min(
              Math.round(
                ((props.book.doneUnits || 0) / (props.book.totalUnits || 1)) * 100
              ),
              100
        )
      "
        />
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
