import {
    USER_LOGIN_ACTION,
    CONNECTION_OFFLINE_ACTION,
    NOTIFICATION_DANGER_ACTION,
    NOTIFICATION_WARNING_ACTION,
    USER_SYNC_DATA_ACTION,
    BOOKS_LOAD_LOCAL_ACTION,
    USER_SAVE_ACTION,
    BOOKS_LOAD_ACTION,
    USER_SYNC_BOOKS_ACTION,
    USER_RECOVER_ACTION,
} from '../../../../src/store/naming';
import {
    NETWORK_ERROR
} from '@/http/client'
import {
    assert,
    expect
} from 'chai';
import sin from 'sinon';
import {
    actions
} from '@/store/user/actions'

describe('User Actions', () => {
    describe('USER_LOGIN_ACTION', () => {
        it('should turn offline for NETWORK_ERROR', async () => {
            const dispatch = sin.stub();

            dispatch.onCall(0).rejects(NETWORK_ERROR);
            dispatch.onCall(1).resolves();

            const loginPayload = {
                username: 'username',
                password: 'password',
            };

            try {
                await actions[USER_LOGIN_ACTION]({
                    dispatch,
                }, loginPayload);

                assert.fail()
            } catch (e) {
                if (e == NETWORK_ERROR) {
                    //
                } else {
                    assert.fail();
                }
            }

            assert.equal(dispatch.callCount, 2);

            assert.isTrue(dispatch.calledWithExactly('sendLogin', loginPayload));
            assert.isTrue(dispatch.calledWithExactly(CONNECTION_OFFLINE_ACTION));
        })

        it('should trigger login error', async () => {
            const dispatch = sin.stub();

            dispatch.onCall(0).resolves();

            const loginPayload = {
                username: 'username',
                password: 'password',
            };

            await actions[USER_LOGIN_ACTION]({
                dispatch,
            }, loginPayload);
            assert.equal(dispatch.callCount, 2);

            assert.isTrue(dispatch.calledWithExactly('sendLogin', loginPayload));
            assert.isTrue(dispatch.calledWith(NOTIFICATION_DANGER_ACTION));
        })

        it('should login', async () => {
            const dispatch = sin.stub();

            const user = 'user';

            dispatch.onCall(0).resolves(user);
            dispatch.onCall(1).returns(0);
            dispatch.onCall(2).resolves();

            const loginPayload = {
                username: 'username',
                password: 'password',
            };

            const result = await actions[USER_LOGIN_ACTION]({
                dispatch,
            }, loginPayload);

            assert.equal(dispatch.callCount, 3);

            assert.equal(result, user);

            assert.isTrue(dispatch.calledWithExactly('sendLogin', loginPayload));
            assert.isTrue(dispatch.calledWithExactly(USER_SAVE_ACTION, user));
            assert.isTrue(dispatch.calledWithExactly(BOOKS_LOAD_ACTION));
        })
    });

    describe('USER_RECOVER_ACTION', async () => {
        it('should return user', async () => {
            const user = 'user';

            const dispatch = sin.stub().returns(user);

            const result = await actions[USER_RECOVER_ACTION]({
                dispatch
            });

            assert.isTrue(dispatch.calledOnceWithExactly('getLocalStoredUser'));
            assert.equal(result, user);
        })

        it('should return null for error', async () => {
            const dispatch = sin.stub().throws('error');

            const result = await actions[USER_RECOVER_ACTION]({
                dispatch
            });

            assert.isTrue(dispatch.calledOnceWithExactly('getLocalStoredUser'));
            assert.equal(result, null);
        })
    })

    describe('USER_SYNC_DATA_ACTION', async () => {
        it('should use cached data for NETWORK_ERROR', async () => {
            const localUser = {};

            const dispatch = sin.stub();
            dispatch.onCall(0).rejects(NETWORK_ERROR);
            dispatch.onCall(1).resolves(localUser);

            try {
                await actions[USER_SYNC_DATA_ACTION]({
                    dispatch
                });
                assert.fail()
            } catch (e) {
                if (e == NETWORK_ERROR) {
                    //
                } else {
                    assert.fail();
                }
            }

            assert.equal(dispatch.callCount, 5);

            assert.isTrue(dispatch.calledWithExactly('getRemoteUser'))
            assert.isTrue(dispatch.calledWithExactly('getLocalStoredUser'))
            assert.isTrue(dispatch.calledWithExactly(BOOKS_LOAD_LOCAL_ACTION))
            assert.isTrue(dispatch.calledWithExactly(USER_SAVE_ACTION, localUser))
            assert.isTrue(dispatch.calledWith(NOTIFICATION_WARNING_ACTION))
        });

        it('should use remote data', async () => {
            const remoteUser = {};

            const dispatch = sin.stub();
            dispatch.onCall(0).resolves(remoteUser);

            await actions[USER_SYNC_DATA_ACTION]({
                dispatch
            });

            assert.equal(dispatch.callCount, 3);
            expect(remoteUser.lastSyncTime).not.equal(undefined);

            assert.isTrue(dispatch.calledWithExactly('getRemoteUser'))
            assert.isTrue(dispatch.calledWithExactly(USER_SYNC_BOOKS_ACTION, remoteUser))
            assert.isTrue(dispatch.calledWithExactly(USER_SAVE_ACTION, remoteUser))
        });
    })
})
