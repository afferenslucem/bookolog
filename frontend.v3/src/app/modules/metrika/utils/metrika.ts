declare let ym: (id: number, name: 'reachGoal', eventName: string) => void;

function native(eventName: string): void {
  ym(85682306, 'reachGoal', eventName);
}

export default {
  native,
};
