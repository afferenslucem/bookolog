<template functional>
    <div class="header book-header">
        <strong class="header-text">{{ props.book.name }}</strong>
        <div class="actions">
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
