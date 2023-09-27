<template>
  <div class="d-flex flex-column bg-white border-light-secondary px-3 pt-3 pb-4">
    <span class="text-dark-primary-15" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Общая сводка')" />
    <div class="d-flex align-items-center flex-wrap gen_container mt-3">
      <div class="d-flex flex-column mb-2">
        <span class="text-dark-primary-24 line-height-1" :class="isRtlMode ? 'text-right' : ''" v-text="`${currentQuote[1]}`" />
        <div class="cmd_label -red" :class="isRtlMode ? 'ml-auto' : 'mr-auto'" v-text="$t('Продажа')" />
      </div>
      <div class="d-flex flex-column mb-2">
        <span class="text-secondary-24 line-height-1" :class="isRtlMode ? 'text-right' : ''" v-text="`${card.spread || null}`" />
        <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Спред')" />
      </div>
      <div class="d-flex flex-column mb-2">
        <span class="text-dark-primary-24 line-height-1" v-text="`${currentQuote[2]}`" />
        <div class="cmd_label -green" :class="isRtlMode ? 'ml-auto' : 'mr-auto'" v-text="$t('Покупка')" />
      </div>
      <div class="d-flex flex-column mb-2">
        <span class="line-height-1" :class="[isRtlMode ? 'text-right' : '', 'text-dark-primary-24']" v-text="`0.00000`" />
        <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'ml-auto text-right' : 'mr-auto'" v-text="`${$t('Изменение в пунктах')} (${activePeriod})`" />
      </div>
      <div class="trading-page-card-data-change">
        <span
          class="trading-page-card-data-quote-value -info"
          :class="[isRtlMode ? 'text-right' : '', card.priceChange > 0 ? '-success' : '-danger']"
          v-text="`${card.priceChange}%`"
        />
        <span class="trading-page-card-data-quote-title" :class="isRtlMode ? 'ml-auto text-right' : 'mr-auto'" v-text="`${$t('Изменение в процентах')} (${activePeriod})`" />
      </div>
      <div class="trading-page-card-info-mood">
        <div class="trading-page-card-info-mood-data">
          <span
            class="trading-page-card-info-mood-data-value text-danger-24"
            :class="[isRtlMode ? 'text-right' : '', card.isMoodUp ? '-green' : '-red']"
            v-text="`${card.mood}%`"
          />
          <lfx-icon-arrow-up v-if="card.isMoodUp" class="trading-page-card-info-mood-data-arrow" />
          <lfx-icon-arrow-down v-else class="trading-page-card-info-mood-data-arrow" />
        </div>
        <span class="trading-page-card-info-mood-title" :class="isRtlMode ? 'ml-auto text-right' : 'mr-auto'" v-text="$t('Настроение')" />
      </div>
      <div class="trading-page-card-info-volatility">
        <span class="trading-page-card-info-volatility-value text-dark-primary-24" :class="isRtlMode ? 'text-right' : ''" v-text="`${card.volatility}%`" />
        <span class="trading-page-card-info-volatility-title" :class="isRtlMode ? 'ml-auto text-right' : 'mr-auto'" v-text="`${$t('Волатильность')} (${activePeriod})`" />
      </div>
    </div>
  </div>
</template>

<script>
import LfxIconArrowUp from '@/components/icons/lfx-icon-arrow-up.vue'
import LfxIconArrowDown from '@/components/icons/lfx-icon-arrow-down.vue'
export default {
  name: 'General',
  components: { LfxIconArrowUp, LfxIconArrowDown },
  props: {
    instrument: {
      type: Object,
      default: () => {
        return {
          symbol: null,
          symbol_original: true,
          category: 1
        }
      }
    },
    card: {
      type: Object,
      default: () => {
        return {
          bid: 0,
          ask: 0,
          priceChange: 0,
          spread: 0,
          mood: 0,
          volatility: 0,
          isMoodUp: false
        }
      }
    }
  },
  computed: {
    currentQuote () {
      return [this.instrument.symbol_original, this.card.bid, this.card.ask]
    },
    activePeriod () {
      return this.$store.getters['trading/getters/trading/getTrading'].period
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  }
}
</script>
