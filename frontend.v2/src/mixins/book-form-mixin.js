import { TO_READ_STATUS, IN_PROGRESS_STATUS, DONE_STATUS, PAPER_BOOK_TYPE, ELECTRONIC_BOOK_TYPE, AUDIO_BOOK_TYPE } from '@/models/book';
import moment from 'moment';

export default {
    data: function(){
      return {
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
          { value: TO_READ_STATUS, name: this.$t('book.entity.status.toRead') },
          { value: IN_PROGRESS_STATUS, name: this.$t('book.entity.status.inProgress') },
          { value: DONE_STATUS, name: this.$t('book.entity.status.done') },
        ],
        bookTypes: [
          { value: PAPER_BOOK_TYPE, name: this.$t('book.entity.type.paper') },
          { value: ELECTRONIC_BOOK_TYPE, name: this.$t('book.entity.type.electronic') },
          { value: AUDIO_BOOK_TYPE, name: this.$t('book.entity.type.audio') },
        ],
        bookNamePattern: '[A-Za-zА-Яа-яЁё0-9\\s\\\\.\\\\,\\\\(\\\\)\\\\-\\\\:\\\\!]+',
        bookTagsPattern: '[A-Za-zА-Яа-яЁё0-9\\s\\\\.\\\\,\\\\(\\\\)\\\\-]+',
        bookAuthorsPattern: '[A-Za-zА-Яа-яЁё0-9\\s\\\\.\\\\,\\\\(\\\\)\\\\-]+',
        genrePattern: '[A-Za-zА-Яа-яЁё\\s\\\\-]++',
      }
    },
    methods: {
      setMeta() {
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
      },
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
          return this.$t('book.form.titles.progress.listen.title')
        } else {
          return this.$t('book.form.titles.progress.read.title')
        }
      },
      progressDonePlaceholder() {
        if (this.book.type === AUDIO_BOOK_TYPE) {
          return this.$t('book.form.titles.progress.listen.units')
        } else {
          return this.$t('book.form.titles.progress.read.units')
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