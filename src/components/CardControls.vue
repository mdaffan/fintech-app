<template>
  <div class="card-controls-container">
    <div class="card-controls-container__quick-actions">
      <div
        @click="$emit(action.action)"
        style="text-align:center"
        v-for="action in quickActions"
        :key="action.label"
      >
        <icon type="svg" :name="action.icon"></icon>
        <p class="font-open-sans-regular has-primary-text font-size-13">
          {{
            action.action === 'freeze-card' && activeCard.freezed
              ? 'Unfreeze card'
              : action.label
          }}
        </p>
      </div>
    </div>
    <div @click="expanded['details'] = !expanded['details']" class="card">
      <div class="card__header">
        <div class="d-flex">
          <icon class="is-24x24" type="svg" :name="'card-details'"></icon>
          <p class="font-open-sans-semibold font-size-14 ml-2">Card details</p>
        </div>
        <icon
          class="is-20x20"
          style="width:20px;height:20px"
          type="svg"
          :name="expanded['details'] ? 'up-arrow' : 'down-arrow'"
        ></icon>
      </div>
    </div>
    <div @click="expanded['recent'] = !expanded['recent']" class="card">
      <div class="card__header">
        <div class="d-flex">
          <icon
            class="is-24x24"
            type="svg"
            :name="'recent-transactions'"
          ></icon>
          <p class="font-open-sans-semibold font-size-14 ml-2">
            Recent transactions
          </p>
        </div>
        <icon
          class="is-20x20"
          style="width:20px;height:20px"
          type="svg"
          :name="expanded['recent'] ? 'up-arrow' : 'down-arrow'"
        ></icon>
      </div>
      <div v-if="expanded['recent']" class="card__expanded">
        <div
          v-for="item in transactions"
          :key="item.id"
          class="card__expanded__item"
        >
          <div class="d-flex">
            <div
              class="card__expanded__item__circle"
              :style="`background:${item.color};color:${item.color}`"
            >
              <icon class="is-24x24" type="svg" :name="item.icon"></icon>
            </div>
            <div class="ml-3">
              <p class="font-open-sans-semibold  font-size-14">
                {{ item.label }}
              </p>
              <p
                class="font-open-sans-regular font-size-13 mt-1 has-light-text"
              >
                {{ item.date }}
              </p>
              <div
                style="color:#325BAF"
                class="is-flex mt-2 ml-n1 is-align-center"
              >
                <div class="card__expanded__item__card">
                  <icon
                    class="is-12x12"
                    type="svg"
                    :name="'business-and-finance'"
                  ></icon>
                </div>
                <p
                  class="font-open-sans-semibold ml-2 font-size-12 has-primary-text"
                >
                  {{
                    item.type === 'credit'
                      ? 'Refund on debit card'
                      : 'Charged to debit card'
                  }}
                </p>
              </div>
            </div>
          </div>
          <div>
            <span
              :class="{ 'has-success-text': item.type === 'credit' }"
              class="font-open-sans-bold font-size-14 "
            >
              {{ item.type === 'credit' ? '+' : '-' }}S$ {{ item.amount }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CardModule } from '@/store/modules/card/index'
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class CardControls extends Vue {
  quickActions = [
    {
      label: 'Freeze card',
      icon: 'freeze-card',
      action: 'freeze-card',
    },
    {
      label: 'Set spend limit',
      icon: 'spend-limit',
      action: 'spend-limit',
    },
    {
      label: 'Add to GPay',
      icon: 'gpay',
      action: 'gpay',
    },
    {
      label: 'Replace card',
      icon: 'replace-card',
      action: 'replace-card',
    },
    {
      label: 'Cancel card',
      icon: 'cancel-card',
      action: 'cancel-card',
    },
  ]
  expanded = {
    recent: true,
    details: false,
  }
  transactions = [
    {
      label: 'Hamleys',
      amount: '150',
      id: 1,
      type: 'credit',
      color: '#009DFF1A',
      date: '20 May 2020',
      icon: 'file-storage',
    },
    {
      label: 'Hamleys',
      amount: '150',
      type: 'debit',
      id: 2,
      color: '#00D6B51A',
      date: '20 May 2020',
      icon: 'flights',
    },
    {
      label: 'Hamleys',
      amount: '150',
      type: 'debit',
      id: 3,
      color: '#F251951A',
      date: '20 May 2020',
      icon: 'megaphone',
    },
  ]
  get activeCard() {
    return CardModule.activeCard
  }
}
</script>

<style scoped lang="scss">
.card-controls-container {
  &__quick-actions {
    background: #edf3ff;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 31px 20px;
    border-radius: 25px 25px 0 0;
    align-items: center;
    color: $primary-text;
    height: 116px;
  }
}
.card {
  margin: 2.4rem;
  &__header {
    height: 72px;
    display: flex;
    padding: 2.4rem;
    background: #fafcff;
    border: 1px solid #f5f5f5;
    box-shadow: 0 0 8px 0 #0000000a;

    justify-content: space-between;
  }
  &__expanded {
    transition: 0.5s ease;

    border: 1px solid #f0f0f0;
    &__item {
      padding: 2.4rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f0f0f0;
      &__circle {
        width: 4.8rem;
        height: 4.8rem;

        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &__card {
        background: #325baf;
        width: 2.4rem;
        height: 2rem;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
