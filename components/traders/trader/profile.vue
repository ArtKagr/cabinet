<template>
  <div class="profile-page-about_me">
    <div :class="`-${dir}`" class="profile-page-about_me-block">
      <div class="profile-page-about_me-container -about">
        <img v-if="user.avatar_url" :src="user.avatar_url" alt class="profile-page-about_me-avatar">
        <div v-else class="profile-page-about_me-avatar">
          <span v-if="user.avatar_name" class="text-white-20 font-weight-500" v-text="user.avatar_name" />
        </div>
        <span v-if="user.username" class="profile-page-about_me-name" v-text="source === 'user' ? `@${user.username}` : `${user.username}`" />
        <bdi
          v-if="user.username"
          class="profile-page-about_me-percent"
          :class="getProfitClass"
          v-text="source === 'user' ? `${traderData.profit}%` : `${user.profit}%`"
        />
        <span class="profile-page-about_me-label" v-text="$t('Доходность')" />
        <b-button
          v-if="traderProfitSharing || traderProfitSharing === 0"
          variant="secondary-badge"
          class="line-height-1"
          :class="traderAbout ? '' : 'mb-4'"
          style="padding: 0 15px; border-radius: 0; font-size: 10px;"
          v-text="`${$t('Комиссия')} ${traderProfitSharing}%`"
        />
        <b-button
          v-else-if="user.username"
          variant="secondary-badge"
          :style="{ padding: '0 15px', borderRadius: 0, fontSize: '10px', lineHeight: 1, marginBottom: '30px' }"
          v-text="$t('Недоступен для копирования')"
        />
        <div v-if="traderAbout" class="text-dark-primary-13 mt-4 mb-3 w-100" :class="isRtlMode ? 'text-right' : ''" v-html="traderAbout" />
        <div v-if="source === 'user'" class="profile-page-about_me-button">
          <b-button class="w-100 text-white-16" variant="primary" @click="showForm" v-text="$t('Редактировать')" />
        </div>
      </div>
      <div
        v-if="user.is_trader"
        class="profile-page-about_me-container -public_link"
        :style="['md', 'sm'].includes(windowWidth) ? 'margin-bottom: 20px;' : 'margin-top: 30px;'"
      >
        <div class="d-flex w-100">
          <div class="d-flex">
            <lfx-icon-link />
          </div>
          <div class="d-flex flex-column w-100" :class="isRtlMode ? 'mr-3' : 'ml-3'">
            <span class="text-dark-primary-15 line-height-1" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Публичная ссылка')" />
            <span class="text-secondary-13 mt-2" :class="isRtlMode ? 'text-right' : ''" v-text="`https://${copyLink}`" />
            <b-button
              class="mt-2"
              variant="outline-primary"
              @click="copyPublicLink"
              v-text="$t('Скопировать')"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column w-100" :style="windowWidth === 'sm' ? 'padding: 0 10px;' : ''">
      <div class="profile-page-about_me-container -summary">
        <lfx-circle-progress v-if="user.risk" class="profile-page-about_me-risk_bar" :class="`-${dir}`" :data-value="Number(user.risk)" />
        <span class="profile-page-about_me-title mb-4" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Общая сводка')" />
        <div class="profile-page-about_me-items">
          <div class="profile-page-about_me-item">
            <div v-if="user.country_name" class="d-flex align-items-center">
              <svg width="30" height="30" :class="isRtlMode ? 'ml-2' : 'mr-2'"><use :xlink:href="`#i-${user.country.toLowerCase()}`" v-html="currentCountry" /></svg>
              <span class="profile-page-about_me-item-value" :class="`-${dir}`" v-text="user.country_name" />
            </div>
            <span class="profile-page-about_me-item-label" :class="`-${dir}`" v-text="$t('Страна')" />
          </div>
          <div class="profile-page-about_me-item">
            <span v-if="user.username" class="profile-page-about_me-item-value" :class="`-${dir}`" v-text="daysCount" />
            <span class="profile-page-about_me-item-label" :class="`-${dir}`" v-text="$t('История')" />
          </div>
          <div v-if="source === 'user'" class="profile-page-about_me-item">
            <span v-if="user.username" class="profile-page-about_me-item-value" :class="`-${dir}`" v-text="`${$numberFormat(user.account_margin_free, 2)} ${user.account_currency}`" />
            <span class="profile-page-about_me-item-label" :class="`-${dir}`" v-text="$t('Мои средства')" />
          </div>
          <div v-if="source === 'trader'" class="profile-page-about_me-item">
            <bdi v-if="user.username" class="profile-page-about_me-item-value" :class="`-${dir}`" v-text="roundingNumber(user.trader_equity)" />
            <span class="profile-page-about_me-item-label" :class="`-${dir}`" v-text="$t('Свои средства')" />
          </div>
          <div v-if="source === 'trader'" class="profile-page-about_me-item">
            <bdi v-if="user.username" class="profile-page-about_me-item-value" :class="`-${dir}`" v-text="roundingNumber(user.investors_equity)" />
            <span class="profile-page-about_me-item-label" :class="`-${dir}`" v-text="$t('Средства копирующих')" />
          </div>
          <div v-if="source === 'trader'" class="profile-page-about_me-item">
            <span v-if="user.username" class="profile-page-about_me-item-value" :class="`-${dir}`" v-text="user.investors_count" />
            <span class="profile-page-about_me-item-label" :class="`-${dir}`" v-text="$t('Кол-во копирующих')" />
          </div>
        </div>
      </div>
      <div class="profile-page-about_me-container -indicators">
        <div class="d-flex align-items-center">
          <span v-if="windowWidth !== 'sm'" class="profile-page-about_me-title" :class="isRtlMode ? 'ml-4' : 'mr-4'" v-text="$t('Показатели за год:')" />
          <lfx-menu
            class="p-0"
            marginless
            :menu="menu"
            source="profile-indicators"
            no-route
            static-menu
          />
        </div>
        <div v-if="source === 'user' && !user.is_trader && activeMenuItem === 'investors'" class="profile-page-about_me-container-investors_info">
          <span
            class="profile-page-about_me-container-investors_info-text"
            v-html="$t('Для того, чтобы другие трейдеры могли копировать Ваши сделки, сделайте счет <a class={class} @click={openModal}>публичным</a>', { class: 'profile-page-about_me-container-investors_info-text -link', openModal: showForm })"
          />
        </div>
        <div v-else class="profile-page-about_me-container-indicators_container">
          <div
            v-for="(bar, key) in traderBars"
            :key="key"
            class="profile-page-about_me-container-indicators_container-item"
            :class="`-${dir}`"
          >
            <div v-if="windowWidth === 'sm'" class="d-flex align-items-center justify-content-between w-100">
              <div class="profile-page-about_me-container-indicators_container-item-date -mobile">
                <span class="profile-page-about_me-container-indicators_container-item-date-month" :class="isRtlMode ? 'ml-1' : 'mr-1'" v-text="moment(bar.month).format('MMMM')" />
                <span class="profile-page-about_me-container-indicators_container-item-date-year" v-text="moment(bar.month).format('YYYY')" />
              </div>
              <span
                class="profile-page-about_me-container-indicators_container-item-title -mobile"
                :class="(bar.profit > 0 && activeMenuItem === 'profit') ? '-positive' : (bar.profit < 0 && activeMenuItem === 'profit') ? '-negative' : ''"
                v-text="getActiveData(bar)"
              />
            </div>
            <bdi
              class="profile-page-about_me-container-indicators_container-item-title -desktop"
              :class="(bar.profit > 0 && activeMenuItem === 'profit') ? '-positive' : (bar.profit < 0 && activeMenuItem === 'profit') ? '-negative' : ''"
              v-text="getActiveData(bar)"
            />
            <div class="profile-page-about_me-container-indicators_container-item-body">
              <template v-if="activeMenuItem === 'profit'">
                <div class="profile-page-about_me-container-indicators_container-item-body-positive_container">
                  <div
                    class="profile-page-about_me-container-indicators_container-item-body-positive_container-value"
                    :style="getBarValue(bar, 'profit', bar[activeMenuItem] > 0 ? 'positive' : null)"
                  />
                </div>
                <div
                  class="profile-page-about_me-container-indicators_container-item-body-border"
                  :class="key === 11 ? '-last' : ''"
                />
                <div class="profile-page-about_me-container-indicators_container-item-body-negative_container">
                  <div
                    class="profile-page-about_me-container-indicators_container-item-body-negative_container-value"
                    :style="getBarValue(bar, 'profit', bar[activeMenuItem] < 0 ? 'negative' : null)"
                  />
                </div>
              </template>
              <div v-else-if="activeMenuItem === 'risk'" class="profile-page-about_me-container-indicators_container-item-body-risk_container">
                <div
                  class="profile-page-about_me-container-indicators_container-item-body-risk_container-value"
                  :style="getBarValue(bar, 'risk')"
                />
              </div>
              <div
                v-else-if="activeMenuItem === 'investors'"
                class="profile-page-about_me-container-indicators_container-item-body-investors_container"
              >
                <div
                  class="profile-page-about_me-container-indicators_container-item-body-investors_container-value"
                  :style="getBarValue(bar, 'investors')"
                />
              </div>
            </div>
            <div class="profile-page-about_me-container-indicators_container-item-date -desktop">
              <span class="profile-page-about_me-container-indicators_container-item-date-month" v-text="bar.month ? moment(bar.month).format('MMM') : ''" />
              <span class="profile-page-about_me-container-indicators_container-item-date-year" v-text="bar.month ? moment(bar.month).format('YYYY') : ''" />
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex w-100" :class="windowWidth === 'md' || windowWidth === 'sm' ? 'flex-column' : ''">
        <div v-if="currentTraderTrades" :class="`profile-page-about_me-container -tools-${dir}`">
          <span class="profile-page-about_me-title -pd" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Часто торгуемые инструменты')" />
          <div v-for="(trade, key) in currentTraderTrades" :key="key" class="popular_instrument border-top-light_secondary">
            <div class="d-flex align-items-center">
              <lfx-symbol-trading-card :symbol="trade.symbol_original" :class="isRtlMode ? 'ml-2' : 'mr-2'" />
              <div class="d-flex flex-column" :class="isRtlMode ? 'mr-3' : 'ml-3'">
                <span class="text-dark-primary-15 line-height-1 font-weight-500" :class="isRtlMode ? 'text-right' : ''" v-text="trade.symbol_original" />
                <span class="text-secondary-12" :class="isRtlMode ? 'text-right' : ''" v-text="trade.description" />
              </div>
            </div>
            <div class="d-flex flex-column my-auto" :class="isRtlMode ? 'mr-3' : 'ml-3'">
              <span class="text-dark-primary-15 line-height-1 font-weight-500" :class="isRtlMode ? 'text-right' : ''" v-text="trade.count" />
              <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Сделок')" />
            </div>
            <div class="d-flex flex-column my-auto">
              <span class="text-success-14 line-height-1 font-weight-500" :class="isRtlMode ? 'text-right' : ''" v-text="`${trade.positive}%`" />
              <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Прибыльных')" />
            </div>
          </div>
        </div>
        <div :class="['md', 'sm'].includes(windowWidth) ? 'w-100' : 'w-50'">
          <div v-if="currentTraderTradeTypes" class="profile-page-about_me-container -stat w-100">
            <span class="profile-page-about_me-title mb-4" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Распределение по инструментам')" />
            <div class="profile-page-about_me-container-scale">
              <div
                v-for="(type, key) in currentTraderTradeTypesList"
                :key="key"
                :class="`profile-page-about_me-container-symbol -${type[0]}`"
                :style="`width: ${type[1]}%`"
              />
            </div>
            <div class="d-flex align-items-center flex-wrap">
              <div
                v-for="(type, key) in currentTraderTradeTypesList"
                :key="key"
                class="d-flex align-items-end mb-2"
                :class="[isRtlMode ? 'ml-4' : 'mr-4', windowWidth === 'md' || windowWidth === 'sm' ? 'mb-3' : '']"
              >
                <div :class="`profile-page-about_me-container-symbol -${type[0]} -label -${dir}`" />
                <div class="d-flex flex-column">
                  <span class="text-dark-primary-14 font-weight-500" :class="isRtlMode ? 'text-right' : ''" v-text="`${type[1].toFixed(1)}%`" />
                  <span class="text-secondary-10 text-uppercase line-height-1" :class="isRtlMode ? 'text-right' : ''" v-text="instrumentTypes[type[0]]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import LfxCircleProgress from '@/components/_aux/lfx-circle-progress.vue'
