<template>
    <form @submit="submit($event)" name="avatar-change" autocomplete="off">
        <h5>{{ $t("settings.avatarChangeForm.title") }}</h5>
        <div class="form-group avatar-form">
            <picture-input @selected="onFileChange($event)"/>
            <div class="btn-submit">
                <button
                        class="btn btn-primary w-100"
                        type="submit"
                        :disabled="file === null"
                >
                    {{ $t("settings.avatarChangeForm.submit") }}
                </button>
            </div>
        </div>
    </form>
</template>

<script>
    import { UserClient } from "@/http/user-client";
    import PictureInput from "@/components/input/PictureInput.vue";
    import {
        NOTIFICATION_DANGER_ACTION,
        NOTIFICATION_SUCCESS_ACTION,
        USER_SET_AVATAR_MUTATION,
    } from "@/store/naming";

    export default {
        data: () => ({
            file: null,
        }),
        components: {
            PictureInput
        },
        methods: {
            async submit(event) {
                try {
                    event.preventDefault();

                    const data = new FormData();

                    data.append("file", this.file);

                    var avatar = await new UserClient().uploadAvatar(data);

                    this.$store.commit(USER_SET_AVATAR_MUTATION, avatar);

                    this.$store.dispatch(
                        NOTIFICATION_SUCCESS_ACTION,
                        this.$t("settings.avatarChangeForm.success")
                    );

                    return false;
                } catch (e) {
                    this.$store.dispatch(
                        NOTIFICATION_DANGER_ACTION,
                        this.$t("settings.avatarChangeForm.errors.error")
                    );
                }
            },
            onFileChange(e) {
                this.file = e;
            },
        },
    };
</script>

<style lang="scss" scoped>
    .avatar-form {
        display: flex;

        justify-content: space-between;
        align-items: center;

        > * {
            flex: 0 0 auto;
        }

        .btn-submit {
            flex: 1 1 auto;

            padding-left: 1rem;
        }
    }
</style>
