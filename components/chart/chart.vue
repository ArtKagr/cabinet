<template>
  <div class="trading-page-instrument-chart pb-0" :class="[`-${dir}`, headerIsHidden ? '' : '-no_header']">
    <div id="chart" />
  </div>
</template>

<script>
import { chartInstance } from '@liteforex.com/lf-ui'
export default {
  name: 'Chart',
  props: {
    source: {
      type: String,
      default: 'chart'
    },
    instrument: {
      type: Object,
      default: () => {
        return {
          category: null,
          digits: 2,
          symbol_original: null
        }
      }
    },
    traderUserName: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      fullScreenButton: null,
      interval: null,
      domain: 'https://api.liteforex.com',
      templateId: null,
      stateId: null,
      lfChart: null
    }
  },
  computed: {
    userToken () {
      return this.$store.getters['dictionaries/getters/user/getUserToken']
    },
    user () {
      return this.$store.getters['dictionaries/getters/user/getUser']
    },
    isAuthUser () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUser']
    },
    isDemoTour () {
      return this.$store.getters['dictionaries/getters/user/isDemoTour']
    },
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    headerIsHidden () {
      return this.$store.getters['dictionaries/getters/handler/getHeaderIsHidden']
    },
    isTrader () {
      return this.source === 'chart-trader'
    },
    symbol () {
      switch (this.source) {
        case 'chart':
          return this.instrument.symbol_original
        case 'chart-trader':
          return this.traderUserName
        case 'chart-profile':
          return 'Profile'
        default:
          return null
      }
    },
    precision () {
      return this.source === 'chart' ? this.instrument.digits : 100
    },
    apiUrl () {
      return `${this.domain}/v3/${this.source}`
    },
    chartSymbolType () {
      return this.source === 'chart' ? this.$trading.getCategoryName(this.instrument.category) : undefined
    }
  },
  created () {
    this.toggleChartShown(true)

    const targetSymbol = localStorage.getItem('target_symbol')

    if (targetSymbol) {
      this.stateId = localStorage.getItem('state_id') || undefined
      this.templateId = localStorage.getItem('template_id') || undefined

      localStorage.removeItem('target_symbol')
    }

    if (this.stateId) {
      localStorage.removeItem('state_id')
    }

    if (this.templateId) {
      localStorage.removeItem('template_id')
    }
  },
  destroyed () {
    if (this.source === 'chart') {
      this.$store.dispatch('trading/actions/handler/chartUnsubscribe', {
        server: this.account.server,
        symbol: this.instrument.symbol_original
      })
    }
    this.toggleChartShown(false)
    chartInstance.destroyChartComponent()
  },
  async mounted () {
    await chartInstance.createChartComponent(
      '#chart',
      {
        isNative: false,
        isApi: true,
        isTrader: this.isTrader,
        isBet: this.account.isBet,
        source: this.source,
        domain: this.domain,
        locale: this.routePages.locale,
        symbol: this.symbol,
        symbolOriginal: this.symbol,
        userId: this.user.id,
        token: this.userToken,
        apiUrl: this.apiUrl,
        chartSymbolType: this.chartSymbolType,
        precision: this.precision,
        templateId: this.templateId,
        chartStateId: this.stateId,
        callbacks: {
          subscribePriceUpdates: (symbol) => {
            console.warn('subscribe price updates')
            if (this.source === 'chart') {
              this.$store.dispatch('trading/actions/handler/chartSubscribe', {
                server: this.account.server,
                symbol
              })
            }
          },
          unsubscribePriceUpdates: (symbol) => {
            console.warn('unsubscribe price updates')
            if (this.source === 'chart') {
              this.$store.dispatch('trading/actions/handler/chartUnsubscribe', {
                server: this.account.server,
                symbol
              })
            }
          },
          // eslint-disable-next-line camelcase
          openTrade: ({ login, symbol, volume, cmd, external_id, sl, tp }) => {
            console.warn('open trade')
            this.$store.dispatch('trading/actions/handler/openCurrentTrade', {
              server: this.account.server,
              login,
              symbol,
              volume,
              cmd,
              external_id,
              sl,
              tp
            })
          },
          updateTrade: ({ login, order, sl, tp }) => {
            console.warn('update trade')
            this.$store.dispatch('trading/actions/handler/changeCurrentTrade', {
              server: this.account.server,
              login,
              order,
              sl,
              tp
            })
          },
          closeTrade: ({ login, order }) => {
            console.warn('close trade')
            this.$store.dispatch('trading/actions/handler/closeCurrentTrade', {
              server: this.account.server,
              login,
              order
            })
          },
          sendTraderPersonalMessage: (traderId) => {
            this.openChatRoom(traderId)
          },
          openSupport: (traderId) => {
            this.openChatRoom(traderId)
          },
          openLogin: () => {
            this.fetchForm('login')
          },
          openRegistration: () => {
            this.fetchForm('registration')
          },
          intervalChanged: (interval) => {
            if (this.account.isBet) {
              this.interval = interval
              this.$store.dispatch('trading/actions/handler/tradingSignalsSymbol', {
                period: interval,
                symbol: this.$instrument.getOriginalSymbol(this.instrument.symbol_original)
              })
            }
          },
          showTraderStats: (traderId) => {
            window.open(`/${this.routePages.locale}/traders/${traderId}/info`)
          },
          openOtherSymbolWindow: (templateSymbol, templateData) => {
            this.openNewTabChart(templateSymbol, { templateId: templateData.id })
          },
          applyChartState: (targetChartStateId, targetChartStateSymbol, newTab) => {
            this.openNewTabChart(targetChartStateSymbol, { stateId: targetChartStateId })
          },
          onTradeOpen: () => {
            this.$store.dispatch('dictionaries/actions/handler/showPopup', 'trading-open-trade')
          },
          onCopyHeaderButtonClicked: () => {
            this.$store.dispatch('dictionaries/actions/handler/showPopup', 'traders-open-trade')
          },
          onFullscreenChange: () => {
            if (!document.fullscreenElement && this.lfChart) {
              this.lfChart.requestFullscreen().catch((err) => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`)
              })
            } else {
              document.exitFullscreen()
            }
          },
          onChartHistoryComplete: () => {
            this.lfChart = document.querySelector('.trading-page-instrument-chart')
          }
        }
      }
    )
  },
  methods: {
    openChatRoom (userId) {
      if (this.isAuthUser || this.isDemoTour) {
        this.$store.dispatch('chat/actions/handler/openCurrentRoom', { user_id: userId })
        this.$store.commit('chat/mutations/handler/TOGGLE_CHAT_SIDEBAR', { rootData: this.$store.state.chat.state.handler, data: true })
      } else {
        this.$store.dispatch('dictionaries/actions/handler/showPopup', 'register-yet')
      }
    },
    openNewTabChart (symbol, payload = { templateId: null, stateId: null }) {
      const instrument = this.$instrument.getInstrument(this.account.server, this.account.group, symbol)

      if (payload.templateId) {
        localStorage.setItem('target_symbol', symbol)
        localStorage.setItem('template_id', payload.templateId)
      }

      if (payload.stateId) {
        localStorage.setItem('target_symbol', symbol)
        localStorage.setItem('state_id', payload.stateId)
      }

      if (instrument) {
        const category = this.$trading.getCategoryName(instrument.category)
        window.open(`/${this.routePages.locale}/trading/${category}/${symbol}`)
      }
    },
    toggleChartShown (flag) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_CHART_SHOWN_FLAG', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: flag
      })
    }
  }
}
</script>
