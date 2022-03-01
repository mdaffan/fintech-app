import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators'
import { baseAxios } from '@/api/axios'
import store from '@/store'
import { CardService } from '@/api/card-service'

interface Card {
  id?: string
  name?: string
  cardNumber?: string
  cvv?: number
  expiry?: string
  freezed?: boolean
}
@Module({ dynamic: true, store, name: 'cards' })
class CardState extends VuexModule {
  allCards: Card[] = []
  activeCard: Card = {}

  @Mutation
  saveCards(payload: any) {
    this.allCards = payload
  }
  @Mutation
  setActiveCard(payload: Card) {
    this.activeCard = payload
  }

  get cards() {
    return this.allCards
  }

  @Mutation
  updateCard({ payload, state }: { payload: Card; state: Card[] }) {
    this.activeCard = payload

    const index = state.findIndex(item => item.id === payload.id)
    if (index !== -1) {
      state[index] = { ...payload }
      this.allCards = [...state]
    }
  }

  @Action({ commit: 'saveCards', root: true })
  async getAllCards() {
    try {
      const response = await CardService.getAll({
        url: 'fakeData.json',
      })
      this.setActiveCard(response.data.cards[0])
      return response.data.cards
    } catch (err) {
      console.log(err)
    }
  }

  @Action({ commit: 'saveCards', root: true })
  async addCard(body: Card) {
    try {
      const payload = [...this.context.getters['cards'], body]

      return payload
    } catch (err) {
      console.log(err)
    }
  }
  @Action({ commit: 'saveCards', root: true })
  async deleteCard(id: string) {
    try {
      const index = this.context.getters['cards'].findIndex(
        (item: any) => item.id === id,
      )
      const payload = [...this.context.getters['cards']]
      if (index !== -1) payload.splice(index, 1)

      return payload
    } catch (err) {
      console.log(err)
    }
  }

  @Action({ commit: 'updateCard', rawError: true, root: true })
  async updateCardDetails(payload: Card) {
    try {
      const state = { ...(this.context.state as any).activeCard }
      const arrayClone: Card[] = this.context.getters['cards']
      if (state.id === payload.id) {
        return { payload, state: arrayClone }
      } else return null
    } catch (err) {
      console.log(err)
    }
  }
}
export const CardModule = getModule(CardState)
