<template>
  <v-app>
    <div class="pt-0">
      <router-view> </router-view>
      <BottomNavbar @show-alert="dialog = true" />
      <v-dialog
        style="z-index:9999"
        v-model="dialog"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-text class="pa-5 font-open-sans-regular font-size-16">
            These pages are not required, hence this sweet headsup :)
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HomePage from '@/views/m-cards.vue'

import BottomNavbar from '@/components/BottomNavbar.vue'
@Component({
  components: {
    HomePage,
    BottomNavbar,
  },
})
export default class Home extends Vue {
  dialog = false
  async created() {
    this.$router.push({ name: 'm-cards' })
  }
}
</script>
<style lang="scss"></style>
