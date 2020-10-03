function wrap(value, tag) {
    return `<${tag}>${value}</${tag}>`;
}

export default (value, tag) => {
    if (Array.isArray(value)) {
        return value.map(item => wrap(item, tag));
    } else {
        return wrap(value, tag);
    }
}