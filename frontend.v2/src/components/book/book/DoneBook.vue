<template functional>
    <div class="book-line" @click="listeners.bookClick" :class="data.staticClass">
        <book-inline-header class="book-line__header"
                            :book="props.book"
                            @editIconClick="listeners.editIconClick"
        />
        <no-wrap-values class="book-line__authors text-truncate" v-if="props.book.authors" :values="props.book.authors"/>
        <div class="book-line__date-range dark-text"
             v-if="props.book.startDate || props.book.endDate"
        >
            [
            <small
            >{{ props.book.startDate | dateFormat("...") }} -
                {{ props.book.endDate | dateFormat("...") }}</small
            >
            ]
        </div>
        <div v-if="props.book.note">
            <small class="dark-text">{{ props.book.note }}</small>
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

<style lang="scss">
    .book-line {
        &__date-range {
            line-height: 80%;
        }
    }
</style>
