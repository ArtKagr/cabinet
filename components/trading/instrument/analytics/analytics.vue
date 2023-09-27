<template>
  <div class="trading-analytics">
    <div v-if="instrumentAnalytics.analytics.length" class="trading-analytics-analytics_container" :class="`-${dir}`">
      <div v-for="card in instrumentAnalytics.analytics" :key="card.id" class="trading-analytics-analytics_container-card">
        <div class="d-flex align-items-center mb-3">
          <span class="trading-analytics-analytics_container-card-type" :class="`-${dir}`" v-text="card.type === 1 ? 'tech': 'fund'" />
          <span class="trading-analytics-analytics_container-card-direction" :class="[`-${dir}`, getSummaryClass(card.direction)]" v-text="getSummaryInfo(card.direction)" />
          <span class="trading-analytics-analytics_container-card-published_at" v-text="moment(card.publication_date).format('DD.MM.YYYY HH:mm')" />
        </div>
        <div class="trading-analytics-analytics_container-card-title" :class="`-${dir}`" v-html="card.title" />
        <div class="trading-analytics-analytics_container-card-short" :class="`-${dir}`" v-html="card.short" />
        <div v-if="!card.is_shown" class="trading-analytics-analytics_container-card-details" @click="showFullDescription(card.id)">
          <span class="trading-analytics-analytics_container-card-details-title" :class="`-${dir}`" v-text="$t('Подробнее')" />
          <lfx-icon-chevron-down class="trading-analytics-analytics_container-card-details-icon" />
        </div>
        <div v-if="card.is_shown" class="trading-analytics-analytics_container-card-description" :class="`-${dir}`" v-html="card.text" />
      </div>
    </div>
    <div v-else class="trading-analytics-analytics_container -empty" :class="`-${dir}`">
      <div class="trading-analytics-analytics_container-card -empty">
        <span class="trading-analytics-signals_container-title" :class="`-${dir}`" v-text="$t('Ничего не найдено')" />
      </div>
    </div>
    <div class="d-flex flex-column" :style="windowWidth <= 768 ? 'margin: 0 15px' : windowWidth <= 1000 ? `${isRtlMode ? 'margin: 0' : 'margin: 0'}` : ''">
      <div class="trading-analytics-signals_container" :class="`-${dir}`">
        <span class="trading-analytics-signals_container-title" :class="`-${dir}`" v-text="$t('Индикаторы')" />
        <div class="trading-analytics-signals_container-menu">
          <a
            v-for="(item, key) in timeframes"
            :key="key"
            class="trading-analytics-signals_container-menu-item"
            :class="item === activeTimeframe ? '-active' : ''"
            @click="setActiveTimeframe(item)"
            v-text="item"
          />
        </div>
        <div v-for="(signal, key) in instrumentAnalytics.signals" :key="key" class="trading-analytics-signals_container-signal">
          <div v-if="activeTimeframe === signal.timeframe" class="trading-analytics-signals_container-signal-indicators">
            <div class="d-flex flex-column" :class="windowWidth <= 1000 ? 'w-50' : ''">
              <div class="trading-analytics-signals_container-signal-indicators-indicator">
                <span class="trading-analytics-signals_container-signal-indicators-indicator-title" :class="`-${dir}`" v-text="'MA10'" />
                <lfx-indicator-minus3 v-if="signal.indicators.ma10 === -3" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator-minus2 v-else-if="signal.indicators.ma10 === -2" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator-minus1 v-else-if="signal.indicators.ma10 === -1" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator0 v-else-if="signal.indicators.ma10 === 0" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator1 v-else-if="signal.indicators.ma10 === 1" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator2 v-else-if="signal.indicators.ma10 === 2" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator3 v-else-if="signal.indicators.ma10 === 3" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
              </div>
              <div class="trading-analytics-signals_container-signal-indicators-indicator">
                <span class="trading-analytics-signals_container-signal-indicators-indicator-title" :class="`-${dir}`" v-text="'MA20'" />
                <lfx-indicator-minus3 v-if="signal.indicators.ma20 === -3" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator-minus2 v-else-if="signal.indicators.ma20 === -2" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator-minus1 v-else-if="signal.indicators.ma20 === -1" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator0 v-else-if="signal.indicators.ma20 === 0" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator1 v-else-if="signal.indicators.ma20 === 1" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator2 v-else-if="signal.indicators.ma20 === 2" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator3 v-else-if="signal.indicators.ma20 === 3" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
              </div>
              <div class="trading-analytics-signals_container-signal-indicators-indicator">
                <span class="trading-analytics-signals_container-signal-indicators-indicator-title" :class="`-${dir}`" v-text="'MA50'" />
                <lfx-indicator-minus3 v-if="signal.indicators.ma50 === -3" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator-minus2 v-else-if="signal.indicators.ma50 === -2" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator-minus1 v-else-if="signal.indicators.ma50 === -1" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator0 v-else-if="signal.indicators.ma50 === 0" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator1 v-else-if="signal.indicators.ma50 === 1" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator2 v-else-if="signal.indicators.ma50 === 2" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator3 v-else-if="signal.indicators.ma50 === 3" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
              </div>
              <div class="trading-analytics-signals_container-signal-indicators-indicator">
                <span class="trading-analytics-signals_container-signal-indicators-indicator-title" :class="`-${dir}`" v-text="'MA100'" />
                <lfx-indicator-minus3 v-if="signal.indicators.ma100 === -3" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator-minus2 v-else-if="signal.indicators.ma100 === -2" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator-minus1 v-else-if="signal.indicators.ma100 === -1" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator0 v-else-if="signal.indicators.ma100 === 0" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator1 v-else-if="signal.indicators.ma100 === 1" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator2 v-else-if="signal.indicators.ma100 === 2" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator3 v-else-if="signal.indicators.ma100 === 3" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
              </div>
              <div class="trading-analytics-signals_container-signal-indicators-indicator">
                <span class="trading-analytics-signals_container-signal-indicators-indicator-title" :class="`-${dir}`" v-text="'MACD'" />
                <lfx-indicator-minus3 v-if="signal.indicators.macd === -3" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator-minus2 v-else-if="signal.indicators.macd === -2" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator-minus1 v-else-if="signal.indicators.macd === -1" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator0 v-else-if="signal.indicators.macd === 0" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator1 v-else-if="signal.indicators.macd === 1" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator2 v-else-if="signal.indicators.macd === 2" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator3 v-else-if="signal.indicators.macd === 3" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
              </div>
            </div>
            <div class="d-flex flex-column" :class="windowWidth <= 1000 ? 'w-50' : ''">
              <div class="trading-analytics-signals_container-signal-indicators-indicator">
                <span class="trading-analytics-signals_container-signal-indicators-indicator-title" :class="`-${dir}`" v-text="'BBands'" />
                <lfx-indicator-minus3 v-if="signal.indicators.bbands === -3" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator-minus2 v-else-if="signal.indicators.bbands === -2" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator-minus1 v-else-if="signal.indicators.bbands === -1" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator0 v-else-if="signal.indicators.bbands === 0" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator1 v-else-if="signal.indicators.bbands === 1" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator2 v-else-if="signal.indicators.bbands === 2" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator3 v-else-if="signal.indicators.bbands === 3" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
              </div>
              <div class="trading-analytics-signals_container-signal-indicators-indicator">
                <span class="trading-analytics-signals_container-signal-indicators-indicator-title" :class="`-${dir}`" v-text="'Ichimoku'" />
                <lfx-indicator-minus3 v-if="signal.indicators.ichimoku === -3" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator-minus2 v-else-if="signal.indicators.ichimoku === -2" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator-minus1 v-else-if="signal.indicators.ichimoku === -1" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator0 v-else-if="signal.indicators.ichimoku === 0" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator1 v-else-if="signal.indicators.ichimoku === 1" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator2 v-else-if="signal.indicators.ichimoku === 2" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator3 v-else-if="signal.indicators.ichimoku === 3" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
              </div>
              <div class="trading-analytics-signals_container-signal-indicators-indicator">
                <span class="trading-analytics-signals_container-signal-indicators-indicator-title" :class="`-${dir}`" v-text="'Stochastic'" />
                <lfx-indicator-minus3 v-if="signal.indicators.stochastic === -3" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator-minus2 v-else-if="signal.indicators.stochastic === -2" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator-minus1 v-else-if="signal.indicators.stochastic === -1" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator0 v-else-if="signal.indicators.stochastic === 0" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator1 v-else-if="signal.indicators.stochastic === 1" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator2 v-else-if="signal.indicators.stochastic === 2" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator3 v-else-if="signal.indicators.stochastic === 3" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
              </div>
              <div class="trading-analytics-signals_container-signal-indicators-indicator">
                <span class="trading-analytics-signals_container-signal-indicators-indicator-title" :class="`-${dir}`" v-text="`William's`" />
                <lfx-indicator-minus3 v-if="signal.indicators.williams === -3" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator-minus2 v-else-if="signal.indicators.williams === -2" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator-minus1 v-else-if="signal.indicators.williams === -1" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator0 v-else-if="signal.indicators.williams === 0" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator1 v-else-if="signal.indicators.williams === 1" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator2 v-else-if="signal.indicators.williams === 2" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator3 v-else-if="signal.indicators.williams === 3" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
              </div>
              <div class="trading-analytics-signals_container-signal-indicators-indicator">
                <span class="trading-analytics-signals_container-signal-indicators-indicator-title" :class="`-${dir}`" v-text="'ZigZag'" />
                <lfx-indicator-minus3 v-if="signal.indicators.zigzag === -3" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator-minus2 v-else-if="signal.indicators.zigzag === -2" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator-minus1 v-else-if="signal.indicators.zigzag === -1" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator0 v-else-if="signal.indicators.zigzag === 0" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator1 v-else-if="signal.indicators.zigzag === 1" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator2 v-else-if="signal.indicators.zigzag === 2" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
                <lfx-indicator3 v-else-if="signal.indicators.zigzag === 3" class="trading-analytics-signals_container-signal-indicators-indicator-scale" />
              </div>
            </div>
          </div>
          <div v-if="activeTimeframe === signal.timeframe" class="trading-analytics-signals_container-summary">
            <span class="trading-analytics-signals_container-summary-title" :class="`-${dir}`" v-text="$t('Общая рекомендация')" />
            <span class="trading-analytics-signals_container-summary-result" :class="getSummaryClass(signal.summary)" v-text="getSummaryInfo(signal.summary)" />
          </div>
        </div>
      </div>
      <div class="trading-analytics-market_sentiment" :class="`-${dir}`">
        <span class="trading-analytics-market_sentiment-title" :class="`-${dir}`" v-text="$t('Настроение рынка')" />
        <div class="trading-analytics-market_sentiment-scale_container">
          <div class="trading-analytics-market_sentiment-scale_container-scale">
            <span v-if="isRtlMode" class="trading-analytics-market_sentiment-scale_container-scale-purchase" :style="`width: ${instrumentAnalytics.marketSentiment.purchase}%`" />
            <span class="trading-analytics-market_sentiment-scale_container-scale-sale" :style="`width: ${instrumentAnalytics.marketSentiment.sale}%`" />
            <span v-if="!isRtlMode" class="trading-analytics-market_sentiment-scale_container-scale-purchase" :style="`width: ${instrumentAnalytics.marketSentiment.purchase}%`" />
          </div>
          <div class="trading-analytics-market_sentiment-scale_container-description">
            <span v-if="isRtlMode" v-text="`${Number(instrumentAnalytics.marketSentiment.purchase).toFixed(2)}% ${$t('Покупка')}`" />
            <span v-text="`${Number(instrumentAnalytics.marketSentiment.sale).toFixed(2)}% Продажа`" />
            <span v-if="!isRtlMode" v-text="`${Number(instrumentAnalytics.marketSentiment.purchase).toFixed(2)}% ${$t('Покупка')}`" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import LfxIconChevronDown from '@/components/icons/lfx-icon-chevron-down.vue'
