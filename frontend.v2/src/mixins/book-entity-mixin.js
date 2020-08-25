import {IN_PROGRESS_STATUS} from '../models/book'
import moment from 'moment';

export default {
    methods: {
        goToEdit(guid) {
            this.$router.push({ name: 'UpdateBook', params: { guid }});
        }
    },
    computed: {
        progress() {
            return Math.round(this.book.doneUnits / this.book.totalUnits * 100);
        },
        shouldShowProgress() {
            return this.book.status == IN_PROGRESS_STATUS && this.book.totalUnits && this.book.doneUnits;
        },
        startDate() {
            return moment(this.book.startDate).format('YYYY-MM-DD')
        },
        endDate() {
            return moment(this.book.endDate).format('YYYY-MM-DD')
        }
    }
}