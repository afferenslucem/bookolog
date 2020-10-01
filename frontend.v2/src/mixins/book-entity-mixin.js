import moment from 'moment';
import {
    TO_READ_STATUS,
    IN_PROGRESS_STATUS,
    DONE_STATUS
} from '@/models/book';

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

        editClick(e) {
            this.goToEdit(this.book.guid);
            e.stopPropagation();
        },
        lineClick() {
            this.goToInfo(this.book.guid);
        }
    },
    computed: {
        progress() {
            return Math.min(Math.round(this.done / this.total * 100), 100);
        },
        done() {
            return Math.min(this.book.doneUnits || 0, this.book.totalUnits || 0);
        },
        total() {
            return this.book.totalUnits || Number.MAX_SAFE_INTEGER;
        },
        shouldShowProgress() {
            return this.book.status == IN_PROGRESS_STATUS;
        },
        startedBook() {
            return this.book.status != TO_READ_STATUS;
        },
        toReadDook() {
            return this.book.status == TO_READ_STATUS;
        },
        doneBook() {
            return this.book.status == DONE_STATUS;
        },
        startDate() {
            return moment(this.book.startDate).format('ll')
        },
        endDate() {
            return moment(this.book.endDate).format('ll')
        }
    }
}