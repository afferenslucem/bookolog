import Axios from "axios";
import {getLogger} from '../logger';

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
        try {
            this.logger.debug('get to', url);
            return Axios.get(this.getAddress(url), options);
        } catch (e) {
            this.logger.fatal(e);
            throw e;
        }
    }

    post(url, data, options) {
        try {
            this.logger.debug('post to', data, url);
            return Axios.post(this.getAddress(url), data, options);
        } catch (e) {
            this.logger.fatal(e);
            throw e;
        }
    }

    put(url, data, options) {
        try {
            this.logger.debug('post to', data, url);
            return Axios.put(this.getAddress(url), data, options);
        } catch (e) {
            this.logger.fatal(e);
            throw e;
        }
    }

    delete(url, data, options) {
        try {
            this.logger.debug('delete to', data, url);
            return Axios.delete(this.getAddress(url), data, options);
        } catch (e) {
            this.logger.fatal(e);
            throw e;
        }
    }
}