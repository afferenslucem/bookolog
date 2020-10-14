<template>
  <div class="profile">
    <div class="profile__header">
      <div class="avatar">
        <profile-pic :avatar="avatarLink" />
      </div>
      <div class="login pl-4">
        {{ userData.user.login }}
      </div>
    </div>
    <div class="profile__body">
      <books-by-years-list
        v-if="shouldShowList"
        :books="userData.books"
        :listname="$t('user.list.title') | capital"
      />
      <div v-else>{{ $t("user.list.noOneBook") }}</div>
    </div>
  </div>
</template>

<script>
import userMixin from "@/mixins/user-mixin";
import { NOTIFICATION_DANGER_ACTION } from "@/store/naming";
import { UserClient } from "@/http/user-client";
import BooksByYearsList from "@/components/book-module/books-lists/BooksByYearsList";
import store from "@/store";
import i18n from "@/i18n";
export default {
  mixins: [userMixin],
  components: {
    BooksByYearsList,
  },
  data: () => ({
    userData: null,
  }),
  computed: {
    avatarLink() {
      const avatar = this.userData?.user.avatarName;

      return this.getAvatarLink(avatar);
    },
    shouldShowList() {
      return this.userData?.books != null && this.userData.books.length > 0;
    },
  },
  async beforeRouteEnter(to, from, next) {
    const login = to.params.login;
    try {
      const userData = await new UserClient().loadUser(login);
      next((vm) => (vm.userData = userData));
    } catch (e) {
      store.dispatch(
        NOTIFICATION_DANGER_ACTION,
        i18n.t("user.notification.load.fail")
      );
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
.profile {
  overflow: auto;
}

.profile {
  height: 100%;
  overflow: auto;

  &__header {
    display: flex;

    height: 3rem;

    .avatar {
      width: auto;
      height: 100%;

      flex: 0 0 auto;
    }

    .login {
      flex: 1 1 auto;

      display: flex;

      align-items: center;

      font-weight: $fat-font-weight;
      font-size: $big-font-size;
    }
  }
  &__body {
    height: calc(100% - 3rem);
    overflow: auto;
  }
}
</style>