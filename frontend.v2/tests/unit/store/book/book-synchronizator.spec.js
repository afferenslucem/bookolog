import {BookSynchronizator} from '../../../../src/store/book/utils/synchronizator'
import { assert } from 'chai';
import _ from 'declarray'

describe('BookSynchronizator', () => {
    const local = [
        {
            guid: '1aaa-aaaaa-aaaaaaaaaa',
            modifyDate: '2020-01-12 16:01'
        }, // updated local
        {
            guid: '12aa-aaaaa-aaaaaaaaaa',
            modifyDate: '2020-01-12 12:01'
        }, // persist
        {
            guid: '127a-aaaaa-aaaaaaaaaa',
            modifyDate: '2020-01-12 17:01'
        }, // updated origin
        {
            guid: '123a-aaaaa-aaaaaaaaaa',
            modifyDate: '2020-01-12 12:01'
        }, // removed origin
        {
            guid: '1234-aaaaa-aaaaaaaaaa',
            modifyDate: '2020-01-12 12:01',
            shouldSync: true
        }, // new local
        {
            guid: '1234-5aaaa-aaaaaaaaaa',
            modifyDate: '2020-01-12 12:01',
            deleted: true
        }, // deleted local
    ]
    const origin = [
        {
            guid: '1aaa-aaaaa-aaaaaaaaaa',
            modifyDate: '2020-01-12 13:01'
        }, // updated local
        {
            guid: '1234-567aa-aaaaaaaaaa',
            modifyDate: '2020-01-12 13:01'
        }, // created origin
        {
            guid: '12aa-aaaaa-aaaaaaaaaa',
            modifyDate: '2020-01-12 12:01'
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
            modifyDate: '2020-01-12 12:01',
        }, // deleted local
        {
            guid: '127a-aaaaa-aaaaaaaaaa',
            modifyDate: '2020-01-12 19:01'
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
});