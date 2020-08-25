import Axios from "axios";
import {getLogger} from '../logger';

export class Client {
    constructor() {
        this.logger = getLogger('Client');
    }

    get(url) {
        try {
            this.logger.debug('get to', url);
            return Axios.get(url);
        } catch (e) {
            this.logger.fatal(e);
            throw e;
        }
    }
}