import {
    actions
} from '@/store/book/actions'
import {
    NETWORK_ERROR
} from '@/http/client'
import {
    BOOKS_SYNC_ACTION,
    BOOKS_SAVE_MUTATION,
    BOOKS_LOAD_ACTION,
    BOOK_ADD_ACTION,
    BOOK_ADD_MUTATION,
    BOOK_UPDATE_ACTION,
    BOOK_UPDATE_MUTATION,
    BOOK_GET_AND_REFRESH_BY_GUID_ACTION,
    BOOK_GET_FRESHEST_BOOK_BY_GUID_ACTION,
    BOOK_DELETE_ACTION,
    BOOK_DELETE_MUTATION,
    BOOKS_CLEAR_ACTION,
    BOOKS_CLEAR_MUTATION,
} from '@/store/naming'
import {
    assert
} from 'chai';
import sin from 'sinon'

describe('Book Actions', () => {
    describe('BOOKS_SYNC_ACTION', () => {
        it('should save synced', async () => {
            const commit = sin.stub();

            const books = ['successfully', 'loaded', 'books'];

            const dispatch = sin.stub().resolves(books);

            await actions[BOOKS_SYNC_ACTION]({
                commit,
                dispatch
            });

            assert.isTrue(dispatch.calledOnceWithExactly('getSyncedBooks'));
            assert.isTrue(commit.calledOnceWithExactly(BOOKS_SAVE_MUTATION, books));
        })

        it('should return local for error', async () => {
            const commit = sin.stub();

            const books = ['local', 'books'];

            const dispatch = sin.stub((arg) => {
                if (arg == 'getSyncedBooks') {
                    return Promise.reject(NETWORK_ERROR);
                } else {
                    return Promise.resolve(books);
                }
            });

            try {
                await actions[BOOKS_SYNC_ACTION]({
                    commit,
                    dispatch,
                })

                assert.fail();
            } catch (e) {
                if (e == NETWORK_ERROR) {
                    //
                } else {
                    assert.fail();
                }
            }

            assert.isTrue(commit.calledOnceWithExactly(BOOKS_SAVE_MUTATION, books));
        })
    });

    describe('BOOKS_LOAD_ACTION', () => {
        it('should save loaded', async () => {
            const commit = sin.stub();
            const books = ['successfully', 'loaded', 'books'];

            const dispatch = sin.stub().resolves(books);

            const rootState = {
                user: {
                    id: 1,
                }
            }

            await actions[BOOKS_LOAD_ACTION]({
                commit,
                dispatch,
                rootState,
            });

            assert.deepEqual(dispatch.args, [
                ['loadAllRemoteBooks', rootState.user.id],
                ['clearLocalBooks'],
                ['saveManyBooks', books]
            ]);
            assert.isTrue(commit.calledOnceWithExactly(BOOKS_SAVE_MUTATION, books));
        })

        it('should throw error', async () => {
            const commit = sin.stub();
            const dispatch = sin.stub().rejects(NETWORK_ERROR);
            const rootState = {
                user: {
                    id: 1,
                }
            }

            try {
                await actions[BOOKS_LOAD_ACTION]({
                    commit,
                    dispatch,
                    rootState,
                });
                assert.fail()
            } catch (e) {
                if (e == NETWORK_ERROR) {
                    //
                } else {
                    assert.fail();
                }
            }

            assert.isTrue(dispatch.calledOnceWithExactly('loadAllRemoteBooks', rootState.user.id));
            assert.isTrue(commit.notCalled);
        })
    });

    describe('BOOK_ADD_ACTION', () => {
        it('should save book', async () => {
            const book = {
                name: 'name'
            };

            const commit = sin.stub();
            const dispatch = sin.stub().resolves(book);

            await actions[BOOK_ADD_ACTION]({
                commit,
                dispatch,
            }, book);

            assert.isTrue(dispatch.calledOnceWithExactly('saveBook', sin.match(book)));
            assert.isTrue(commit.calledOnceWithExactly(BOOK_ADD_MUTATION, sin.match(book)));
        });

        it('should throw error but save', async () => {
            const commit = sin.stub();
            const dispatch = sin.stub().rejects(NETWORK_ERROR);

            const book = {
                name: 'name'
            };

            try {
                await actions[BOOK_ADD_ACTION]({
                    commit,
                    dispatch,
                }, book);

                assert.fail()
            } catch (e) {
                if (e == NETWORK_ERROR) {
                    //
                } else {
                    assert.fail();
                }
            }

            assert.isTrue(dispatch.calledOnceWithExactly('saveBook', sin.match(book)));
            assert.isTrue(commit.calledOnceWithExactly(BOOK_ADD_MUTATION, sin.match(book)));
        })
    });

    describe('BOOK_UPDATE_ACTION', () => {
        it('should update book', async () => {
            const book = {
                name: 'name'
            };

            const commit = sin.stub();
            const dispatch = sin.stub().resolves(book);

            await actions[BOOK_UPDATE_ACTION]({
                commit,
                dispatch,
            }, book);

            assert.isTrue(dispatch.calledOnceWithExactly('updateBook', sin.match(book)));
            assert.isTrue(commit.calledOnceWithExactly(BOOK_UPDATE_MUTATION, sin.match(book)));
        });

        it('should throw error but update', async () => {
            const commit = sin.stub();
            const dispatch = sin.stub().rejects(NETWORK_ERROR);

            const book = {
                name: 'name'
            };

            try {
                await actions[BOOK_UPDATE_ACTION]({
                    commit,
                    dispatch,
                }, book);

                assert.fail()
            } catch (e) {
                if (e == NETWORK_ERROR) {
                    //
                } else {
                    assert.fail();
                }
            }

            assert.isTrue(dispatch.calledOnceWithExactly('updateBook', sin.match(book)));
            assert.isTrue(commit.calledOnceWithExactly(BOOK_UPDATE_MUTATION, sin.match(book)));
        })
    });

    describe('BOOK_GET_AND_REFRESH_BY_GUID_ACTION', () => {
        it('should load and trigger update book', async () => {
            const book = {
                guid: 'guid',
                name: 'name'
            };

            const commit = sin.stub();
            const dispatch = sin.stub().resolves(book);
            const state = {
                'guid': book,
            };

            const result = await actions[BOOK_GET_AND_REFRESH_BY_GUID_ACTION]({
                state,
                commit,
                dispatch,
            }, book.guid);

            assert.isTrue(dispatch.calledOnceWithExactly('loadBook', book.guid));
            assert.isTrue(commit.calledOnceWithExactly(BOOK_UPDATE_MUTATION, sin.match(book)));
            assert.deepEqual(result, book);
        });

        it('should throw error', async () => {
            const book = {
                guid: 'guid',
                name: 'name'
            };

            const commit = sin.stub();
            const dispatch = sin.stub().rejects(NETWORK_ERROR);
            const state = {
                'guid': book,
            };

            try {
                await actions[BOOK_GET_AND_REFRESH_BY_GUID_ACTION]({
                    state,
                    commit,
                    dispatch,
                }, 'guid');

                assert.fail()
            } catch (e) {
                if (e == NETWORK_ERROR) {
                    //
                } else {
                    assert.fail();
                }
            }

            assert.isTrue(dispatch.calledOnceWithExactly('loadBook', 'guid'));
            assert.isTrue(commit.notCalled);
        })
    });

    describe('BOOK_DELETE_ACTION', () => {
        it('should delete book', async () => {
            const book = {
                guid: 'guid',
                name: 'name'
            };

            const commit = sin.stub();
            const dispatch = sin.stub().resolves();
            const state = {
                'guid': book,
            };

            await actions[BOOK_DELETE_ACTION]({
                state,
                commit,
                dispatch,
            }, book.guid);

            assert.isTrue(dispatch.calledOnceWithExactly('deleteBook', book.guid));
            assert.isTrue(commit.calledOnceWithExactly(BOOK_DELETE_MUTATION, book.guid));
        });

        it('should update book on network error', async () => {
            const book = {
                guid: 'guid',
                name: 'name',
            };

            const commit = sin.stub();

            const dispatch = sin.stub();

            dispatch.onCall(0).rejects(NETWORK_ERROR);
            dispatch.onCall(1).resolves();

            const state = {
                'guid': book,
            };

            try {
                await actions[BOOK_DELETE_ACTION]({
                    state,
                    commit,
                    dispatch,
                }, book.guid);

                assert.fail()
            } catch (e) {
                if (e == NETWORK_ERROR) {
                    //
                } else {
                    assert.fail();
                }
            }

            assert.deepEqual(dispatch.args, [
                ['deleteBook', book.guid],
                ['updateLocalBook', {
                    guid: 'guid',
                    name: 'name',
                    deleted: true,
                }]
            ]);
            assert.equal(dispatch.callCount, 2);
            assert.isTrue(commit.calledOnceWithExactly(BOOK_UPDATE_MUTATION, sin.match({
                guid: 'guid',
                name: 'name',
                deleted: true,
            })));
        })
    });

    describe('BOOKS_CLEAR_ACTION', () => {
        it('should delete books', async () => {
            const commit = sin.stub();
            const dispatch = sin.stub().resolves();

            await actions[BOOKS_CLEAR_ACTION]({
                commit,
                dispatch,
            });

            assert.isTrue(dispatch.calledOnceWithExactly('clearLocalBooks'));
            assert.isTrue(commit.calledOnceWithExactly(BOOKS_CLEAR_MUTATION));
        });
    });

    describe('BOOK_GET_FRESHEST_BOOK_BY_GUID_ACTION', () => {
        it('should return remote', async () => {
            const remoteBook = 'remoteBook';
            const localBook = 'localBook';

            const dispatch = sin.stub().resolves(remoteBook);

            const guid = 'guid'

            const state = {
                [guid]: localBook,
            }

            const result = await actions[BOOK_GET_FRESHEST_BOOK_BY_GUID_ACTION]({
                dispatch,
                state,
            }, guid);

            assert.isTrue(dispatch.calledOnceWithExactly(BOOK_GET_AND_REFRESH_BY_GUID_ACTION, guid));
            assert.equal(remoteBook, result)
        });

        it('should return local for error', async () => {
            const localBook = 'localBook';

            const dispatch = sin.stub().rejects(NETWORK_ERROR);

            const guid = 'guid'

            const state = {
                [guid]: localBook,
            }

            const result = await actions[BOOK_GET_FRESHEST_BOOK_BY_GUID_ACTION]({
                dispatch,
                state,
            }, guid);

            assert.isTrue(dispatch.calledOnceWithExactly(BOOK_GET_AND_REFRESH_BY_GUID_ACTION, guid));
            assert.equal(localBook, result)
        });

        it('should throw error', async () => {
            const localBook = 'localBook';

            const dispatch = sin.stub().rejects();

            const guid = 'guid'

            const state = {
                [guid]: localBook,
            }

            try {
                await actions[BOOK_GET_FRESHEST_BOOK_BY_GUID_ACTION]({
                    dispatch,
                    state,
                }, guid);

                assert.fail();
            } catch (e) {
                //
            }

            assert.isTrue(dispatch.calledOnceWithExactly(BOOK_GET_AND_REFRESH_BY_GUID_ACTION, guid));
        });
    });
})