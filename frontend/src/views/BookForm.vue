<template>
    <form>
        <div class="form-group">
            <label>Заголовок книги</label>
            <input type="text" class="form-control" v-model.trim="book.name" />
        </div>
        <div class="form-group">
            <span>Авторы</span>
            
            <div class="form-group" v-for="(item, index) in book.authors" :key="index">
                <input type="text" class="form-control" v-model.trim="book.authors[index]" @blur="authorBlur(item, index)" />
            </div>
        </div> 
        <div class="form-group">
            <label>Статус</label>
            <select class="form-control" v-model.number="book.status">
                <option v-for="(value, index) in statuses" :value="index" :key="index">{{value}}</option>
            </select>
        </div>
        <div class="form-row" v-show="shouldShowDates">
            <div class="col form-group">
                <label>Дата начала чтения</label>
                <date-input :year="book.startYear" :month="book.startMonth" :day="book.startDay"
                 @year="book.startYear = $event" @month="book.startMonth = $event" @day="book.startDay = $event"></date-input>
            </div>
            <div class="col form-group">
                <label>Дата окончания чтения</label>
                <date-input :year="book.endYear" :month="book.endMonth" :day="book.endDay"
                @year="book.endYear = $event" @month="book.endMonth = $event" @day="book.endDay = $event"></date-input>
            </div>
        </div>
        <div class="form-row" v-show="shouldShowProgress">
            <div class="col form-group">
                <label>Страниц прочитано</label>
                <input type="number" class="form-control" v-model.number="book.pagesRead" min="0" :max="book.totalPages" step="1" @change="pagesChanged">
            </div>
            <div class="col form-group">
                <label>Всего страниц</label>
                <input type="number" class="form-control" v-model.number="book.totalPages" min="0" step="1">
            </div>
        </div>
        <div class="buttons-group">
            <button class="btn btn-primary" type="button" @click="submit">
                Сохранить
            </button>
            <button class="btn btn-outline-danger" v-show="isEdit || isDelete" type="button" @click="del">
                Удалить
            </button>
        </div>
    </form>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Book, BookUtils, Status } from '../types/books-module'
    import { BookActions } from '../store/modules/books/storage-methods';
    import DateInput from '@/components/common/DateInput.vue'

    interface Data {
        book: Book;
        statuses: any;
    }

    function formatDate(date: Date): string {
        const year = date.getFullYear();

        const month = date.getMonth() + 1;
        const monthFormatted = month < 10 ? '0' + month : month;

        const day = date.getDate();
        const dayFormatted = day < 10 ? '0' + day : day;

        return `${year}-${monthFormatted}-${dayFormatted}`;
    }

    export default Vue.extend({
        components: { DateInput },
        data() {
            return {
                book: {},
                statuses: {
                    [Status.toRead]: 'К прочтению',
                    [Status.inProgress]: 'Читаю',
                    [Status.done]: 'Прочтено',
                }
            } as Data;
        },
        computed: {
            isEdit(): boolean {
                return this.$route.params.action == 'edit';
            },
            isCreate(): boolean {
                return this.$route.params.action == 'create';
            },
            isDelete(): boolean {
                return this.$route.params.action == 'delete';
            },
            id(): number | null {
                if(this.$route.params.id) {
                    return Number(this.$route.params.id);
                } else {
                    return null;
                }
            },
            endDateDisabled(): boolean {
                return this.book.status != Status.done;
            },
            shouldShowDates(): boolean {
                return this.book.status != Status.toRead;
            },
            shouldShowProgress(): boolean {
                return this.book.status == Status.inProgress;
            },
        },
        methods: {
            authorBlur(item: string, index: number): void {
                if(item !== '') {
                    this.addLastAuthor();
                }
                else {
                    const authors = this.book.authors;

                    this.book.authors = authors.slice(0, index).concat(authors.slice(index + 1));
                }

            },
            addLastAuthor(): void {
                const last = this.book.authors.slice(-1)[0];

                if(last !== '') {
                    this.book.authors.push('');
                }
            },
            pagesChanged(): void {
                if(this.book.pagesRead && this.book.totalPages == this.book.pagesRead) {
                    this.book.status = Status.done;
                }
            },
            edit(): Promise<void> {
                return this.$store.dispatch(BookActions.updateBook, this.book).then(() => { 
                    this.$router.push({name: 'Reading'});
                });
            },
            save(): Promise<void> {
                return this.$store.dispatch(BookActions.createBook, this.book).then(() => { 
                    this.$router.push({name: 'Reading'});
                });
            },
            submit(): Promise<void> {
                if(this.isCreate) {
                    return this.save();
                } else {
                    return this.edit();
                }
            },
            del(): Promise<void> {
                return this.$store.dispatch(BookActions.deleteBook, this.book); 
            },
        },
        filters: {
            dateBound(date: Date): string {
                return formatDate(date);
            }
        },
        created(): void {
            if(this.isCreate) {
                this.book = new Book({
                    id: 0,
                    name: '',
                    authors: [''],
                    status: null
                });
            } else {
                const book = this.$store.state.booksStorage.books.find((item: Book) => item.id == this.id);

                this.book = BookUtils.copy(book);
                this.book.authors.push('');
            }
        }
    })
</script>

<style lang="scss" scoped>

</style>