import LfxMenu from '@/components/_aux/lfx-menu.vue'
import LfxIconLink from '@/components/icons/lfx-icon-link.vue'
import LfxSymbolTradingCard from '@/components/_aux/lfx-symbol-trading-card.vue'
export default {
  name: 'Profile',
  components: {
    LfxSymbolTradingCard,
    LfxIconLink,
    LfxMenu,
    LfxCircleProgress
  },
  props: {
    source: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      moment
    }
  },
  computed: {
    instrumentTypes () {
      return {
        currency: this.$t('Валюты'),
        crypto: this.$t('Криптовалюты'),
        commodities: this.$t('Сырье'),
        'cfd-nyse': this.$t('Акции {exchange_name}', { exchange_name: 'NYSE' }),
        'cfd-nasdaq': this.$t('Акции {exchange_name}', { exchange_name: 'NASDAQ' }),
        'cfd-eu': this.$t('Акции {exchange_name}', { exchange_name: 'EU' }),
        index: this.$t('Биржевые индексы')
      }
    },
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    countrySymbols () {
      return this.$store.getters['symbols/getters/handler/countries']
    },
    currentCountry () {
      if (this.user && this.user.country) {
        return this.countrySymbols[this.user.country.toLowerCase()]
      } else {
        return this.countrySymbols.au
      }
    },
    getProfitClass () {
      return this[this.source === 'user' ? 'traderData' : 'user'].profit > 0 ? 'text-success-36' : this.traderData.profit < 0 ? 'text-danger-36' : 'text-dark-primary-36'
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    activeMenuItem () {
      return this.$store.getters['profile/getters/handler/getProfileIndicatorsActiveMenuItem']
    },
    traderData () {
      return this.$store.getters['profile/getters/handler/getTraderData']
    },
    traderProfitSharing () {
      if (this.source === 'user') {
        return this.$store.getters['profile/getters/handler/getTraderData'].profit_sharing
      } else {
        return this.$store.getters['traders/getters/handler/getCurrentTrader'].data.profit_sharing
      }
    },
    traderAbout () {
      if (this.source === 'user') {
        return this.$store.getters['profile/getters/handler/getTraderData'].about
      } else {
        return this.$store.getters['traders/getters/handler/getCurrentTrader'].data.about
      }
    },
    traderBars () {
      if (this.source === 'user') {
        return this.$store.getters['profile/getters/handler/getTraderBars']
      } else {
        return this.$store.getters['traders/getters/handler/getCurrentTrader'].bars
      }
    },
    traderTrades () {
      return this.$store.getters['profile/getters/handler/getTraderTrades']
    },
    menu () {
      return [
        { title: this.$t('Доходность'), route: null, flag: 'profit' },
        { title: this.$t('Риск'), route: null, flag: 'risk' },
        { title: this.$t('Копируют'), route: null, flag: 'investors' }
      ].filter((item) => {
        if (this.source === 'trader') {
          return true
        } else if (this.user.is_trader) {
          return item.flag === 'profit'
        } else {
          return item.flag !== 'risk'
        }
      })
    },
    daysCount () {
      return this.$pluralize(this[this.source === 'user' ? 'traderData' : 'user'].days, [this.$t('день'), this.$t('дня'), this.$t('дней')])
    },
    user () {
      if (this.source === 'user') {
        return this.$store.getters['dictionaries/getters/user/getUser']
      } else {
        return this.$store.getters['traders/getters/handler/getCurrentTrader'].data
      }
    },
    currentTrader () {
      return this.$store.getters['traders/getters/handler/getCurrentTrader']
    },
    currentTraderTrades () {
      if (this.source === 'user' && this.traderTrades && this.traderTrades.popularity && this.traderTrades.popularity.length) {
        return this.traderTrades.popularity
      } else if (this.currentTrader && this.currentTrader.trades && this.currentTrader.trades.popularity && this.currentTrader.trades.popularity.length) {
        return this.currentTrader.trades.popularity
      } else {
        return null
      }
    },
    currentTraderTradeTypes () {
      if (this.source === 'user' && this.traderTrades && this.traderTrades.type && this.traderTrades.type.total) {
        return this.traderTrades.type
      } else if (this.currentTrader && this.currentTrader.trades && this.currentTrader.trades.type && this.currentTrader.trades.type.total) {
        return this.currentTrader.trades.type
      } else {
        return null
      }
    },
    currentTraderTradeTypesList () {
      return this.currentTraderTradeTypes ? Object.entries(this.currentTraderTradeTypes.list) : []
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    copyLink () {
      return `${document.location.host}/${this.routePages.locale}/traders/${this.user.id}`
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  async created () {
    switch (this.source) {
      case 'user':
        await this.$store.dispatch('profile/actions/handler/fetchProfileAboutPage')
        await this.$store.dispatch('dictionaries/actions/auth/fetchRealUser')
        break
      case 'trader':
        if (this.routePages.second && this.routePages.current) {
          await this.$store.dispatch('traders/actions/handler/fetchCurrentTrader', this.routePages.second)
        } else {
          await this.$store.dispatch('traders/actions/handler/fetchCurrentTrader', this.routePages.current)
        }
        break
    }
  },
  destroyed () {
    this.$store.commit('profile/mutations/handler/SET_PROFILE_INDICATORS_ACTIVE_MENU_ITEM', {
      rootData: this.$store.state.profile.state.handler,
      data: 'profit'
    })
  },
  methods: {
    currentNumberFormat (payload) {
      return this.$numberFormat(payload)
    },
    copyPublicLink () {
      navigator.clipboard.writeText(this.copyLink)
      this.$store.dispatch('dictionaries/actions/handler/openSuccessToast', { description: this.$t('Ссылка успешно скопирована') })
    },
    showForm () {
      this.$store.dispatch('forms/actions/handler/fetchForm', 'traderEdit')
    },
    roundingNumber (value) {
      let multiply = Math.round(value).toString().split('')
      multiply.pop()
      multiply.pop()
      multiply = Number(multiply.map((item, index) => index === 0 ? 1 : 0).join(''))
      return `~${this.$numberFormat(Math.round(value / multiply) * multiply, 0)} ${this.user.currency}`
    },
    getActiveData (value) {
      if (this.activeMenuItem === 'profit') {
        return value.profit === null ? '' : `${value.profit}%`
      } else {
        return value[this.activeMenuItem]
      }
    },
    getBarValue (value, barType, barValueType) {
      const maxValue = JSON.parse(JSON.stringify(this.traderBars)).reduce((preVal, bar) => {
        if (preVal[this.activeMenuItem] < Math.abs(bar[this.activeMenuItem])) {
          preVal[this.activeMenuItem] = Math.abs(bar[this.activeMenuItem])
        }
        return preVal
      }, { profit: 0, risk: 0, investors: 0 })
      let backgroundColor
      switch (barType) {
        case 'profit':
          backgroundColor = barValueType === 'positive' ? '#47bf6f80' : barValueType === 'negative' ? '#ff4b5f80' : null
          break
        case 'investors':
          backgroundColor = '#eaeced'
          break
        case 'risk':
          switch (value.risk) {
            case 1:
            case '1':
            case 2:
            case '2':
              backgroundColor = '#64dd17'
              break
            case 3:
            case '3':
              backgroundColor = '#aeea00'
              break
            case 4:
            case '4':
              backgroundColor = '#c6ff00'
              break
            case 5:
            case '5':
              backgroundColor = '#fff700'
              break
            case 6:
            case '6':
              backgroundColor = '#ffd600'
              break
            case 7:
            case '7':
              backgroundColor = '#ffab00'
              break
            case 8:
            case '8':
              backgroundColor = '#ff9100'
              break
            case 9:
            case '9':
              backgroundColor = '#ff6d00'
              break
            case 10:
            case '10':
              backgroundColor = '#ff3d00'
              break
          }
          break
      }
      const currentValue = this.activeMenuItem === 'risk' ? `${Number(value.risk) * 10}%` : `${100 / maxValue[this.activeMenuItem] * 0.9 * Math.abs(value[this.activeMenuItem])}%`
      return {
        width: this.windowWidth === 'sm' ? currentValue : '100%',
        height: this.windowWidth === 'sm' ? '100%' : maxValue[this.activeMenuItem] === 0 ? 0 : currentValue,
        backgroundColor
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.popular_instrument {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 19px 20px 20px;
}
</style>
