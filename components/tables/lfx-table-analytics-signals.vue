<template>
  <b-table
    :fields="changedFields"
    :items="items"
    :class="`lfx-table -analytics_signals -${windowWidth}`"
    :thead-class="`lfx-table-head -analytics_signals -${windowWidth}`"
    :tbody-class="`lfx-table-body -analytics_signals -${windowWidth}`"
    :tbody-tr-class="`lfx-table-body-row -analytics_signals -${windowWidth}`"
  >
    <!-- Head -->
    <template #head(favorite)>
      <div />
    </template>
    <template #head(date_time)>
      <div />
    </template>
    <template #head(symbol)>
      <div />
    </template>
    <template #head(recommendations)>
      <div class="lfx-table-head-recommendations" :class="`-${dir}`" v-text="$t('Рекомендация')" />
    </template>
    <template #head(ma10)>
      <div class="lfx-table-head-signal_indicator" :class="`-${dir}`" v-text="'MA10'" />
    </template>
    <template #head(ma20)>
      <div class="lfx-table-head-signal_indicator" :class="`-${dir}`" v-text="'MA20'" />
    </template>
    <template #head(ma50)>
      <div class="lfx-table-head-signal_indicator" :class="`-${dir}`" v-text="'MA20'" />
    </template>
    <template #head(ma100)>
      <div class="lfx-table-head-signal_indicator" :class="`-${dir}`" v-text="'MA100'" />
    </template>
    <template #head(macd)>
      <div class="lfx-table-head-signal_indicator" :class="`-${dir}`" v-text="'MACD'" />
    </template>
    <template #head(bbands)>
      <div class="lfx-table-head-signal_indicator" :class="`-${dir}`" v-text="'BBANDS'" />
    </template>
    <template #head(ichimoku)>
      <div class="lfx-table-head-signal_indicator" :class="`-${dir}`" v-text="'ICHIMOKU'" />
    </template>
    <template #head(stochastic)>
      <div class="lfx-table-head-signal_indicator" :class="`-${dir}`" v-text="'STOCHASTIC'" />
    </template>
    <template #head(williams)>
      <div class="lfx-table-head-signal_indicator" :class="`-${dir}`" v-text="'WILLIAM`S'" />
    </template>
    <template #head(zigzag)>
      <div class="lfx-table-head-signal_indicator" :class="`-${dir}`" v-text="'ZIGZAG'" />
    </template>
    <!-- Rows -->
    <template #cell(favorite)="row">
      <div class="lfx-table-body-favorite">
        <lfx-icon-star v-if="row.item.favorite" class="pointer" @click.native="toggleFavorite($event, false, row.item.symbol)" />
        <lfx-icon-star-empty v-else class="pointer" @click.native="toggleFavorite($event, true, row.item.symbol)" />
      </div>
    </template>
    <template #cell(date_time)="row">
      <div class="lfx-table-body-date_time" :class="isRtlMode ? 'text-right' : ''" v-text="moment(row.item.date_time).format('HH:mm')" />
    </template>
    <template #cell(symbol)="row">
      <div class="d-flex align-items-center" @click="openInstrumentTrader(row.item)">
        <lfx-symbol :small="true" :class="isRtlMode ? 'ml-2' : 'mr-2'" :symbol="row.item.pair" />
        <div class="lfx-table-body-symbol" v-text="row.item.symbol" />
      </div>
    </template>
    <template #cell(recommendations)="row">
      <div :class="`lfx-table-body-recommendations -${row.item.recommendations} -${dir}`" v-text="getRecommendationsTitle(row.item.recommendations)" />
    </template>
    <template #cell(ma10)="row">
      <lfx-signal-indicator :indicator="row.item.ma10" />
    </template>
    <template #cell(ma20)="row">
      <lfx-signal-indicator :indicator="row.item.ma20" />
    </template>
    <template #cell(ma50)="row">
      <lfx-signal-indicator :indicator="row.item.ma50" />
    </template>
    <template #cell(ma100)="row">
      <lfx-signal-indicator :indicator="row.item.ma100" />
    </template>
    <template #cell(macd)="row">
      <lfx-signal-indicator :indicator="row.item.macd" />
    </template>
    <template #cell(bbands)="row">
      <lfx-signal-indicator :indicator="row.item.bbands" />
    </template>
    <template #cell(ichimoku)="row">
      <lfx-signal-indicator :indicator="row.item.ichimoku" />
    </template>
    <template #cell(stochastic)="row">
      <lfx-signal-indicator :indicator="row.item.stochastic" />
    </template>
    <template #cell(williams)="row">
      <lfx-signal-indicator :indicator="row.item.williams" />
    </template>
    <template #cell(zigzag)="row">
      <lfx-signal-indicator :indicator="row.item.zigzag" />
    </template>
  </b-table>
</template>

<script>
import moment from 'moment'
import LfxIconStar from '~/components/icons/lfx-icon-star'
import LfxIconStarEmpty from '~/components/icons/lfx-icon-star-empty'
import LfxSignalIndicator from '~/components/_aux/lfx-signal-indicator'
import LfxSymbol from '~/components/_aux/lfx-symbol'
export default {
  name: 'LfxTableAnalyticsSignals',
  components: {
    LfxSymbol,
    LfxSignalIndicator,
    LfxIconStar,
    LfxIconStarEmpty
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      moment,
      fields: ['favorite', 'date_time', 'symbol', 'recommendations', 'ma10', 'ma20', 'ma50', 'ma100', 'macd', 'bbands', 'ichimoku', 'stochastic', 'williams', 'zigzag']
    }
  },
  computed: {
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    changedFields () {
      return this.fields.map((field) => {
        return { key: field }
      })
    },
    tradingData () {
      return this.$store.getters['trading/getters/trading/getTrading']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  methods: {
    getRecommendationsTitle (title) {
      let result
      switch (title) {
        case 'sell_active':
          result = this.$t('Активно продавать')
          break
        case 'sell':
          result = this.$t('Продавать')
          break
        case 'neutral':
          result = this.$t('Подождать')
          break
        case 'buy_active':
          result = this.$t('Активно покупать')
          break
        case 'buy':
          result = this.$t('Покупать')
          break
      }
      return result
    },
    toggleFavorite (e, flag, payload) {
      e.stopPropagation()
      this.$store.dispatch('analytics/actions/handler/toggleFavoriteSignal', payload)
    },
    openInstrumentTrader (item) {
      this.$instrument.openInstrumentTrader(item)
    }
  }
}
</script>
