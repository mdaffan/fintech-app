<template>
  <div class="bottom-nav">
    <div
      v-for="item in items"
      :key="item.name"
      @click="
        item.to.name !== 'm-cards' ? $emit('show-alert') : $router.push(item.to)
      "
      class="is-50x50 is-flex-center"
    >
      <icon
        type="svg"
        :name="$route.name == item.to.name ? item.icon + '-active' : item.icon"
        class="is-20x20"
      ></icon>

      <div
        class="open-sans-regular-12 bottom-nav__item"
        :class="{ 'has-highlight-text': $route.name == item.to.name }"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue'

export default {
  components: {
    Icon,
  },
  data() {
    return {}
  },
  computed: {
    items() {
      return [
        {
          icon: 'logo',
          to: {
            name: 'm-home',
          },
          name: 'Home',
        },
        {
          icon: 'card',
          to: {
            name: 'm-cards',
          },
          name: 'Cards',
        },
        {
          icon: 'payments',
          to: {
            name: 'payments',
          },
          name: 'Payments',
        },
        {
          icon: 'credit',
          to: {
            name: 'credit',
          },
          name: 'Credit',
        },
        {
          icon: 'account',
          to: {
            name: 'profile',
          },
          name: 'Profile',
        },
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9999;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 6px 0 $shadow;
  height: 6rem;
  padding: 0 1.6rem;
  text-align: center;
  background: $white;
  a {
    text-decoration: none;
  }
  &__item {
    color: $color-light-gray;
  }
}
</style>
