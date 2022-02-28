<template>
  <v-app>
    <div class="pt-0">
      <router-view> </router-view>
      <BottomNavbar />
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HomePage from '@/views/m-cards.vue'
import { BlogModule } from './store/modules/blog'
import BottomNavbar from '@/components/BottomNavbar.vue'
@Component({
  components: {
    HomePage,
    BottomNavbar,
  },
})
export default class Home extends Vue {
  async created() {
    this.$router.push({ name: 'm-cards' })
  }
}
</script>
<style lang="scss"></style>
