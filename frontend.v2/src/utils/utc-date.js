import moment from 'moment'
export function getUtcDate() {
    return moment.utc(new Date()).format()
}