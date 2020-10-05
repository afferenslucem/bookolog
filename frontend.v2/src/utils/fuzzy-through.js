// import Fuse from 'fuse.js'
import _ from 'declarray';

export function fuzzyThrough(array, term) {
    const fusedList = _(array);

    term = term.toLowerCase();

    const result = fusedList.where(item => item.toLowerCase().indexOf(term) != -1)
    .where(item => item.toLowerCase() !== term)
    .toArray();
    return result;
}