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
          <div
            @click.stop="dialog = true"
            class="is-flex is-align-center cards-container__new-card"
          >
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
            v-if="allCards.length"
            style="z-index:2"
            @afterChange="setActiveCard($event)"
            v-bind="settings"
            :key="allCards.length"
            :arrows="false"
            :dots="true"
          >
            <card
              :revealCardNumber="revealCardNumber"
              :data="card"
              v-for="card in allCards"
              :key="card.id"
            />
          </VueSlickCarousel>
          <div class="show-card-number">
            <div
              @click="revealCardNumber = !revealCardNumber"
              class="d-flex pa-1"
            >
              <icon type="svg" name="eye" style="width:16px;height:16px"></icon>
              <p class="ml-2">
                {{ revealCardNumber ? 'Hide' : 'Show' }} card number
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="b" class="panel">
      <cards-controls
        @freeze-card="
          updateCard({
            freezed: !activeCard.freezed,
          })
        "
        @cancel-card="deleteCard(activeCard.id)"
      />
    </div>
    <v-dialog
      style="z-index:9999"
      v-model="dialog"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Add new card
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="form.name"
              :rules="[v => !!v || 'Item is required']"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.cardNumber"
              :counter="16"
              :rules="[v => !!v || 'Item is required']"
              label="Card number"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.cvv"
              :rules="[v => !!v || 'Item is required']"
              label="CVV"
              :counter="3"
              type="number"
              required
            ></v-text-field>
            <v-menu
              v-model="date_picker"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.expiry"
                  label="Expiry"
                  :rules="[v => !!v || 'Item is required']"
                  required
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.expiry"
                @input="date_picker = false"
              ></v-date-picker>
            </v-menu>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="addCard()">
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import { CardModule } from '@/store/modules/card/index'
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
  revealCardNumber = false
  date_picker = false
  valid = true
  dialog = false
  form = {
    name: '',
    cvv: undefined,
    cardNumber: '',
    expiry: '',
  }

  get allCards() {
    console.log(CardModule.allCards)
    return CardModule.allCards
  }
  get activeCard() {
    console.log(CardModule.activeCard)
    return CardModule.activeCard
  }
  async created() {
    await CardModule.getAllCards()
  }
  setActiveCard(index: number) {
    CardModule.setActiveCard(this.allCards[index])
  }
  addCard() {
    const { v4: uuidv4 } = require('uuid')
    const valid = (this.$refs.form as any).validate()
    const dayjs = require('dayjs')
    console.log(
      '🚀 ~ file: m-cards.vue ~ line 195 ~ MobileCards ~ addCard ~ valid',
      valid,
    )
    console.log(this.form)
    if (valid) {
      CardModule.addCard({
        ...this.form,
        id: uuidv4(),
        expiry: dayjs(this.form.expiry).format('MM/YY'),
      })
      this.dialog = false
    }
  }
  updateCard(payload: any) {
    CardModule.updateCardDetails({
      ...this.activeCard,
      ...payload,
    })
  }
  deleteCard(id: string) {
    CardModule.deleteCard(id)
  }
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
  top: -21px;
  right: 5px;
  background: $white;
  z-index: 1;
  height: 2.2rem;
  border-radius: 6px 6px 0 0;
}
::v-deep .slick-dots {
  .slick-active {
    border-radius: 8px;
    background: $color-primary;
    width: 1.6rem;
    height: 0.8rem;
    opacity: 1;
  }
  .slick-active button:before {
    font-family: unset;
  }
  li {
    border-radius: 8px;
    background: $color-primary;
    width: 0.8rem;
    height: 0.8rem;
    opacity: 0.3;
    list-style: none;
  }
}
::v-deep .slick-slide {
  padding: 0 0.4rem;
}
</style>
