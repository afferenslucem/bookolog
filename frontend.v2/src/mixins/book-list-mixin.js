export default {
    methods: {
        goToEdit(guid) {
            this.$router.push({
                name: 'UpdateBook',
                params: {
                    guid
                }
            });
        },
        goToInfo(guid) {
            this.$router.push({
                name: 'Book',
                params: {
                    guid
                }
            });
        },

        editClick(book, event) {
            event.stopPropagation();
            this.goToEdit(book.guid);
        },
        lineClick(book) {
            this.goToInfo(book.guid);
        }
    },
}