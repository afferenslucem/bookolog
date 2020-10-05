import Axios from "axios";
import {
    getLogger
} from '../logger';

export const NETWORK_ERROR = 'Error: Network Error';
export const UNAUTHORIZED_ERROR = 'Error: Unauthorized';
export const FORBIDDEN_ERROR = 'Error: Request failed with status code 403';

export class Client {
    #backendAddress = '';
    #sender = null;

    constructor(backendAddress, sender) {
        this.logger = getLogger('Client');
        this.#backendAddress = backendAddress;
        this.#sender = sender || Axios;
    }

    getAddress(endpoint) {
        return this.#backendAddress + endpoint;
    }

    get(url, options) {
        return this.sendRequest(() => {
            try {
                return this.#sender.get(this.getAddress(url), options);
            } catch (e) {
                this.logger.fatal(e);
                throw e;
            }
        })
    }

    post(url, data, options) {
        return this.sendRequest(() => {
            try {
                return this.#sender.post(this.getAddress(url), data, options);
            } catch (e) {
                this.logger.fatal(e);
                throw e;
            }
        });
    }

    put(url, data, options) {
        return this.sendRequest(() => {
            try {
                return this.#sender.put(this.getAddress(url), data, options);
            } catch (e) {
                this.logger.fatal(e);
                throw e;
            }
        });
    }

    delete(url, options) {
        return this.sendRequest(() => {
            try {
                return this.#sender.delete(this.getAddress(url), options);
            } catch (e) {
                this.logger.fatal(e);
                throw e;
            }
        });
    }

    async sendRequest(routine) {
        await this.requestStarted();
        try {
            const result = await this.runRequestRoutine(routine);

            await this.onSuccess();

            return result;
        } finally {
            await this.requestCanceled();
        }
    }

    async runRequestRoutine(routine, retry) {
        try {
            const result = await routine();
            return result;
        } catch (e) {
            if (retry === undefined) {
                return this.runRequestRoutine(routine, this.retry);
            } else if (retry > 1) {
                return this.runRequestRoutine(routine, retry - 1)
            } else {
                await this.catchError(e);
                throw e;
            }
        }
    }

    async catchError(e) {
        if (this.isNetworkError(e)) {
            await this.onNetworkError();
        } else if (this.isUnauthorizedError(e)) {
            await this.onUnauthorizedError();
            throw UNAUTHORIZED_ERROR;
        }
    }

    isNetworkError(e) {
        return e == NETWORK_ERROR;
    }

    isUnauthorizedError(e) {
        return (e.response?.data === '') && (e.response.status === 401);
    }
}
Client.prototype.onSuccess = () => {};
Client.prototype.onNetworkError = () => {};
Client.prototype.onUnauthorizedError = () => {};
Client.prototype.requestCanceled = () => {};
Client.prototype.requestStarted = () => {};
Client.prototype.retry = 0;