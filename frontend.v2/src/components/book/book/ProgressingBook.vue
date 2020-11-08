<template functional>
    <div class="book-line" @click="listeners.bookClick" :class="data.staticClass">
        <book-inline-header class="book-line__name" :book="props.book"
                            @editIconClick="listeners.editIconClick"
        />
        <no-wrap-values class="book-line__authors text-truncate" v-if="props.book.authors"
                        :values="props.book.authors"/>
        <progress-bar class="book-line__progress" :progress="Math.min(
              Math.round(
                ((props.book.doneUnits || 0) / (props.book.totalUnits || 1)) * 100
              ),
              100
        )"
        />
        <div class="book-line__progress-info">
            <book-time-progress class="dark-text" :book="props.book" v-if="props.book.type == 2"/>
            <book-page-progress class="dark-text" :book="props.book" v-else/>

            <book-date-range class="book-line__date-range" :book="props.book"/>
        </div>
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
