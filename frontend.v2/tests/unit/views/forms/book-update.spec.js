import {
    expect,
    assert
} from 'chai'
import {
    shallowMount
} from '@vue/test-utils'
import BookUpdate from '@/views/books/entity/BookUpdate.vue';
import {
    BOOKS_TAGS_COUNT_GETTER,
    BOOKS_AUTHORS_COUNT_GETTER,
    BOOKS_GENRES_COUNT_GETTER,
    BOOK_UPDATE_ACTION,
    BOOK_GET_FRESHEST_BOOK_BY_GUID_ACTION,
    NOTIFICATION_WARNING_ACTION,
    NOTIFICATION_DANGER_ACTION,
    NOTIFICATION_SUCCESS_ACTION,
} from "@/store/naming";
import sin from 'sinon';
import {
    NETWORK_ERROR
} from '../../../../src/store/naming';
import store from '@/store';

describe('BookUpdate.vue', () => {
    let wrapper = null;
    beforeEach(async () => {
        wrapper = shallowMount(BookUpdate, {
            mocks: {
                $t: () => '',
                $route: {
                    params: {
                        guid: 1
                    }
                },
                $store: {
                    getters: {
                        [BOOKS_AUTHORS_COUNT_GETTER]: [],
                        [BOOKS_TAGS_COUNT_GETTER]: [],
                        [BOOKS_GENRES_COUNT_GETTER]: [],
                    }
                },
            }
        });
    })

    it('Renders dates', async () => {
        wrapper.vm.book.status = 0;

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.start-date').isVisible()).equal(false);
        expect(wrapper.find('.end-date').isVisible()).equal(false);

        wrapper.vm.book.status = 1;

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.start-date').isVisible()).equal(true);
        expect(wrapper.find('.end-date').isVisible()).equal(false);

        wrapper.vm.book.status = 2;

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.start-date').isVisible()).equal(true);
        expect(wrapper.find('.end-date').isVisible()).equal(true);
    })

    it('Prefill dates for new done status', async () => {
        wrapper.vm.initialStatus = 1;
        wrapper.vm.initialUnits = 10;

        wrapper.vm.book.totalUnits = 100;
        wrapper.vm.book.doneUnits = 10;

        expect(wrapper.vm.book.endDateYear).equal(null);
        expect(wrapper.vm.book.endDateMonth).equal(null);
        expect(wrapper.vm.book.endDateDay).equal(null);
        expect(wrapper.vm.book.doneUnits).equal(10);

        wrapper.find('#status').setValue(2);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.book.endDateYear).equal(new Date().getFullYear());
        expect(wrapper.vm.book.endDateMonth).equal(new Date().getMonth() + 1);
        expect(wrapper.vm.book.endDateDay).equal(new Date().getDate());
        expect(wrapper.vm.book.doneUnits).equal(100);

        wrapper.find('#status').setValue(1);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.book.endDateYear).equal(null);
        expect(wrapper.vm.book.endDateMonth).equal(null);
        expect(wrapper.vm.book.endDateDay).equal(null);
        expect(wrapper.vm.book.doneUnits).equal(10);
    })

    it('Prefill dates for new progress status', async () => {
        wrapper.vm.initialStatus = 0;

        expect(wrapper.vm.book.startDateYear).equal(null);
        expect(wrapper.vm.book.startDateMonth).equal(null);
        expect(wrapper.vm.book.startDateDay).equal(null);

        wrapper.find('#status').setValue(1);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.book.startDateYear).equal(new Date().getFullYear());
        expect(wrapper.vm.book.startDateMonth).equal(new Date().getMonth() + 1);
        expect(wrapper.vm.book.startDateDay).equal(new Date().getDate());

        wrapper.find('#status').setValue(0);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.book.startDateYear).equal(null);
        expect(wrapper.vm.book.startDateMonth).equal(null);
        expect(wrapper.vm.book.startDateDay).equal(null);
    })

    it('Should not prefill dates for same done status', async () => {
        wrapper.vm.initialStatus = 2;

        expect(wrapper.vm.book.endDateYear).equal(null);
        expect(wrapper.vm.book.endDateMonth).equal(null);
        expect(wrapper.vm.book.endDateDay).equal(null);
        expect(wrapper.vm.book.doneUnits).equal(null);

        wrapper.find('#status').setValue(2);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.book.endDateYear).equal(null);
        expect(wrapper.vm.book.endDateMonth).equal(null);
        expect(wrapper.vm.book.endDateDay).equal(null);
        expect(wrapper.vm.book.doneUnits).equal(null);
    })

    it('Should not prefill dates for same progress status', async () => {
        wrapper.vm.initialStatus = 1;

        expect(wrapper.vm.book.startDateYear).equal(null);
        expect(wrapper.vm.book.startDateMonth).equal(null);
        expect(wrapper.vm.book.startDateDay).equal(null);

        wrapper.find('#status').setValue(1);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.book.startDateYear).equal(null);
        expect(wrapper.vm.book.startDateMonth).equal(null);
        expect(wrapper.vm.book.startDateDay).equal(null);
    })


    it('Should return valid form after create', async () => {
        wrapper.vm.book.name = 'name';
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.formValid).equal(true);
        expect(wrapper.vm.nameValid).equal(true);

        expect(wrapper.find('.submit').attributes().disabled).equal(undefined);

        wrapper.vm.book.name = '';
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.formValid).equal(false);
        expect(wrapper.vm.nameValid).equal(false);

        expect(wrapper.find('.submit').attributes().disabled).equal('disabled');
    })

    it('Should return invalid units', async () => {
        wrapper.vm.book.name = 'name';
        wrapper.vm.book.status = 1;

        wrapper.vm.book.doneUnits = 88;
        wrapper.vm.book.totalUnits = 44;

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.showProgress).equal(true);
        expect(wrapper.vm.unitsValid).equal(false);
        expect(wrapper.vm.formValid).equal(false);
        expect(wrapper.find('.progress-row').classes()).to.contains('is-invalid');

        wrapper.vm.book.doneUnits = 44;
        wrapper.vm.book.totalUnits = 88;

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.unitsValid).equal(true);
        expect(wrapper.vm.formValid).equal(true);
        expect(wrapper.find('.progress-row').classes()).not.contains('is-invalid');
    });

    it('Should return invalid dates', async () => {
        wrapper.vm.book.name = 'name';
        wrapper.vm.book.status = 2;

        wrapper.vm.book.endDateYear = 2018;
        wrapper.vm.book.startDateYear = 2020;

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.datesValid).equal(false);
        expect(wrapper.vm.formValid).equal(false);

        expect(wrapper.find('.dates').classes()).to.contains('is-invalid');

        wrapper.vm.book.status = 1;

        expect(wrapper.vm.datesValid).equal(true);
        expect(wrapper.vm.formValid).equal(true);

        wrapper.vm.book.status = 2;

        expect(wrapper.vm.datesValid).equal(false);
        expect(wrapper.vm.formValid).equal(false);

        wrapper.vm.book.endDateYear = 2020;
        wrapper.vm.book.startDateYear = 2020;

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.dates').classes()).not.contains('is-invalid');
        expect(wrapper.vm.datesValid).equal(true);
        expect(wrapper.vm.formValid).equal(true);

        wrapper.vm.book.endDateMonth = 7;
        wrapper.vm.book.startDateMonth = 9;

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.dates').classes()).to.contains('is-invalid');
        expect(wrapper.vm.datesValid).equal(false);
        expect(wrapper.vm.formValid).equal(false);

        wrapper.vm.book.endDateMonth = 9;
        wrapper.vm.book.startDateMonth = 9;

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.dates').classes()).not.contains('is-invalid');
        expect(wrapper.vm.datesValid).equal(true);
        expect(wrapper.vm.formValid).equal(true);

        wrapper.vm.book.endDateDay = 7;
        wrapper.vm.book.startDateDay = 9;

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.dates').classes()).to.contains('is-invalid');
        expect(wrapper.vm.datesValid).equal(false);
        expect(wrapper.vm.formValid).equal(false);

        wrapper.vm.book.endDateDay = 10;
        wrapper.vm.book.startDateDay = 9;

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.dates').classes()).not.contains('is-invalid');
        expect(wrapper.vm.datesValid).equal(true);
        expect(wrapper.vm.formValid).equal(true);
    });
})

