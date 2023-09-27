<template>
  <div class="trading-page-card" :class="isNoCardSettings ? '-no_settings' : ''">
    <div class="trading-page-card-chart_container" @click="openCurrentCard">
      <div class="trading-page-card-head" :class="`-${dir}`">
        <template v-if="isAuthUser || isDemoTour">
          <lfx-icon-star v-if="card.isFavorite" class="trading-page-card-head-star" :class="`-${dir}`" @click.native="toggleFavorite($event,false)" />
          <lfx-icon-star-empty v-else class="trading-page-card-head-star -empty" :class="`-${dir}`" @click.native="toggleFavorite($event,true)" />
        </template>
        <lfx-symbol-trading-card :symbol="card.symbol_original" />
        <span class="trading-page-card-head-title" :class="`-${dir}`" v-text="card.symbol_original" />
      </div>
      <div
        class="trading-page-card-data"
        :class="tradingCardSettings.chart ? '' : '-chart_is_hidden'"
      >
        <div class="trading-page-card-data-quote">
          <span class="trading-page-card-data-quote-value" :class="`-${dir}`" v-text="card.bid" />
          <span class="trading-page-card-data-quote-title" :class="`-${dir}`" v-text="$t('Котировка')" />
        </div>
        <div class="trading-page-card-data-change">
          <bdi
            v-if="card && card.priceChange !== 'Infinity'"
            class="trading-page-card-data-quote-value"
            :class="[card.priceChange > 0 ? '-success' : '-danger', `-${dir}`]"
            v-text="`${card.priceChange}%`"
          />
          <b-skeleton v-else />
          <span class="trading-page-card-data-quote-title" :class="`-${dir}`" v-text="`${$t('Изменение ({period})', { period: activePeriod })}`" />
        </div>
      </div>
      <div v-if="tradingCardSettings.chart" class="trading-page-card-chart" :class="`-${dir}`">
        <div class="trading-page-card-chart-line" :class="`-${dir}`">
          <sparkline :width="cardWidth" height="80">
            <sparklineCurve :data="card.chart" :limit="card.chart.length" :styles="chartStyle" />
          </sparkline>
        </div>
        <div class="trading-page-card-chart-base" />
        <div class="trading-page-card-chart -template" />
      </div>
    </div>
    <div v-if="tradingCardSettings.info" class="trading-page-card-info">
      <div class="trading-page-card-info-mood" :class="`-${dir}`">
        <div class="trading-page-card-info-mood-data">
          <span class="trading-page-card-info-mood-data-value" :class="[`-${dir}`, card.isMoodUp ? '-green' : '-red']" v-text="`${card.mood}%`" />
          <lfx-icon-arrow-up v-if="card.isMoodUp" class="trading-page-card-info-mood-data-arrow" />
          <lfx-icon-arrow-down v-else class="trading-page-card-info-mood-data-arrow" />
        </div>
        <span class="trading-page-card-info-mood-title" :class="`-${dir}`" v-text="$t('Настроение')" />
      </div>
      <div class="trading-page-card-info-volatility" :class="`-${dir}`">
        <span class="trading-page-card-info-volatility-value" :class="`-${dir}`" v-text="`${card.volatility}%`" />
        <span v-if="isRtlMode" class="trading-page-card-info-volatility-title" :class="`-${dir}`" v-text="activePeriod + ' ' + $t('Волатильность')" />
        <span v-else class="trading-page-card-info-volatility-title" :class="`-${dir}`" v-text="`${$t('Волатильность')} (${activePeriod})`" />
      </div>
      <div class="trading-page-card-info-spread">
        <span class="trading-page-card-info-spread-value" :class="`-${dir}`" v-text="card.spread" />
        <span class="trading-page-card-info-spread-title" :class="`-${dir}`" v-text="$t('Спред')" />
      </div>
    </div>
    <buttons v-if="tradingCardSettings.buttons" :card="card" :lot-min="card.lot_min" />
  </div>
</template>

<script>
import LfxIconStar from '~/components/icons/lfx-icon-star'
import LfxIconStarEmpty from '~/components/icons/lfx-icon-star-empty'
import LfxIconArrowDown from '~/components/icons/lfx-icon-arrow-down'
import LfxIconArrowUp from '~/components/icons/lfx-icon-arrow-up'
import LfxSymbolTradingCard from '~/components/_aux/lfx-symbol-trading-card'
import { CATEGORY_CURRENCY, CATEGORY_CRYPTO } from '~/plugins/trading/Constants'
import Buttons from '~/components/trading/card/buttons.vue'

export default {
  name: 'Card',
  components: {
    Buttons,
    LfxSymbolTradingCard,
    LfxIconArrowUp,
    LfxIconArrowDown,
    LfxIconStarEmpty,
    LfxIconStar
  },
  props: {
    card: {
      type: Object,
      default: () => {
        return {
          mood: 0,
          priceChange: 0,
          stat: [0, null, 0, 0, 0, 0, 0]
        }
      }
    }
  },
  data () {
    return {
      CATEGORY_CURRENCY,
      CATEGORY_CRYPTO,
      chartStyle: { stroke: '#93CEF3', fill: '#DCf0FB', fillOpacity: 1, strokeWidth: 2 }
    }
  },
  computed: {
    activePeriod () {
      return this.$store.getters['trading/getters/trading/getTrading'].period
    },
    isNoCardSettings () {
      return !Object.values(this.tradingCardSettings).some(setting => setting)
    },
    tradingCardSettings () {
      return this.$store.getters['trading/getters/handler/getTradingCardSettings']
    },
    hasPageVerScroll () {
      return this.$store.getters['dictionaries/getters/handler/getHasPageVerScroll']
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentTradingWindowWidth']
    },
    windowWidthNumber () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    },
    cardWidth () {
      let result
      const scrollWidth = this.hasPageVerScroll ? 0 : 4
      switch (this.windowWidth) {
        case 'xl':
        case 'lg':
          result = (this.windowWidthNumber / 4) - 63
          break
        case 'lg-md':
          result = (this.windowWidthNumber / 3) - 76
          break
        case 'md':
        case 'md-sm':
          result = (this.windowWidthNumber / 2) - 96
          break
        case 'sm':
          result = this.windowWidthNumber - 36 + (this.hasPageVerScroll ? 0 : 14)
          break
      }
      return `${result + scrollWidth}`
    },
    isAuthUser () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUser']
    },
    isDemoTour () {
      return this.$store.getters['dictionaries/getters/user/isDemoTour']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    currentInstrument () {
      return this.$store.getters['trading/getters/trading/getInstrumentFull']
    },
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  // watch: {
  //   'card.symbol_original' (newValue, oldValue) {
  //     if (newValue && newValue !== oldValue) {
  //       this.$router.push(`/${this.routePages.locale}/trading/${this.card.route}/${newValue}`)
  //     }
  //   }
  // },
  methods: {
    toggleFavorite (e, isFavorite) {
      e.stopPropagation()
      this.$store.dispatch('trading/actions/handler/toggleFavoriteInstrument', {
        symbol: this.card.symbol_original,
        isFavorite
      })
    },
    openCurrentCard () {
      const symbol = this.card.symbol_original.includes('#') ? this.card.symbol_original.substring(1) : this.card.symbol_original
      this.$store.dispatch('trading/actions/handler/fetchTradingInstrument', {
        server: this.account.server,
        group: this.account.group,
        symbol: this.card.symbol_original
      })
      this.$router.push(`/${this.routePages.locale}/trading/${this.card.page}/${symbol.toLowerCase()}`)
    }
  }
}
</script>
