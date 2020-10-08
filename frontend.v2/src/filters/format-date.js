import moment from 'moment';

export default (date, $default) => {
    if (date == null || date == '') {
        return $default || '';
    }
    
    return moment(date).format('L')
}