describe('BookUpdate.vue', () => {
    it('Should show success', async () => {
        const dispatch = sin.stub();

        const wrapper = shallowMount(BookUpdate, {
            mocks: {
                $t: () => '',
                $route: {
                    params: {
                        guid: 1
                    }
                },
                $store: {
                    getters: {
                        [BOOKS_AUTHORS_COUNT_GETTER]: [],
                        [BOOKS_TAGS_COUNT_GETTER]: [],
                        [BOOKS_GENRES_COUNT_GETTER]: [],
                    },
                    dispatch,
                },
            }
        });

        wrapper.vm.redirectForBook = sin.stub();

        dispatch.onCall(0).resolves;

        await wrapper.vm.submit({
            preventDefault: sin.stub()
        });

        assert.isTrue(dispatch.calledWith(BOOK_UPDATE_ACTION))
        assert.isTrue(dispatch.calledWith(NOTIFICATION_SUCCESS_ACTION))
        assert.isTrue(wrapper.vm.redirectForBook.calledOnce);
    });

    it('Should show warn for network error', async () => {
        const dispatch = sin.stub();

        const wrapper = shallowMount(BookUpdate, {
            mocks: {
                $t: () => '',
                $route: {
                    params: {
                        guid: 1
                    }
                },
                $store: {
                    getters: {
                        [BOOKS_AUTHORS_COUNT_GETTER]: [],
                        [BOOKS_TAGS_COUNT_GETTER]: [],
                        [BOOKS_GENRES_COUNT_GETTER]: [],
                    },
                    dispatch,
                },
            }
        });

        wrapper.vm.redirectForBook = sin.stub();

        dispatch.onCall(0).rejects(NETWORK_ERROR);

        await wrapper.vm.submit({
            preventDefault: sin.stub()
        });

        assert.isTrue(dispatch.calledWith(BOOK_UPDATE_ACTION))
        assert.isTrue(dispatch.calledWith(NOTIFICATION_WARNING_ACTION))
        assert.isTrue(wrapper.vm.redirectForBook.calledOnce);
    });

    it('Should show dang for unexpected error', async () => {
        const dispatch = sin.stub();

        const wrapper = shallowMount(BookUpdate, {
            mocks: {
                $t: () => '',
                $route: {
                    params: {
                        guid: 1
                    }
                },
                $store: {
                    getters: {
                        [BOOKS_AUTHORS_COUNT_GETTER]: [],
                        [BOOKS_TAGS_COUNT_GETTER]: [],
                        [BOOKS_GENRES_COUNT_GETTER]: [],
                    },
                    dispatch,
                },
            }
        });

        wrapper.vm.redirectForBook = sin.stub();

        dispatch.onCall(0).rejects();

        await wrapper.vm.submit({
            preventDefault: sin.stub()
        });

        assert.isTrue(dispatch.calledWith(BOOK_UPDATE_ACTION))
        assert.isTrue(dispatch.calledWith(NOTIFICATION_DANGER_ACTION))
        assert.isTrue(wrapper.vm.redirectForBook.notCalled);
    });
});

