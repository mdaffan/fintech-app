<template>
  <div class="wrapper">
    <div id="a" class="cards-container panel">
      <div class="is-relative">
        <div class="open-sans-semibold-14 has-white-text">
          Account balance
        </div>
        <div class="is-flex has-justify-space-between">
          <div class="is-flex is-align-center">
            <div
              class="has-white-text cards-container__price font-open-sans-bold font-size-12"
            >
              $$
            </div>
            <div class="ml-2 font-open-sans-bold font-size-24 has-white-text">
              3000
            </div>
          </div>
          <div class="is-flex is-align-center cards-container__new-card">
            <icon type="svg" name="plus" class="is-16x16"></icon>
            <p class="font-open-sans-bold font-size-13 ml-1">New card</p>
          </div>
        </div>
        <icon
          type="svg"
          name="logo-active"
          class="is-20x20 cards-container__logo"
        ></icon>
        <div class="cards-container__tabs">
          <div
            v-for="tab in tabs"
            :key="tab.name"
            class="cards-container__tabs__item"
            :class="{
              'cards-container__tabs__item--active': tab.name === active_tab,
            }"
          >
            {{ tab.name }}
          </div>
        </div>
        <div
          style="margin-top:5.6rem;position:relative"
          v-if="active_tab === 'My debit cards'"
        >
          <VueSlickCarousel
            style="z-index:2"
            v-bind="settings"
            :arrows="false"
            :dots="true"
          >
            <card />
            <card />
            <card />
          </VueSlickCarousel>
          <div class="show-card-number">
            <div class="d-flex pa-1">
              <icon type="svg" name="eye" style="width:16px;height:16px"></icon>
              <p class="ml-2">Show card number</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="b" class="panel">
      <cards-controls />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VueSlickCarousel from 'vue-slick-carousel'
import CardsControls from '@/components/CardControls.vue'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import Card from '@/components/Card.vue'
@Component({
  components: {
    VueSlickCarousel,
    CardsControls,
    Card,
  },
})
export default class MobileCards extends Vue {
  tabs = [
    {
      name: 'My debit cards',
    },
    {
      name: 'All company cards',
    },
  ]
  active_tab = 'My debit cards'
  settings = {}
}
</script>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  height: 100%;
  width: 100%;
}
#a {
  position: fixed;

  top: 0;
}

#b {
  margin-top: 130%;
  background: $white;
  border-radius: 25px;
}
.panel {
  position: relative;
  height: 100%;
  min-height: 100%;
  width: 100%;
  z-index: 1000;
}
.cards-container {
  padding: 2.4rem;
  position: fixed;
  width: 100%;

  top: 0;
  background: $color-secondary;

  &__price {
    width: 4rem;
    height: 2.2rem;
    padding: 1rem;
    border-radius: 4px;
    background: $color-primary;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__tabs {
    display: flex;
    margin-top: 3rem;
    padding-bottom: 4px;

    &__item {
      color: $white;
      font-size: 13px;
      padding-bottom: 0.5rem;
      opacity: 0.5;
      &--active {
        opacity: 1;
        margin-right: 3rem;

        border-bottom: 2px solid $sky-blue;
      }
    }
  }
  &__logo {
    position: absolute;
    top: 2rem;
    right: 2rem;
  }
  &__new-card {
    color: $sky-blue;
    width: 9rem;
  }
}
.show-card-number {
  color: $color-primary;
  position: absolute;
  top: -24px;
  right: -1px;
  background: $white;
  z-index: 1;
  height: 4rem;
  border-radius: 6px 6px 0 0;
}
::v-deep .slick-dots {
  .slick-active {
    border-radius: 8px;
    background: $color-primary;
    width: 1.6rem;
    height: 0.8rem;
    opacity: 100%;
  }
  .slick-active button:before {
    font-family: unset;
  }
  li {
    border-radius: 8px;
    background: $color-primary;
    width: 0.8rem;
    height: 0.8rem;
    opacity: 10%;
    list-style: none;
  }
}
</style>
