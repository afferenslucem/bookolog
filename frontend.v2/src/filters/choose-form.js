export default function (count, label1, label2, label3) {
    const lostBy100 = count % 100;
    const lostBy10 = count % 10;

    if (lostBy100 < 20 && lostBy100 > 10 || lostBy10 > 4) return label3;
    else if (lostBy10 === 1) return label1;
    else return label2;
}
