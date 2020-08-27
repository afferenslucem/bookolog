import userMixin from './user-mixin';

export default {
    mixins: [
        userMixin
    ],
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if(!vm.isLoggedIn) {
                next({name: 'Home'})
            }
        })
    }
}