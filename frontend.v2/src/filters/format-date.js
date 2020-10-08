import moment from 'moment';

export default (date, $default) => {
    if (date == null || date == '') {
        return $default || '';
    }

    date = new Date(date);

    if (date == 'Invalid Date') {
        return $default || '';
    }

    return moment(date).format('L')
}