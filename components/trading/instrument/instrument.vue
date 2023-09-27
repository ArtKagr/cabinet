<template>
  <div class="current_instrument">
    <div v-if="isHeaderShown" class="current_instrument-head">
      <div class="current_instrument-head-info">
        <div class="current_instrument-head-info-arrow" :class="`-${dir}`" @click="backToList">
          <lfx-icon-arrow-back />
        </div>
        <lfx-symbol class="current_instrument-head-info-symbol" :class="`-${dir}`" :large="true" :symbol="currentSymbol" />
        <span class="current_instrument-head-info-name" :class="`-${dir}`" v-text="currentSymbol" />
        <div v-if="tradingCard && tradingCard.symbol_original" class="current_instrument-head-info-favorite" :class="`-${dir}`" @click="toggleFavorite(!isFavorite(tradingCard))">
          <lfx-icon-star v-if="isFavorite(tradingCard)" class="current_instrument-head-info-favorite-star" />
          <lfx-icon-star-empty v-else class="current_instrument-head-info-favorite-star_empty" />
        </div>
      </div>
      <lfx-menu :menu="menu" :active-item="activeItem" class="current_instrument-head-menu" source="trading" @click-handler="clickHandler" />
    </div>
    <div v-else class="current_instrument-chart_head" :class="isHeaderShown ? '' : '-chart_shown'">
      <div class="current_instrument-chart_head-icons">
        <div class="current_instrument-chart_head-icons-arrow -chart_shown" :class="`-${dir}`" @click="backToList">
          <lfx-icon-arrow-back />
        </div>
        <div class="current_instrument-chart_head-icons-button -chart_shown" @click="toggleFavorite(!isFavorite(tradingCard))">
          <lfx-icon-star v-if="isFavorite(tradingCard)" class="current_instrument-chart_head-icons-button-star" />
          <lfx-icon-star-empty v-else class="current_instrument-chart_head-icons-star_empty" />
        </div>
      </div>
      <lfx-menu
        :menu="menu"
        :active-item="activeItem"
        class="current_instrument-chart_head-menu"
        :class="`-${dir}`"
        source="trading"
        @click-handler="clickHandler"
      />
    </div>
    <div class="current_instrument-content" :class="`-${activeItem}`">
      <trading-chart
        v-if="activeItem === 'chart'"
        :key="chartRandomKey"
        class="current_instrument-content-chart"
        :class="`-${dir}`"
        :instrument="currentInstrument"
        :card="tradingCard"
      />
      <template v-if="currentInstrument && currentInstrument.symbol && source === 'tab'">
        <information v-if="activeItem === 'info'" class="current_instrument-content-info" :class="`-${dir}`" :instrument="currentInstrument" :card="tradingCard" />
        <analytics v-else-if="activeItem === 'analytics'" :instrument="currentInstrument" />
      </template>
    </div>
  </div>
</template>

<script>
import LfxIconArrowBack from '~/components/icons/lfx-icon-arrow-back.vue'
import LfxIconStar from '~/components/icons/lfx-icon-star.vue'
import LfxIconStarEmpty from '~/components/icons/lfx-icon-star-empty.vue'
import LfxMenu from '~/components/_aux/lfx-menu.vue'
import LfxSymbol from '~/components/_aux/lfx-symbol.vue'
import TradingChart from '~/components/trading/instrument/chart.vue'
import Information from '@/components/trading/instrument/information/information.vue'
import Analytics from '@/components/trading/instrument/analytics/analytics.vue'

