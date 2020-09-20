import Axios from "axios";
import {getLogger} from '../logger';

export const NETWORK_ERROR = 'Error: Network Error';
export const FORBIDDEN_ERROR = 'Error: Request failed with status code 403';

export class Client {
    #backendAddress = '';

    constructor(backendAddress) {
        this.logger = getLogger('Client');
        this.#backendAddress = backendAddress;
    }

    getAddress(endpoint) {
        return this.#backendAddress + endpoint;
    }

    get(url, options) {
        return this.sendRequest(() => {
            try {
                this.logger.debug('get to', url);
                return Axios.get(this.getAddress(url), options);
            } catch (e) {
                this.logger.fatal(e);
                throw e;
            }
        })
    }

    post(url, data, options) {
        return this.sendRequest(() => {
            try {
                this.logger.debug('post to', data, this.getAddress(url));
                return Axios.post(this.getAddress(url), data, options);
            } catch (e) {
                this.logger.fatal(e);
                throw e;
            }
        });
    }

    put(url, data, options) {
        return this.sendRequest(() => {
            try {
                this.logger.debug('put to', data, url);
                return Axios.put(this.getAddress(url), data, options);
            } catch (e) {
                this.logger.fatal(e);
                throw e;
            }
        });
    }

    delete(url, data, options) {
        return this.sendRequest(() => {
            try {
                this.logger.debug('delete to', data, url);
                return Axios.delete(this.getAddress(url), data, options);
            } catch (e) {
                this.logger.fatal(e);
                throw e;
            }
        });
    }

    async sendRequest(routine) {
        try {
            const result = await routine();
            await this.onSuccess();

            return result;
        } catch (e) {
            if(e == NETWORK_ERROR) {
                await this.onNetworkError();
            } else if(e == FORBIDDEN_ERROR) {
                await this.onForbiddenError()
            }

            throw e;
        }
    }
}