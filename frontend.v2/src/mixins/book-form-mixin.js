import { TO_READ_STATUS, IN_PROGRESS_STATUS, DONE_STATUS, PAPER_BOOK_TYPE, ELECTRONIC_BOOK_TYPE, AUDIO_BOOK_TYPE } from '@/models/book';
import moment from 'moment';

export default {
    data: () => ({
      book: {
        name: "",
        authors: [],
        year: null,
        genre: '',
        tags: [],
        type: PAPER_BOOK_TYPE,
        status: TO_READ_STATUS
      },
      statuses: [
        { value: TO_READ_STATUS, name: 'Собираюсь читать' },
        { value: IN_PROGRESS_STATUS, name: 'Читаю' },
        { value: DONE_STATUS, name: 'Прочитал' },
      ],
      bookTypes: [
        { value: PAPER_BOOK_TYPE, name: 'Бумажная книга' },
        { value: ELECTRONIC_BOOK_TYPE, name: 'Электронная книга' },
        { value: AUDIO_BOOK_TYPE, name: 'Аудиокнига' },
      ]
    }),
    methods: {
      setMeta() {
          this.book.modifyTime = moment(new Date()).format();
          this.book.shouldSynch = true;
      },
      statusChange(status) {
        if (status == IN_PROGRESS_STATUS) {
          this.book.startDate = this.today;
        } else if (status == DONE_STATUS) {
          this.book.endDate = this.today;
        }
      },
      redirectForBook(book) {
          switch(book.status) {
            case TO_READ_STATUS: {
                this.$router.push({name: 'ToRead'});
                return;
            }
            case IN_PROGRESS_STATUS: {
                this.$router.push({name: 'InProgress'});
                return;
            }
            case DONE_STATUS: {
                this.$router.push({name: 'Done'});
                return;
            }
          }
      }
    },
    computed: {
      authorsComp: {
        get: function () {
          return this.book.authors.join(", ");
        },
        set: function (value) {
          this.book.authors = value.split(",").map((item) => item.trim());
        },
      },
      tagsComp: {
        get: function () {
          return this.book.tags.join(", ");
        },
        set: function (value) {
          this.book.tags = value.split(",").map((item) => item.trim());
        },
      },
      progressHeader() {
        if (this.book.type === AUDIO_BOOK_TYPE) {
          return 'Прослушано'
        } else {
          return 'Прочитано'
        }
      },
      progressDonePlaceholder() {
        if (this.book.type === AUDIO_BOOK_TYPE) {
          return 'Минут'
        } else {
          return 'Страниц'
        }
      },
      today() {
        return new Date();
      },
      showStartDate() {
        return this.book.status > TO_READ_STATUS;
      },
      showEndDate() {
        return this.book.status > IN_PROGRESS_STATUS;
      },
      showProgress() {
        return this.book.status == IN_PROGRESS_STATUS;
      }
    },
    filters: {
      calendarDate(date) {
        if(!date) return null;
  
        return moment(date).format('YYYY-MM-DD');
      }
    },
    created() {
      this.book.status = Number(this.$route.params.status)
    }
  };