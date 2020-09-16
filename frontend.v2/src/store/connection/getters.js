export const getters = {
    online: state => state.online,
    offline: state => !state.online,
}