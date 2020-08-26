import u from 'ursus-utilus-collections';

function capitalString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default (line) => {
    if(Array.isArray(line)) {
        return u(line).select(item => capitalString(item)).toArray();
    } else {
        return capitalString(line);
    }
}