describe('BookUpdate.vue', () => {
    describe('Before router enter', () => {
        let wrapper = null;
        let dispatch = null;

        beforeEach(() => {
            dispatch = sin.stub(store, 'dispatch');

            wrapper = shallowMount(BookUpdate, {
                mocks: {
                    $t: () => '',
                    $route: {
                        params: {
                            guid: 1
                        }
                    },
                    $store: {
                        getters: {
                            [BOOKS_AUTHORS_COUNT_GETTER]: [],
                            [BOOKS_TAGS_COUNT_GETTER]: [],
                            [BOOKS_GENRES_COUNT_GETTER]: [],
                        }
                    },
                }
            });
        })


        afterEach(() => {
            dispatch.restore();
        })

        it('should set book', async () => {
            const book = 'book';
            const bookGuid = 'bookGuid';

            dispatch.resolves(book);

            const next = sin.stub();

            await BookUpdate.beforeRouteEnter.call(wrapper.vm, {
                    params: {
                        guid: bookGuid
                    },
                },
                undefined,
                next
            );

            await wrapper.vm.$nextTick();

            assert.isTrue(store.dispatch.calledOnceWithExactly(BOOK_GET_FRESHEST_BOOK_BY_GUID_ACTION, bookGuid))
            assert.isTrue(next.calledOnce);
        })

        it('should show error', async () => {
            const bookGuid = 'bookGuid';

            dispatch.rejects();

            const next = sin.stub();

            await BookUpdate.beforeRouteEnter.call(wrapper.vm, {
                    params: {
                        guid: bookGuid
                    },
                },
                undefined,
                next
            );

            await wrapper.vm.$nextTick();

            assert.isTrue(store.dispatch.calledWithExactly(BOOK_GET_FRESHEST_BOOK_BY_GUID_ACTION, bookGuid));
            assert.isTrue(store.dispatch.calledWith(NOTIFICATION_DANGER_ACTION));
            assert.isTrue(next.notCalled);
        })
    });
})