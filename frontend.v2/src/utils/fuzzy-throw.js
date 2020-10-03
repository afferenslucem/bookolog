import Fuse from 'fuse.js'

export function fuzzyThrough(array, term) {
    const fusedList = new Fuse(array);

    const result = fusedList.search(term).map(value => value.item);
        return result;
}