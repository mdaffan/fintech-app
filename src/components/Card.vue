<template>
  <div class="card-container">
    <icon type="svg" name="visa" class="is-20x20 card-container__logo"></icon>
    <icon
      type="svg"
      name="aspire-logo"
      class="is-20x20 card-container__aspire-logo"
    ></icon>

    <div class="card-container__content">
      <p class="font-open-sans-bold font-size-22 has-white-text">
        Mark Henry
      </p>
      <div class="mt-6 d-flex has-white-text">
        <div class="d-flex">
          <span class="card-container__content__bullet"></span>
          <span class="card-container__content__bullet ml-1"></span>
          <span class="card-container__content__bullet ml-1"></span>
          <span class="card-container__content__bullet ml-1"></span>
        </div>
        <div class="d-flex ml-6">
          <span class="card-container__content__bullet"></span>
          <span class="card-container__content__bullet ml-1"></span>
          <span class="card-container__content__bullet ml-1"></span>
          <span class="card-container__content__bullet ml-1"></span>
        </div>
        <div class="d-flex ml-6">
          <span class="card-container__content__bullet"></span>
          <span class="card-container__content__bullet ml-1"></span>
          <span class="card-container__content__bullet ml-1"></span>
          <span class="card-container__content__bullet ml-1"></span>
        </div>
        <div class="d-flex ml-6 font-size-14 font-open-sans-bold mt-n2">
          2020
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
export default class Card extends Vue {}
</script>

<style scoped lang="scss">
.card-container {
  height: 22.2rem;
  width: 100%;
  position: relative;
  border-radius: 12px;
  background: $color-primary;
  &__logo {
    position: absolute;
    bottom: 2.4rem;
    right: 2.4rem;
    width: 5.9rem;
    height: 2rem;
  }
  &__aspire-logo {
    position: absolute;
    right: 2.4rem;
    top: 2.4rem;
    width: 7.4rem;
    height: 2.1rem;
  }

  &__content {
    padding-top: 6.9rem;
    padding-left: 2.4rem;
    &__bullet {
      width: 8px;
      height: 8px;
      background: $white;
      border-radius: 50%;
    }
  }
}
</style>
