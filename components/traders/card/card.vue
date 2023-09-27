<template>
  <div class="trading-page-card" :class="isNoCardSettings ? '-no_settings' : ''">
    <div class="d-flex flex-column" @click="openCurrentTrader(card)">
      <div class="trading-page-card-head w-100" :class="[`-${dir}`, settings.chart ? '' : '-chart_is_hidden']">
        <template v-if="isAuthUser || isDemoTour">
          <lfx-icon-star v-if="card.favorite" class="trading-page-card-head-star" :class="`-${dir}`" @click.native="toggleFavorite($event, card.user_id)" />
          <lfx-icon-star-empty v-else class="trading-page-card-head-star -empty" :class="`-${dir}`" @click.native="toggleFavorite($event, card.user_id)" />
        </template>
        <img
          v-if="card.avatar_url"
          class="trading-page-card-head-trader_logo"
          :class="`-${dir}`"
          :src="card.avatar_url"
          alt
        >
        <div v-else class="trading-page-card-head-trader_logo" :class="`-${dir}`">
          <span v-if="card.avatar_name" class="text-uppercase" v-text="card.avatar_name" />
        </div>
        <div class="d-flex flex-column" :class="isRtlMode ? 'pl-2' : 'pr-2'" style="width: calc(100% - 100px)">
          <span class="trading-page-card-head-title text-capitalize w-100" :class="isRtlMode ? 'text-right' : ''" v-text="card.username" />
          <div class="d-flex align-items-end justify-content-between mt-2">
            <div class="d-flex flex-column">
              <bdi
                class="mb-1 line-height-1"
                :class="[isRtlMode ? 'text-right' : '', card.profit > 0 ? 'text-success-28' : card.profit < 0 ? 'text-danger-28' : 'text-dark-primary-28']"
                v-text="`${card.profit}%`"
              />
              <span class="trading-page-card-data-quote-title" :class="`-${dir}`" v-text="`${$t('Доходность')} (${activePeriod})`" />
            </div>
            <div class="d-flex flex-column">
              <lfx-circle-progress :data-value="Number(card.risk)" />
              <span class="trading-page-card-data-quote-title text-center" v-text="$t('Риск')" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="settings.chart" class="trading-page-card-chart mt-2" :class="`-${dir}`">
        <div class="trading-page-card-chart-line" :class="`-${dir}`">
          <sparkline :width="cardWidth" height="80">
            <sparklineCurve :data="card.graph" :limit="card.graph.length" :styles="chartStyle" />
          </sparkline>
        </div>
        <div class="trading-page-card-chart-base" />
        <div class="trading-page-card-chart -template" />
      </div>
    </div>
    <div v-if="settings.info" class="trading-page-card-info justify-content-between">
      <div class="trading-page-card-info-mood">
        <div class="trading-page-card-info-mood-data">
          <span class="trading-page-card-info-mood-data-value" :class="`-${dir}`" v-text="card.investors_count" />
        </div>
        <span
          class="trading-page-card-info-mood-title"
          :class="`-${dir}`"
          v-text="$pluralize(card.investors_count, [$t('трейдер копирует'), $t('трейдера копируют'), $t('трейдеров копируют')])"
        />
      </div>
      <div class="trading-page-card-info-mood">
        <div class="trading-page-card-info-mood-data">
          <bdi class="trading-page-card-info-mood-data-value" :class="`-${dir}`" v-text="getInvestorsEquity" />
        </div>
        <span class="trading-page-card-info-mood-title" :class="`-${dir}`" v-text="$t('В управлении')" />
      </div>
    </div>
    <buttons v-if="settings.buttons" :card="card" source="card" @click.native="$event.stopPropagation()" />
  </div>
</template>

<script>
import LfxCircleProgress from '~/components/_aux/lfx-circle-progress.vue'
import LfxIconStar from '~/components/icons/lfx-icon-star.vue'
import LfxIconStarEmpty from '~/components/icons/lfx-icon-star-empty.vue'
import Buttons from '~/components/traders/card/buttons.vue'
export default {
  name: 'Card',
  components: { LfxCircleProgress, Buttons, LfxIconStarEmpty, LfxIconStar },
  props: {
    card: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      cardVolume: 100,
      chartStyle: { stroke: '#93CEF3', fill: '#DCf0FB', fillOpacity: 1, strokeWidth: 2 }
    }
  },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    activePeriod () {
      return this.$store.getters['trading/getters/trading/getTrading'].period
    },
    isNoCardSettings () {
      return !Object.values(this.settings).some(setting => setting)
    },
    settings () {
      return this.$store.getters['traders/getters/handler/getTraderCardSettings']
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
    getInvestorsEquity () {
      return `~${this.$numberFormat((Math.round((this.card.trader_equity + this.card.investors_equity) / 100) * 100), 0)} ${this.card.currency}`
    },
    isAuthUser () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUser']
    },
    isDemoTour () {
      return this.$store.getters['dictionaries/getters/user/isDemoTour']
    },
    currentTrader () {
      return this.$store.getters['traders/getters/handler/getCurrentTrader']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  watch: {
    'currentTrader.data.user_id' (newValue) {
      if (newValue) {
        this.$router.push(`/${this.routePages.locale}/traders/${newValue}`)
      }
    }
  },
  methods: {
    toggleFavorite (e, trader) {
      e.stopPropagation()
      this.$store.dispatch('traders/actions/handler/toggleFavoriteTrader', {
        source: 'list',
        trader
      })
    },
    clickHandler (value) {
      this.cardVolume = Number(Number(this.cardVolume + value))
    },
    blurHandler (value) {
      if (value === 0) {
        this.cardVolume = 100
      } else {
        this.cardVolume = Number(value)
      }
    },
    copyAction () {
      this.$store.dispatch('trading/actions/handler/copyAction', {
        id: this.card.user_id,
        amount: this.cardVolume
      })
    },
    openCurrentTrader (card) {
      this.$store.dispatch('traders/actions/handler/fetchCurrentTrader', card.user_id)
      this.$store.commit('traders/mutations/handler/SET_ACTIVE_TRADER_MENU_ITEM', {
        rootData: this.$store.state.traders.state.handler,
        data: this.routePages.current
      })
    }
  }
}
</script>
