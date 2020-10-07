import {
    Client,
    NETWORK_ERROR,
    UNAUTHORIZED_ERROR,
} from '@/http/client'
import {
    expect, assert
} from 'chai';
import sin from 'sinon';
import {
    Promise
} from 'core-js';

describe('Base Client', () => {
    afterEach(() => {
        Client.prototype.onSuccess = () => {};
        Client.prototype.onNetworkError = () => {};
        Client.prototype.onUnauthorizedError = () => {};
        Client.prototype.requestCanceled = () => {};
        Client.prototype.requestStarted = () => {};
        Client.prototype.retry = 0;
    })

    it('should use get', async () => {
        const get = sin.stub().returns(Promise.resolve());

        const client = new Client('host/', {
            get
        });

        await client.get('url', {});

        const args = get.args[0]

        expect(get.callCount).to.equal(1);
        expect(args).deep.equal(args, ['host/url', {}])
    })

    it('should use post', async () => {
        const post = sin.stub().returns(Promise.resolve());

        const client = new Client('host/', {
            post
        });

        await client.post('url', {
            'first': 1
        }, {});

        const args = post.args[0]

        expect(post.callCount).to.equal(1);
        expect(args).deep.equal(args, ['host/url', {
            'first': 1
        }, {}])
    })

    it('should use put', async () => {
        const put = sin.stub().returns(Promise.resolve());

        const client = new Client('host/', {
            put
        });

        await client.put('url', {
            'first': 1
        }, {});

        const args = put.args[0]

        expect(put.callCount).to.equal(1);
        expect(args).deep.equal(args, ['host/url', {
            'first': 1
        }, {}])
    })

    it('should use delete', async () => {
        const $delete = sin.stub().returns(Promise.resolve());

        const client = new Client('host/', {
            delete: $delete
        });

        await client.delete('url', {});

        const args = $delete.args[0]

        expect($delete.callCount).to.equal(1);
        expect(args).deep.equal(args, ['host/url', {}])
    })

    describe('sendRequest', () => {
        let client = null;
        
        let $delete = sin.stub().returns(Promise.resolve());

        afterEach(() => {
            Client.prototype.onSuccess = () => {};
            Client.prototype.onNetworkError = () => {};
            Client.prototype.onUnauthorizedError = () => {};
            Client.prototype.requestCanceled = () => {};
            Client.prototype.requestStarted = () => {};
            Client.prototype.retry = 0;
        })

        beforeEach(() => {
            $delete = sin.stub().returns(Promise.resolve());

            client = new Client('host/', {
                delete: $delete
            });
        });

        it('should run 3 times for NETWORK_ERROR exceptions', async () => {
            Client.prototype.retry = 2;
    
            try {
                await client.sendRequest(async () => {
                    await $delete();
                    throw NETWORK_ERROR;
                });
            } catch (e) {
                //
            }
    
            expect($delete.callCount).to.equal(3);
        })

        it('should run 1 times for unexpected exceptions', async () => {
            Client.prototype.retry = 2;
    
            try {
                await client.sendRequest(async () => {
                    await $delete();
                    throw 'exeption';
                });
            } catch (e) {
                //
            }
    
            expect($delete.callCount).to.equal(1);
        })

        it('should use unauthorithed callback', async () => {
            Client.prototype.onUnauthorizedError = sin.stub().returns(Promise.resolve());
            Client.prototype.requestStarted = sin.stub().returns(Promise.resolve());
            Client.prototype.requestCanceled = sin.stub().returns(Promise.resolve());
    
            try {
                await client.sendRequest(async () => {
                    throw {
                        response: {
                            data: '',
                            status: 401
                        }
                    }
                });
            } catch (e) {
                if(e === UNAUTHORIZED_ERROR) {
                    //
                } else {
                    assert.fail();
                }
            }
    
            expect(Client.prototype.onUnauthorizedError.callCount).to.equal(1);
            expect(Client.prototype.requestStarted.callCount).to.equal(1);
            expect(Client.prototype.requestCanceled.callCount).to.equal(1);
        })

        it('should use network error callback', async () => {
            Client.prototype.onNetworkError = sin.stub().returns(Promise.resolve());
            Client.prototype.requestStarted = sin.stub().returns(Promise.resolve());
            Client.prototype.requestCanceled = sin.stub().returns(Promise.resolve());
    
            try {
                await client.sendRequest(async () => {
                    throw NETWORK_ERROR;
                });
            } catch (e) {
                if(e === NETWORK_ERROR) {
                    //
                } else {
                    assert.fail();
                }
            }
    
            expect(Client.prototype.onNetworkError.callCount).to.equal(1);
            expect(Client.prototype.requestStarted.callCount).to.equal(1);
            expect(Client.prototype.requestCanceled.callCount).to.equal(1);
        })

        it('should use success callback', async () => {
            Client.prototype.onSuccess = sin.stub().returns(Promise.resolve());
            Client.prototype.requestStarted = sin.stub().returns(Promise.resolve());
            Client.prototype.requestCanceled = sin.stub().returns(Promise.resolve());
    
            await client.sendRequest(() => Promise.resolve());
    
            expect(Client.prototype.onSuccess.callCount).to.equal(1);
            expect(Client.prototype.requestStarted.callCount).to.equal(1);
            expect(Client.prototype.requestCanceled.callCount).to.equal(1);
        })
    })
});