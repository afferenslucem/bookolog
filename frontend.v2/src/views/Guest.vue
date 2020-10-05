<template>
  <div class="container">
    <div class="text-center mt-3">
      <h3>Bookolog</h3>
    </div>
    <div class="text-center mt-3">
      <h5>
        <b>{{ $t("main.hello") }}</b>
      </h5>

      <div id="featureIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li
            data-target="#featureIndicators"
            data-slide-to="0"
            class="active"
          ></li>
          <li data-target="#featureIndicators" data-slide-to="1"></li>
          <li data-target="#featureIndicators" data-slide-to="2"></li>
          <li data-target="#featureIndicators" data-slide-to="3"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <h5>{{ $t('main.features.flex.title') }}</h5>

            <div>
                {{ $t('main.features.flex.body') }}
            </div>
          </div>
          <div class="carousel-item">
            <h5>{{ $t('main.features.satistic.title') }}</h5>

            <div>
                {{ $t('main.features.satistic.body') }}
            </div>
          </div>
          <div class="carousel-item">
            <h5>{{ $t('main.features.viewLight.title') }}</h5>

            <div>
                {{ $t('main.features.viewLight.body') }}
            </div>
          </div>
          <div class="carousel-item">
            <h5>{{ $t('main.features.offline.title') }}</h5>

            <div>
                {{ $t('main.features.offline.body') }}
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#featureIndicators"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">{{ $t('main.carousel.prev') }}</span>
          </a>
          <a
            class="carousel-control-next"
            href="#featureIndicators"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">{{ $t('main.carousel.next') }}</span>
          </a>
        </div>
      </div>

      <div class="buttons mt-3">
          <button class="btn btn-primary w-100" @click="toLogin()">
              {{ $t('main.buttons.login') }}
          </button>
          <button class="btn btn-info w-100 mt-3" @click="toRegistration()">
              {{ $t('main.buttons.registration') }}
          </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  USER_RECOVER_ACTION,
} from '@/store/naming';

export default {
    methods: {
        toLogin() {
            this.$router.push({name: 'Login'})
        },
        toRegistration() {
            this.$router.push({name: 'Registration'})
        }
    },
    async beforeCreate() {
      const user = await this.$store.dispatch(USER_RECOVER_ACTION);
      if (user) {
        this.$router.push({name: 'InProgress'});
      }
    }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.carousel-inner {
    min-height: 300px;

    padding: 2rem;

    display: flex;

    background-color: #{$bdazzled-blue}33;
    border-radius: 1rem;
}
</style>