import LfxIndicator0 from '@/components/trading/instrument/analytics/components/lfx-indicator-0.vue'
import LfxIndicator1 from '@/components/trading/instrument/analytics/components/lfx-indicator-1.vue'
import LfxIndicator2 from '@/components/trading/instrument/analytics/components/lfx-indicator-2.vue'
import LfxIndicator3 from '@/components/trading/instrument/analytics/components/lfx-indicator-3.vue'
import LfxIndicatorMinus1 from '@/components/trading/instrument/analytics/components/lfx-indicator-minus-1.vue'
import LfxIndicatorMinus2 from '@/components/trading/instrument/analytics/components/lfx-indicator-minus-2.vue'
import LfxIndicatorMinus3 from '@/components/trading/instrument/analytics/components/lfx-indicator-minus-3.vue'
export default {
  name: 'Analytics',
  components: {
    LfxIndicatorMinus3,
    LfxIndicatorMinus2,
    LfxIndicatorMinus1,
    LfxIndicator3,
    LfxIndicator2,
    LfxIndicator1,
    LfxIndicator0,
    LfxIconChevronDown
  },
  props: {
    instrument: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      moment,
      timeframes: ['M1', 'M5', 'M15', 'M30', 'H1', 'H4', 'D1'],
      activeTimeframe: 'M1'
    }
  },
  computed: {
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    },
    instrumentAnalytics () {
      return this.$store.getters['trading/getters/handler/getInstrumentAnalytics']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  created () {
    this.$store.dispatch('trading/actions/handler/fetchInstrumentAnalytics', this.instrument.symbol_original)
  },
  destroyed () {
    this.$store.commit('trading/mutations/handler/SAVE_INSTRUMENT_ANALYTICS', {
      rootData: this.$store.state.trading.state.handler,
      data: { analytics: [], marketSentiment: { sale: 0, purchase: 0 }, signals: [] }
    }, { root: true })
  },
  methods: {
    showFullDescription (cardId) {
      this.$store.commit('trading/mutations/handler/SHOW_ANALYTICS_CARD_DESCRIPTION', {
        rootData: this.$store.state.trading.state.handler,
        data: cardId
      })
    },
    setActiveTimeframe (timeframe) {
      this.activeTimeframe = timeframe
    },
    getSummaryInfo (summary) {
      let result
      switch (summary) {
        case -2:
          result = this.$t('Активно продавать')
          break
        case -1:
          result = this.$t('Продавать')
          break
        case 0:
          result = this.$t('Подождать')
          break
        case 1:
          result = this.$t('Покупать')
          break
        case 2:
          result = this.$t('Активно покупать')
          break
      }
      return result
    },
    getSummaryClass (summary) {
      let result
      switch (summary) {
        case -2:
        case -1:
          result = '-red'
          break
        case 0:
          result = '-gray'
          break
        case 1:
        case 2:
          result = '-green'
          break
      }
      return result
    }
  }
}
</script>
