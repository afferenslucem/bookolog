export const NOTIFICATION_SUCCESS_TYPE = 'NOTIFICATION_SUCCESS_TYPE';
export const NOTIFICATION_DANGER_TYPE = 'NOTIFICATION_DANGER_TYPE';
export const NOTIFICATION_WARN_TYPE = 'NOTIFICATION_WARN_TYPE';
export const NOTIFICATION_INFO_TYPE = 'NOTIFICATION_INFO_TYPE';

export default {
    // message: string
    // type: string
    constructor(message, type) {
        this.message = message;
        this.type = type;
    }
}