import {
    expect
} from 'chai'
import books from '../../data/books'
import {
    shallowMount
} from '@vue/test-utils'
import BooksByYearsList from "@/components/book-module/books-lists/BooksByYearsList";
import {
    DONE_STATUS
} from '@/models/book';
import DoneBook from '@/components/book-module/book/DoneBook.vue';
import _ from 'declarray';

describe('BooksByYearsList.vue', () => {
    let wrapper = null;

    const doneBooks = _(books).where(item => item.status === DONE_STATUS).toArray();

    beforeEach(() => {
        wrapper = shallowMount(BooksByYearsList, {
            propsData: {
                books: doneBooks
            },
            mocks: {
                $t: () => ''
            }
        })
    });

    it('Render correct count of books', () => {
        const items = wrapper.findAllComponents(DoneBook);
        expect(items.length).to.equal(3)
    })

    it('Compare books', () => {
        const items = wrapper.findAllComponents(DoneBook);

        for (let i = 0; i < doneBooks.length; i++) {
            const item = items.at(i);
            expect(item.props().book.name).to.equal(doneBooks[i].name);
        }
    })

    it('Should show empty list', () => {
        wrapper = shallowMount(BooksByYearsList, {
            propsData: {
                books: []
            }
        })

        const items = wrapper.findAllComponents(DoneBook);
        expect(items.length).to.equal(0);
    })
})