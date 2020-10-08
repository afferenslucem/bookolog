function strUnify(line) {
    return line.toLowerCase().trim();
}

export const stringComparer = {
    equal: (a, b) => strUnify(a) === strUnify(b),
    getHashCode: (a) => strUnify(a),
};