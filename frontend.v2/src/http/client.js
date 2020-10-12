import Axios from "axios";
import {
    getLogger
} from '../logger';
import { UUIDGenerator } from "essents";

export const NETWORK_ERROR = 'Error: Network Error';
export const UNAUTHORIZED_ERROR = 'Error: Unauthorized';
export const FORBIDDEN_ERROR = 'Error: Request failed with status code 403';

export class Client {
    #backendAddress = '';
    #sender = null;

    #baseOptions = {}

    constructor(backendAddress, sender) {
        this.logger = getLogger({
            namespace: 'Http',
            loggerName: 'Client'
          });
        this.#backendAddress = backendAddress;
        this.#sender = sender || Axios;

        this.#baseOptions = {
            withCredentials: true,
            timeout: this.timeout,
        };
    }

    getAddress(endpoint) {
        return this.#backendAddress + endpoint;
    }

    get(url, options) {
        options = this.mergeOptions(options);

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
        options = this.mergeOptions(options);

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
        options = this.mergeOptions(options);

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
        options = this.mergeOptions(options);

        return this.sendRequest(() => {
            try {
                return this.#sender.delete(this.getAddress(url), options);
            } catch (e) {
                this.logger.fatal(e);
                throw e;
            }
        });
    }

    mergeOptions(options = {}) {
        const temp = Object.assign({}, options);
        return Object.assign(temp, this.#baseOptions);
    }

    async sendRequest(routine) {
        const requestGuid = new UUIDGenerator().generate();

        this.requestStarted(requestGuid);
        try {
            const result = await this.runRequestRoutine(routine);

            await this.onSuccess(requestGuid);

            return result;
        } finally {
            this.requestCanceled(requestGuid);
        }
    }

    async runRequestRoutine(routine, retry) {
        try {
            const result = await routine();
            return result;
        } catch (e) {
            if(e == NETWORK_ERROR) {
                if (retry === undefined) {
                    return this.runRequestRoutine(routine, this.retry);
                } else if (retry > 1) {
                    return this.runRequestRoutine(routine, retry - 1)
                } else {
                    await this.catchError(e);
                    throw e;
                }
            }
            else {
                await this.catchError(e);
                throw e;
            }
        }
    }

    async catchError(e) {
        if (this.isNetworkError(e) || this.isTimeoutError(e)) {
            await this.onNetworkError();
            throw NETWORK_ERROR;
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

    isTimeoutError(e) {
        return (e.code === 'ECONNABORTED');
    }
}
Client.prototype.onSuccess = () => {};
Client.prototype.onNetworkError = () => {};
Client.prototype.onUnauthorizedError = () => {};
Client.prototype.requestCanceled = () => {};
Client.prototype.requestStarted = () => {};
Client.prototype.retry = 0;
Client.prototype.timeout = 30000;