import Vue from 'vue';

export default Vue.extend({
    methods: {
        goToMain() {
            this.$router.push({name: 'Main'})
        }
    }
});