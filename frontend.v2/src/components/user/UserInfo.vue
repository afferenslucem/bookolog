<template>
    <div class="user-info">
        <div class="avatar">
            <div class="picture">
                <profile-pic :avatar="avatarLink"/>
            </div>
        </div>
        <div class="login main-text">
            <span>{{userLogin}}</span>
        </div>
        <div class="total-count main-text">
            <total-read-count />
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

    .avatar {
        grid-column-gap: 1rem;
        grid-row-gap: 1rem;

        grid-column-start: 1;
        grid-column-end: 2;

        grid-row-start: 1;
        grid-row-end: 3;

        display: flex;
        justify-content: center;
        align-items: center;

        .picture {
            height: 5rem;
            width: 5rem;

            border-radius: 2.5rem;

            display: flex;
            justify-content: center;
            align-items: center;

            font-size: 2.5rem;
        }
    }

    .login {
        display: flex;

        align-items: flex-end;
    }

    .main-text {
        font-weight: $fat-font-weight;
        font-size: $normal-font-size;
    }
</style>
