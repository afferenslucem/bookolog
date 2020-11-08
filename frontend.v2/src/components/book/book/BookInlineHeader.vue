<template functional>
    <div class="header book-header">
        <strong class="book-header__text text-truncate">{{ props.book.name }}</strong>
        <div class="book-header__actions">
            <should-sync-icon v-if="props.book.shouldSync" class="shouldSync"></should-sync-icon>

            <div @click="listeners.editIconClick">
                <edit-icon class="fa-lg"></edit-icon>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            book: {
                type: Object,
                required: true,
            },
        },
    };
</script>

<style lang="scss" scoped>
    .book-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;

        &__actions {

            display: flex;

            align-items: baseline;

            justify-content: flex-end;

            > i:not(:last-child) {
                margin-right: 0.3rem;
            }
        }

        &__text {
            padding-right: .5rem;
        }

        .fa {
            font-size: 1.5rem;
        }
    }
</style>
