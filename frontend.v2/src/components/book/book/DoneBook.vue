<template functional>
    <div class="book-line" @click="listeners.bookClick" :class="data.staticClass">
        <book-inline-header class="book-line__header"
                            :book="props.book"
                            @editIconClick="listeners.editIconClick"
        />
        <no-wrap-values class="book-line__authors text-truncate" v-if="props.book.authors" :values="props.book.authors"/>
        <book-date-range class="book-line__date-range" :book="props.book"/>
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
