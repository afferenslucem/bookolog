import {BookSynchronizator} from '../../../../src/store/book/utils/synchronizator'
import { assert } from 'chai';
import _ from 'declarray';
import { 
    NETWORK_ERROR,
} from '../../../../src/store/naming';

describe('BookSynchronizator', () => {
    const local = [
        {
            guid: '1aaa-aaaaa-aaaaaaaaaa',
            modifyDate: new Date('2020-01-12 16:01')
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
    const origin = [
        {
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
            localCreated:   [ local[4]  ],
            localUpdated:   [ local[0]  ],
            localDeleted:   [ local[5]  ],
            originCreated:  [ origin[1] ],
            originUpdated:  [ origin[4] ],
            originDeleted:  [ local[3]  ],
            persist:        [ local[1]  ],
        })
    });

    it('actual computation from diff', () => {
        const diff = new BookSynchronizator().computeSyncData(_(local), _(origin));

        const actual = new BookSynchronizator().composeActual(diff);

        assert.deepEqual(actual,
            [
                local[4],
                local[0],
                origin[1],
                origin[4],
                local[1],
            ]);
    });
    
    describe('saveBook', () => {
        it('should trigger offline', async () => {
            let offline = false;
            let data = null;

            await new BookSynchronizator({
                saveBook: async (book) => new Promise(resolve => {
                    data = book;
                    resolve(book);
                })
            },{
                create: () => {
                    throw NETWORK_ERROR
                }
            }
            ).saveBook({}, () => {
                offline = true;
            }, () => {
                offline = false;
            })

            assert.equal(offline, true);
            assert.equal(data.shouldSync, true);
        })

        it('should trigger online', async () => {
            let offline = true;
            let data = null;

            await new BookSynchronizator({
                saveBook: (book) => data = book
            },{
                create: (book) => new Promise(resolve => resolve(book))
            }).saveBook({}, () => {
                offline = true;
            }, () => {
                offline = false;
            })

            assert.equal(offline, false);
            assert.equal(data.shouldSync, undefined);
        })
    });
    
    describe('updateBook', () => {
        it('should trigger offline', async () => {
            let offline = false;
            let data = null;

            await new BookSynchronizator({
                updateBook: (book) => data = book
            },{
                update: () => {
                    throw NETWORK_ERROR
                }
            }
            ).updateBook({}, () => {
                offline = true;
            }, () => {
                offline = false;
            })

            assert.equal(offline, true);
            assert.equal(data.modifyDate !== undefined, true);
        })

        it('should trigger online', async () => {
            let offline = true;
            let data = null;

            await new BookSynchronizator({
                updateBook: (book) => data = book
            },{
                update: (book) => new Promise(resolve => resolve(book))
            }).updateBook({}, () => {
                offline = true;
            }, () => {
                offline = false;
            })

            assert.equal(offline, false);
            assert.equal(data.shouldSync, undefined);
        })
    });
    
    describe('deleteBook', () => {
        it('should trigger offline', () => {
            let offline = false;

            new BookSynchronizator({
                deleteBook: (book) => book
            },{
                delete: () => {
                    throw NETWORK_ERROR
                }
            }
            ).deleteBook({}, () => {
                offline = true;
            }, () => {
                offline = false;
            })

            assert.equal(offline, true);
        })

        it('should trigger online', async () => {
            let offline = true;
            await new BookSynchronizator({
                deleteBook: (book) => book
            },{
                delete: (book) => new Promise(resolve => resolve(book))
            }).deleteBook({}, () => {
                offline = true;
            }, () => {
                offline = false;
            })

            assert.equal(offline, false);
        })
    });
    
    describe('loadBook', () => {
        it('should trigger offline', async () => {
            let offline = false;

            await new BookSynchronizator({
                updateBook: (book) => book
            },{
                getById: () => {
                    throw NETWORK_ERROR
                }
            }
            ).loadBook({}, () => {
                offline = true;
            }, () => {
                offline = false;
            })

            assert.equal(offline, true);
        })

        it('should trigger online', async () => {
            let offline = true;
            await new BookSynchronizator({
                updateBook: (book) => book
            },{
                getById: (book) => new Promise(resolve => resolve(book))
            }).loadBook({}, () => {
                offline = true;
            }, () => {
                offline = false;
            })

            assert.equal(offline, false);
        })
    });
});