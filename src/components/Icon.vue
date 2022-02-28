<template>
  <svg
    v-if="type === 'sprite-svg'"
    @click="$emit('click')"
    ref="ico"
    class="image"
    viewBox="0 0 100 100"
  >
    <use :href="src + '#' + name" />
  </svg>
  <img v-else :src="require(`@/assets/icons/${name}.svg`)" />
</template>
<script>
export default {
  props: ['name', 'file', 'app', 'type'],
  computed: {
    src() {
      return require(`@/assets/icons/sprite.svg`)
    },
  },
  methods: {
    safariFix() {
      new Promise(resolve => {
        if (window.spriteCache && window.spriteCache['sprite']) {
          resolve(window.spriteCache['sprite'])
        } else {
          fetch(
            require(`@/assets/icons/${this.file ? this.file : 'sprite'}.svg`),
          )
            .then(response => response.text())
            .then(data => {
              window.spriteCache['sprite'] = data
              resolve(data)
            })
        }
      })
        .then(data => {
          const newEl = document.createElement('span')
          newEl.innerHTML = data
          const symbol = newEl.querySelector('#' + this.name)
          this.$refs.ico.innerHTML = ''
          while (symbol.firstChild) {
            this.$refs.ico.appendChild(symbol.firstChild)
          }
          this.$refs.ico.setAttribute('viewBox', symbol.getAttribute('viewBox'))
        })
        .catch(() => {
          this.$refs.ico.setAttribute('viewBox', '0 0 100 100')
        })
    },
  },
}
</script>
<style lang="scss">
.is-16x16 {
  height: 16px;
  width: 16px;
}
.is-20x20 {
  height: 20px;
  width: 20px;
}
</style>
