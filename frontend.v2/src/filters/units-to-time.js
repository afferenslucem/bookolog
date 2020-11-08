import padStart from './pad-start';

export default function (units) {
    const hours = Math.trunc(units / 60);
    const minutes = units % 60;

    return `${padStart(hours, '0', 2)}:${padStart(minutes, '0', 2)}`
}
