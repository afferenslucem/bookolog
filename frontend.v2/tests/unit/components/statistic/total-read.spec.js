import {
    expect
} from 'chai'
import {
    shallowMount
} from '@vue/test-utils'
import TotalReadBooks from '@/components/statistic-module/TotalReadBooksCount.vue';
import _ from 'declarray';
import books from '../../data/books';
import {
    BOOKS_DONE_GETTER
} from "@/store/naming";
import {
    DONE_STATUS
} from '@/models/book';

describe('TotalReadBooks.vue', () => {
    it('should render books count', () => {
        const doneBooks = _(books).where(item => item.status === DONE_STATUS).toArray();

        const wrapper = shallowMount(TotalReadBooks, {
            mocks: {
                $store: {
                    getters: {
                        [BOOKS_DONE_GETTER]: doneBooks
                    }
                }
            }
        });

        expect(wrapper.text()).to.include(doneBooks.length.toString());
    });

    it('should not render books count', () => {
        const wrapper = shallowMount(TotalReadBooks, {
            mocks: {
                $store: {
                    getters: {
                        [BOOKS_DONE_GETTER]: []
                    }
                }
            }
        });

        expect(wrapper.find('.total-placeholder').exists()).to.equal(false);
    });
});