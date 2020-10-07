import {
    assert
} from 'chai'
import {
    shallowMount
} from '@vue/test-utils'
import Book from '@/views/books/entity/Book.vue';
import {
    BOOK_DELETE_ACTION,
    BOOK_GET_FRESHEST_BOOK_BY_GUID_ACTION,
    NOTIFICATION_DANGER_ACTION,
} from "@/store/naming";
import sin from 'sinon';
import {
    NETWORK_ERROR
} from '../../../../src/store/naming';
import store from '@/store';

describe('Book.vue', () => {

    describe('Notifications', () => {
        let dispatch = null;
        let wrapper = null;

        beforeEach(() => {
            dispatch = sin.stub();

            wrapper = shallowMount(Book, {
                mocks: {
                    $t: () => '',
                    $route: {
                        params: {
                            guid: 1
                        }
                    },
                    $store: {
                        dispatch,
                    },
                }
            });

            wrapper.vm.goBack = sin.stub();
            wrapper.vm.showDeleteOfflineNotification = sin.stub();
            wrapper.vm.showDeleteSuccessNotification = sin.stub();
            wrapper.vm.showDeleteFailNotification = sin.stub();
        })

        it('Should show offline notification', async () => {
            dispatch.onCall(0).rejects(NETWORK_ERROR);

            await wrapper.vm.deleteBook();

            assert.isTrue(dispatch.calledWith(BOOK_DELETE_ACTION))
            assert.isTrue(wrapper.vm.goBack.calledOnce)
            assert.isTrue(wrapper.vm.showDeleteOfflineNotification.calledOnce);
        });

        it('Should show error notification', async () => {
            dispatch.onCall(0).rejects();

            await wrapper.vm.deleteBook();

            assert.isTrue(dispatch.calledWith(BOOK_DELETE_ACTION))
            assert.isTrue(wrapper.vm.showDeleteFailNotification.calledOnce);
        });

        it('Should show suceess notification', async () => {
            dispatch.onCall(0).resolves();

            await wrapper.vm.deleteBook();

            assert.isTrue(dispatch.calledWith(BOOK_DELETE_ACTION))
            assert.isTrue(wrapper.vm.goBack.calledOnce)
            assert.isTrue(wrapper.vm.showDeleteSuccessNotification.calledOnce);
        });
    });

    describe('Before router enter', () => {
        let wrapper = null;
        let dispatch = null;


        beforeEach(() => {
            dispatch = sin.stub(store, 'dispatch');

            wrapper = shallowMount(Book, {
                mocks: {
                    $t: () => '',
                    $route: {
                        params: {
                            guid: 1
                        }
                    },
                    $store: {},
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

            await Book.beforeRouteEnter.call(wrapper.vm, {
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

            await Book.beforeRouteEnter.call(wrapper.vm, {
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
});