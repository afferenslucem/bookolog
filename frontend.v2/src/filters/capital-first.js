import _ from 'declarray';

function capitalString(str) {
    if(!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default (line) => {
    if(Array.isArray(line)) {
        return _(line).select(item => capitalString(item)).toArray();
    } else {
        return capitalString(line);
    }
}