import {
    BookSynchronizator
} from '../../../../src/store/book/utils/synchronizator'
import {
    assert
} from 'chai';
import _ from 'declarray';
import {
    NETWORK_ERROR,
} from '../../../../src/store/naming';

describe('BookSynchronizator', () => {
    const local = [{
            guid: '1aaa-aaaaa-aaaaaaaaaa',
            modifyDate: new Date('2020-01-12 16:01'),
            shouldSync: true,
        }, // updated local
        {
            guid: '12aa-aaaaa-aaaaaaaaaa',
            modifyDate: new Date('2020-01-12 12:01')
        }, // persist
        {
            guid: '127a-aaaaa-aaaaaaaaaa',
            modifyDate: new Date('2020-01-12 17:01')
        }, // updated origin
        {
            guid: '123a-aaaaa-aaaaaaaaaa',
            modifyDate: new Date('2020-01-12 12:01')
        }, // removed origin
        {
            guid: '1234-aaaaa-aaaaaaaaaa',
            modifyDate: new Date('2020-01-12 12:01'),
            shouldSync: true
        }, // new local
        {
            guid: '1234-5aaaa-aaaaaaaaaa',
            modifyDate: new Date('2020-01-12 12:01'),
            deleted: true
        }, // deleted local
    ]
    const origin = [{
            guid: '1aaa-aaaaa-aaaaaaaaaa',
            modifyDate: new Date('2020-01-12 13:01')
        }, // updated local
        {
            guid: '1234-567aa-aaaaaaaaaa',
            modifyDate: new Date('2020-01-12 13:01')
        }, // created origin
        {
            guid: '12aa-aaaaa-aaaaaaaaaa',
            modifyDate: new Date('2020-01-12 12:01')
        }, // persist
        // {
        //     guid: '123a-aaaaa-aaaaaaaaaa',
        //     modifyDate: '2020-01-12 12:01'
        // }, // removed origin
        // {
        //     guid: '1234-aaaaa-aaaaaaaaaa',
        //     modifyDate: '2020-01-12 12:01',
        //     shouldSync: true
        // }, // new local
        {
            guid: '1234-5aaaa-aaaaaaaaaa',
            modifyDate: new Date('2020-01-12 12:01'),
        }, // deleted local
        {
            guid: '127a-aaaaa-aaaaaaaaaa',
            modifyDate: new Date('2020-01-12 19:01')
        }, // updated origin
    ]

    it('diff computation', () => {
        const synched = new BookSynchronizator().computeSyncData(_(local), _(origin));

        assert.deepEqual(synched, {
            localUpdated: [local[0], local[4]],
            localDeleted: [local[5]],
        })
    });

    describe('saveBook', () => {
        it('should fill sync markers', async () => {
            let data = null;
            try {
                await new BookSynchronizator({
                    saveBook: async (book) => new Promise(resolve => {
                        data = book;
                        resolve(book);
                    })
                }, {
                    create: () => {
                        throw NETWORK_ERROR
                    }
                }).saveBook({})
                assert.fail();
            } catch (e) {
                if (e == NETWORK_ERROR) {
                    //
                } else {
                    assert.fail();
                }
            }

            assert.equal(data.shouldSync, true);
        })

        it('should not fill markers', async () => {
            let data = null;

            await new BookSynchronizator({
                saveBook: (book) => data = book
            }, {
                create: (book) => new Promise(resolve => resolve(book))
            }).saveBook({})

            assert.equal(data.shouldSync, undefined);
        })
    });

    describe('updateBook', () => {
        it('should fill markers', async () => {
            let data = null;

            try {
                await new BookSynchronizator({
                    updateBook: (book) => data = book
                }, {
                    update: () => {
                        throw NETWORK_ERROR
                    }
                }).updateBook({})

                assert.fail();
            } catch (e) {
                if (e == NETWORK_ERROR) {
                    //
                } else {
                    assert.fail();
                }
            }

            assert.equal(data.modifyDate !== undefined, true);
            assert.equal(data.shouldSync, true);
        })

        it('should not fill markers', async () => {
            let data = null;

            await new BookSynchronizator({
                updateBook: (book) => data = book
            }, {
                update: (book) => new Promise(resolve => resolve(book))
            }).updateBook({})

            assert.equal(data.shouldSync, undefined);
        })
    });

    describe('deleteBook', () => {
        it('should throw error', async () => {
            try {
                await new BookSynchronizator({
                    deleteBook: (book) => book
                }, {
                    delete: () => {
                        throw NETWORK_ERROR
                    }
                }).deleteBook({})

                assert.fail();
            } catch (e) {
                if (e == NETWORK_ERROR) {
                    //
                } else {
                    assert.fail();
                }
            }
        })

        it('should not throw error', async () => {
            await new BookSynchronizator({
                deleteBook: (book) => book
            }, {
                delete: (book) => new Promise(resolve => resolve(book))
            }).deleteBook({}, undefined)
        })
    });

    describe('loadBook', () => {
        it('should throw error', async () => {
            try {
                await new BookSynchronizator({
                    updateBook: (book) => book
                }, {
                    getById: () => {
                        throw NETWORK_ERROR
                    }
                }).loadBook({})

                assert.fail();
            } catch (e) {
                if (e == NETWORK_ERROR) {
                    //
                } else {
                    assert.fail();
                }
            }
        })

        it('should not throw error', async () => {
            await new BookSynchronizator({
                updateBook: (book) => book
            }, {
                getById: (book) => new Promise(resolve => resolve(book))
            }).loadBook({});
        })
    });
});