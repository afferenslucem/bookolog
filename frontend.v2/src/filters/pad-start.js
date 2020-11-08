export default function (str, filler, totalLen) {
    const diff = totalLen - str.toString().length;

    return filler.repeat(diff) + str;
}