export default {
  name: 'Instrument',
  components: {
    LfxIconArrowBack,
    LfxIconStar,
    LfxIconStarEmpty,
    LfxMenu,
    LfxSymbol,
    TradingChart,
    Information,
    Analytics
  },
  props: {
    source: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      activeItem: 'chart',
      domElement: '',
      currentArrow: '',
      prevQuote: null,
      chartRandomKey: null
    }
  },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](this.activeTabHead)
    }
  },
  computed: {
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isStock () {
      return ['cfd-nyse', 'cfd-nasdaq', 'sfd-epa'].includes(this.routePages.second)
    },
    currentSymbol () {
      return `${this.isStock ? '#' : ''}${this.routePages.third || this.routePages.current}`.toUpperCase()
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    menu () {
      return [
        { title: this.$t('График'), route: null, flag: 'chart' },
        { title: this.$t('Информация об инструменте'), route: null, flag: 'info' },
        { title: this.$t('Аналитика'), route: null, flag: 'analytics' }
      ]
    },
    isHeaderShown () {
      if (this.$store.getters['chat/getters/handler/getIsChatSidebarOpen']) {
        return true
      } else if (!['sm'].includes(this.windowWidth)) {
        return true
      } else {
        return this.activeItem !== 'chart'
      }
    },
    activeTabHead () {
      let result
      const priceChange = `${this.tradingCard.priceChange}%`
      switch (this.activeItem) {
        case 'chart':
          result = this.$t('График')
          break
        case 'info':
          result = this.$t('Информация об инструменте')
          break
        case 'analytics':
          result = this.$t('Аналитика')
          break
      }
      return this.currentSymbol ? `${this.currentSymbol}${this.activeItem === 'chart' ? this.tradingCard.bid && this.prevQuote ? `: ${this.tradingCard.bid} ${this.currentArrow} ${priceChange}` : '' : ''} | ${result}` : result
    },
    instruments () {
      if (this.account.server && this.account.group) {
        return Object.values(this.$store.getters['trading/getters/trading/getInstruments'][this.account.server][this.account.group])
      } else {
        return []
      }
    },
    currentInstrument () {
      if (this.instruments.length) {
        return this.instruments.find(instrument => instrument.symbol_original === this.currentSymbol)
      } else {
        return { category: null, symbol_original: null }
      }
    },
    tradingCard () {
      if (this.currentInstrument && this.currentInstrument.category && this.currentInstrument.symbol_original) {
        return this.$store.getters['trading/getters/trading/getTradingCard'](this.currentInstrument.category, this.currentInstrument.symbol_original)
      } else {
        return { bid: 0, ask: 0, priceChange: 0 }
      }
    }
  },
  watch: {
    'currentInstrument.symbol' (newValue) {
      if (newValue) {
        this.fetchTradingInstrument(newValue)
      }
    },
    'tradingCard.bid' (newValue, oldValue) {
      this.prevQuote = oldValue
      this.domElement.innerHTML = newValue > oldValue ? '&#9650' : '&#9660'
      this.currentArrow = this.domElement.value
    },
    'routePages.current' () {
      this.chartRandomKey = Math.floor(Math.random() * 1000000)
    }
  },
  created () {
    this.chartRandomKey = Math.floor(Math.random() * 1000000)
    if (this.routePages.third && this.routePages.current) {
      this.activeItem = this.routePages.current
    }
  },
  mounted () {
    this.domElement = document.createElement('textarea')

    this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_ITEM', {
      rootData: this.$store.state.dictionaries.state.handler,
      data: 'chart'
    })
  },
  destroyed () {
    this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_LINKS_ITEM', {
      rootData: this.$store.state.dictionaries.state.handler,
      data: this.routePages.current
    })
  },
  methods: {
    backToList () {
      this.$router.push(`/${this.routePages.locale}/trading/${this.routePages.second}`)
    },
    fetchTradingInstrument (symbol) {
      this.$store.dispatch('trading/actions/handler/fetchTradingInstrument', {
        server: this.account.server,
        group: this.account.group,
        symbol
      })
    },
    async toggleFavorite (flag) {
      await this.$store.dispatch('trading/actions/handler/toggleFavoriteInstrument', {
        symbol: this.currentInstrument.symbol_original,
        isFavorite: flag
      })
    },
    isFavorite (card) {
      return this.$store.getters['trading/getters/trading/getTrading'].favorite.includes(card.symbol_original)
    },
    toggleChartShown (flag) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_CHART_SHOWN_FLAG', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: flag
      })
    },
    clickHandler (item) {
      this.activeItem = item
      if (item === 'chart') {
        this.$router.push(`/${this.routePages.locale}/trading/${this.routePages.second}/${this.routePages.third}`)
        this.toggleChartShown(true)
      } else if (!this.routePages.third) {
        this.$router.push(`/${this.routePages.locale}/trading/${this.routePages.second}/${this.routePages.current}/${item}`)
        this.toggleChartShown(false)
      } else {
        this.$router.push(`/${this.routePages.locale}/trading/${this.routePages.second}/${this.routePages.third}/${item}`)
        this.toggleChartShown(false)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .current_instrument {
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 767px) {
      overflow: hidden;
    }

    &-head {
      display: flex;
      flex-direction: column;
      padding: 20px 30px 5px;
      margin-bottom: 10px;

      @media screen and (max-width: 767px) {
        background-color: white;
        padding: 10px 10px 0;
        border-top: 1px solid #eaeced;
        border-bottom: 1px solid #eaeced;
      }

      &-info {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        &-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          cursor: pointer;

          &.-ltr {
            margin-right: 5px;
          }

          &.-rtl {
            margin-left: 5px;
            transform: rotate(180deg);
          }

          svg {
            width: 16px;
            height: 16px;
            fill: #8e9aac;
          }
        }

        &-symbol {

          &.-ltr {
            margin-right: 15px;
          }

          &.-rtl {
            margin-left: 15px;
          }
        }

        &-name {
          font-size: 20px;
          color: #3B4B68;

          &.-ltr {
            margin-right: 10px;
          }

          &.-rtl {
            margin-left: 10px;
          }

          @media screen and (max-width: 767px) {
            font-size: 18px;
          }
        }

        &-favorite {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          cursor: pointer;

          &.-ltr {
            @media screen and (max-width: 767px) {
              margin-left: auto;
            }
          }

          &.-rtl {
            @media screen and (max-width: 767px) {
              margin-right: auto;
            }
          }

          svg {
            width: 20px;
            height: 20px;
          }
        }
      }

      &-menu {
        padding: 0;
        border: none;
      }
    }

    &-chart_head {
      width: 100%;
      height: 37px;
      background-color: white;
      margin-bottom: 10px;
      border-bottom: 1px solid #eaeced;

      &-icons {
        display: flex;
        align-items: center;

        &-arrow {
          display: flex;
          align-items: end;
          justify-content: center;
          width: 40px;
          height: 37px;
          cursor: pointer;
          padding-bottom: 6px;

          &.-rtl {

            svg {
              transform: rotate(180deg);
            }
          }

          svg {
            width: 16px;
            height: 16px;
            fill: #8e9aac;
          }
        }

        &-button {
          display: flex;
          align-items: end;
          justify-content: center;
          width: 40px;
          height: 37px;
          cursor: pointer;
          padding-bottom: 5px;

          svg {
            width: 20px;
            height: 20px;
          }
        }
      }

      &-menu {
        padding: 0;
        border: none;

        &.-ltr {
          transform: translate(90px, -25px);
        }

        &.-rtl {
          transform: translate(-90px, -25px);
        }
      }
    }

    &-content {
      display: flex;
      margin: 0 30px 35px;
      min-height: 664px;

      &.-info {
        @media screen and (max-width: 767px) {
          overflow: auto;
          margin: 0 0 10px;
        }
      }

      @media screen and (max-width: 767px) {
        margin: 0 0 40px;
      }

      &-chart {
        display: flex;
        align-items: center;
        width: 100%;

        @media screen and (max-width: 767px) {
          flex-direction: column;
        }
      }

      &-info {

        &.-ltr {
          @media screen and (max-width: 767px) {
            width: calc(100% - 10px);
            padding-right: 0 !important;
            margin: 0 !important;
            height: 100%;
          }
        }

        &.-rtl {
          @media screen and (max-width: 767px) {
            width: calc(100% - 10px);
            padding-left: 0 !important;
            margin: 0 !important;
            height: 100%;
          }
        }
      }
    }
  }
</style>
