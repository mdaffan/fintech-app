<template>
  <div
    :class="{
      'card-container--disabled':
        activeCard.id === data.id && activeCard.freezed,
    }"
    v-if="data"
    class="card-container"
  >
    <icon type="svg" name="visa" class="is-20x20 card-container__logo"></icon>
    <icon
      type="svg"
      name="aspire-logo"
      class="is-20x20 card-container__aspire-logo"
    ></icon>

    <div class="card-container__content">
      <p class="font-open-sans-bold font-size-22 has-white-text">
        {{ data.name }}
      </p>
      <div v-if="!revealCardNumber" class="mt-6 d-flex has-white-text">
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
          {{ cardNumber[3] }}
        </div>
      </div>
      <div v-else class="mt-6 d-flex has-white-text">
        <div
          :class="{ 'ml-6': index !== 0 }"
          v-for="(number, index) in cardNumber"
          :key="number"
          class="d-flex font-size-14 font-open-sans-bold mt-n2"
        >
          {{ number }}
        </div>
      </div>
      <div
        class="is-flex is-align-center font-open-sans-bold mt-4 font-size-14 has-white-text"
      >
        <p>Thru {{ data.expiry }}</p>
        <div class="is-flex is-align-center ml-4 ">
          <p>
            CVV
          </p>
          <p :class="{ 'font-size-22 mt-2': !revealCardNumber }" class="ml-1">
            {{ revealCardNumber ? data.cvv : '***' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { CardModule } from '@/store/modules/card/index'
interface CardInterface {
  id?: string
  name?: string
  cardNumber?: string
  cvv?: number
  expiry?: string
}
@Component({})
export default class Card extends Vue {
  @Prop({ default: () => ({}) })
  data!: CardInterface
  @Prop({ default: () => false })
  revealCardNumber!: boolean

  get cardNumber() {
    return this.data && this.chunkString(this.data?.cardNumber!, 4)
  }
  get activeCard() {
    return CardModule.activeCard
  }
  chunkString(str: string, length: number) {
    return str.match(new RegExp('.{1,' + length + '}', 'g'))
  }
}
</script>

<style scoped lang="scss">
.card-container {
  height: 22.2rem;
  width: 100%;
  position: relative;
  border-radius: 12px;
  background: $color-primary;
  &--disabled {
    opacity: 0.3;
  }
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
