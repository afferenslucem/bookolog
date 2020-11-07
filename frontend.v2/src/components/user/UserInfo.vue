<template>
    <div class="user-info user">
        <div class="user__avatar flex-centered">
            <profile-pic class="picture" :avatar="avatarLink"/>
        </div>
        <div class="user__login main-text">
            <span>{{userLogin}}</span>
        </div>
        <div class="total-count main-text">
            <total-read-count/>
        </div>
    </div>
</template>

<script>
    import userMixin from '@/mixins/user-mixin';

    export default {
        mixins: [userMixin],
        name: "user-info",
    }
</script>

<style lang="scss" scoped>
    @import "@/styles/variables";

    .user-info {
        background-color: $user-info-bg-color;

        display: grid;

        grid-template-columns: 40% 60%;
        grid-template-rows: 50% 50%;

        width: 100%;
        height: 6rem;

        color: white;
    }

    .user {
        &__avatar {
            grid-column-gap: 1rem;
            grid-row-gap: 1rem;

            grid-column-start: 1;
            grid-column-end: 2;

            grid-row-start: 1;
            grid-row-end: 3;

            font-size: 2.5rem;
        }

        &__login {
            display: flex;

            align-items: flex-end;
        }

    }

    .main-text {
        font-weight: $fat-font-weight;
        font-size: $normal-font-size;
    }
</style>

<style lang="scss">
    .user__avatar {
        .picture {
            height: 5rem;
            width: 5rem;
        }
    }
</style>
