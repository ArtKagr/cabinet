<template>
  <b-table
    :fields="changedFields"
    :items="items"
    :class="`lfx-table -instruments -${windowWidth} -${dir}`"
    :thead-class="`lfx-table-head -instruments -${windowWidth}`"
    :tbody-class="`lfx-table-body -instruments -${windowWidth}`"
    :tbody-tr-class="`lfx-table-body-row -instruments -${windowWidth}`"
  >
    <!-- Head -->
    <template #head(favorite)>
      <div />
    </template>
    <template #head(symbol)>
      <div class="lfx-table-head-symbol -primary" :class="isRtlMode ? '-text_right' : '-text_left'" v-text="$t('Инструмент')" />
    </template>
    <template #head(quote)>
      <div class="lfx-table-head-quote" :class="isRtlMode ? '-text_right' : '-text_left'" v-text="$t('Котировка')" />
    </template>
    <template #head(change)>
      <div
        class="lfx-table-head-change"
        :class="isRtlMode ? '-text_right' : '-text_left'"
        v-text="windowWidth !== 'xl' ? $t('Изменение ({period})', { period: activePeriod }) : $t('Изм. ({period})', { period: activePeriod })"
      />
    </template>
    <template #head(chart)>
      <div class="lfx-table-head-chart" :class="isRtlMode ? '-text_right' : '-text_left'" v-text="$t('График')" />
    </template>
    <template #head(mood)>
      <div class="lfx-table-head-mood" :class="isRtlMode ? '-text_right' : '-text_left'" v-text="$t('Настроение')" />
    </template>
    <template #head(volatility)>
      <div class="lfx-table-head-volatility -primary" :class="isRtlMode ? '-text_right' : '-text_left'" v-text="$t('Волатильность')" />
    </template>
    <template #head(instrument_buttons)>
      <div class="lfx-table-head-instrument_buttons" :class="isRtlMode ? '-text_right' : '-text_left'" v-text="''" />
    </template>
    <!-- Rows -->
    <template #cell(favorite)="row">
      <div v-if="isAuthUser || isDemoTour" class="lfx-table-body-favorite">
        <lfx-icon-star v-if="row.item.isFavorite" class="pointer" @click.native="toggleFavorite($event, false, row.item.symbol_original)" />
        <lfx-icon-star-empty v-else class="pointer" @click.native="toggleFavorite($event, true, row.item.symbol_original)" />
      </div>
    </template>
    <template #cell(symbol)="row">
      <div class="d-flex align-items-center">
        <lfx-symbol :symbol="row.item.symbol_original" />
        <div class="lfx-table-body-symbol" :class="`-${dir}`" v-text="row.item.symbol_original" />
      </div>
    </template>
    <template #cell(quote)="row">
      <div class="lfx-table-body-quote" :class="`-${dir}`" v-text="row.item.bid" />
    </template>
    <template #cell(change)="row">
      <div
        class="lfx-table-body-change"
        :class="[`-${dir}`, row.item.priceChange > 0 ? '-green' : '-red']"
        v-text="`${row.item.priceChange}%`"
      />
    </template>
    <template #cell(chart)="row">
      <div class="trading-page-card-chart -table mt-2">
        <div class="trading-page-card-chart-line -table">
          <sparkline :width="240" height="50">
            <sparklineCurve :data="row.item.chart" :limit="row.item.chart.length" :styles="chartStyle" />
          </sparkline>
        </div>
        <div class="trading-page-card-chart-base -table" />
      </div>
    </template>
    <template #cell(mood)="row">
      <div class="d-flex align-items-center">
        <div class="mr-2">
          <lfx-icon-arrow-up v-if="row.item.isMoodUp" class="trading-page-card-info-mood-data-arrow" />
          <lfx-icon-arrow-down v-else class="trading-page-card-info-mood-data-arrow" />
        </div>
        <div class="lfx-table-body-mood" :class="row.item.isMoodUp ? '-green' : '-red'" v-text="`${row.item.mood}%`" />
      </div>
    </template>
    <template #cell(volatility)="row">
      <div class="lfx-table-body-volatility -trading" :class="`-${dir}`" v-text="`${row.item.volatility}%`" />
    </template>
    <template #cell(instrument_buttons)="row">
      <div class="lfx-table-body-trading_buttons">
        <buttons :card="row.item" />
      </div>
    </template>
  </b-table>
</template>

<script>
import moment from 'moment'
import LfxIconArrowDown from '~/components/icons/lfx-icon-arrow-down'
import LfxIconArrowUp from '~/components/icons/lfx-icon-arrow-up'
import LfxIconStar from '~/components/icons/lfx-icon-star'
import LfxIconStarEmpty from '~/components/icons/lfx-icon-star-empty'
import LfxSymbol from '~/components/_aux/lfx-symbol'
import Buttons from '~/components/trading/card/buttons.vue'

export default {
  name: 'LfxTableTrading',
  components: {
    Buttons,
    LfxSymbol,
    LfxIconStar,
    LfxIconStarEmpty,
    LfxIconArrowDown,
    LfxIconArrowUp
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      moment,
      chartStyle: { stroke: '#93CEF3', fill: '#DCf0FB', fillOpacity: 1, strokeWidth: 2 },
      fields: ['favorite', 'symbol', 'quote', 'change', 'chart', 'mood', 'volatility', 'instrument_buttons']
    }
  },
  computed: {
    isDemoTour () {
      return this.$store.getters['dictionaries/getters/user/isDemoTour']
    },
    isAuthUser () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUser']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    changedFields () {
      return this.fields.filter((field) => {
        let result = true
        switch (this.windowWidth) {
          case 'md':
            switch (field) {
              case 'chart':
              case 'instrument_buttons':
                result = false
                break
            }
            break
          case 'sm':
            switch (field) {
              case 'chart':
              case 'instrument_buttons':
              case 'mood':
              case 'volatility':
                result = false
                break
            }
        }
        return result
      }).map((field) => { return { key: field } })
    },
    activePeriod () {
      return this.$store.getters['trading/getters/trading/getTrading'].period
    }
  },
  methods: {
    toggleFavorite (e, flag, payload) {
      e.stopPropagation()
      this.$store.dispatch('trading/actions/handler/toggleFavoriteInstrument', {
        symbol: payload,
        isFavorite: flag
      })
    }
  }
}
</script>
