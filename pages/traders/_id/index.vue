<template>
  <div class="current_trader">
    <div v-if="isHeaderShown" class="current_trader-header_container">
      <div class="current_trader-header">
        <div class="current_trader-header-main_data">
          <div class="current_trader-header-main_data-arrow" :class="`-${dir}`" @click="backToList">
            <lfx-icon-arrow-back />
          </div>
          <img v-if="currentTrader.data.avatar_url" class="current_trader-header-main_data-trader_logo" :src="currentTrader.data.avatar_url" alt>
          <div v-else class="current_trader-header-main_data-trader_logo -empty">
            <span v-text="currentTrader.data.avatar_name" />
          </div>
          <span class="current_trader-header-main_data-user_name" :class="`-${dir}`" v-text="currentTrader.data.username" />
        </div>
        <template v-if="isAuthUser">
          <div v-if="windowWidth === 'sm'" class="current_trader-header-buttons_mobile">
            <div class="current_trader-header-buttons_mobile-button" @click="openChat(currentTrader.data.user_id)">
              <lfx-icon-envelope class="current_trader-header-buttons_mobile-button-envelope" />
            </div>
            <div class="current_trader-header-buttons_mobile-button" @click="toggleFavorite(currentTrader.data.user_id)">
              <lfx-icon-star v-if="currentTrader.data.favorite" class="current_trader-header-buttons_mobile-button-star" />
              <lfx-icon-star-empty v-else class="current_trader-header-buttons_mobile-button-star_empty" />
            </div>
          </div>
          <div v-else class="current_trader-header-buttons_desktop">
            <div class="current_trader-header-buttons_desktop-button" @click="toggleFavorite(currentTrader.data.user_id)">
              <lfx-icon-star v-if="currentTrader.data.favorite" class="current_trader-header-buttons_desktop-button-star" />
              <lfx-icon-star-empty v-else class="current_trader-header-buttons_desktop-button-star_empty" />
            </div>
            <b-button class="current_trader-header-buttons_desktop-button_big" variant="outline-secondary" @click="openChat(currentTrader.data.user_id)">
              <div class="d-flex align-items-center">
                <lfx-icon-envelope class="current_trader-header-buttons_desktop-button_big-envelope" :class="`-${dir}`" />
                <span class="current_trader-header-buttons_desktop-button_big-text" v-text="$t('Написать сообщение')" />
              </div>
            </b-button>
          </div>
        </template>
      </div>
      <lfx-menu
        :menu="menu"
        :active-item="activeItem"
        class="current_trader-header-menu"
        source="trading"
        borderless
        no-route
        @click-handler="clickHandler"
      />
    </div>
    <div v-else class="current_trader-header_container_chart" :class="isHeaderShown ? '' : '-chart_shown'">
      <div class="current_trader-header_container_chart-icons">
        <div class="current_trader-header-main_data-arrow -chart_shown" :class="`-${dir}`" @click="backToList">
          <lfx-icon-arrow-back />
        </div>
        <div class="current_trader-header-buttons_mobile-button -chart_shown" @click="toggleFavorite(currentTrader.data.user_id)">
          <lfx-icon-star v-if="currentTrader.data.favorite" class="current_trader-header-buttons_mobile-button-star" />
          <lfx-icon-star-empty v-else class="current_trader-header-buttons_mobile-button-star_empty" />
        </div>
        <div class="current_trader-header-buttons_mobile-button -chart_shown" @click="openChat(currentTrader.data.user_id)">
          <lfx-icon-envelope class="current_trader-header-buttons_mobile-button-envelope" />
        </div>
      </div>
      <div class="current_trader-header_container_chart-links">
        <lfx-menu
          :menu="menu"
          :active-item="activeItem"
          source="trading"
          borderless
          no-route
          @click-handler="clickHandler"
        />
      </div>
    </div>
    <div class="current_trader-content" :class="isHeaderShown ? '' : '-chart_shown'">
      <trader-chart v-if="activeItem === 'chart'" :key="chartRandomKey" class="current_trader-content-chart" />
      <b-button v-if="!isHeaderShown" class="current_trader-content-button" variant="primary" v-text="$t('Копирование')" />
      <template v-if="source === 'tab'">
        <portfolio v-if="activeItem === 'trades'" @open-trader-chart="openTraderChart" />
        <history v-else-if="activeItem === 'trades-history'" @open-trader-chart="openTraderChart" />
        <Profile v-else-if="activeItem === 'info'" source="trader" />
      </template>
    </div>
  </div>
</template>
<script>
import LfxIconArrowBack from '~/components/icons/lfx-icon-arrow-back'
import LfxIconStar from '~/components/icons/lfx-icon-star'
import LfxIconStarEmpty from '~/components/icons/lfx-icon-star-empty'
import LfxIconEnvelope from '~/components/icons/lfx-icon-envelope'
import TraderChart from '~/components/traders/trader/chart.vue'
import Portfolio from '~/components/traders/trader/portfolio.vue'
import History from '~/components/traders/trader/history.vue'
import Profile from '~/components/traders/trader/profile'
import LfxMenu from '~/components/_aux/lfx-menu'
export default {
  name: 'CurrentTrader',
  components: {
    LfxMenu,
    Profile,
    History,
    Portfolio,
    TraderChart,
    LfxIconEnvelope,
    LfxIconStarEmpty,
    LfxIconStar,
    LfxIconArrowBack
  },
  data () {
    return {
      activeItem: 'chart',
      chartRandomKey: null
    }
  },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.currentTraderName || this.$t('Трейдер')} - ${this.activeMenuItemTitle}`)
    }
  },
  computed: {
    source () {
      return this.routePages.second ? 'tab' : 'trader'
    },
    isHeaderShown () {
      if (this.$store.getters['chat/getters/handler/getIsChatSidebarOpen']) {
        return true
      } else if (this.windowWidth !== 'sm') {
        return true
      } else {
        return !this.$store.getters['dictionaries/getters/handler/getIsChartShown']
      }
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentTradingWindowWidth']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    currentTrader () {
      return this.$store.getters['traders/getters/handler/getCurrentTrader']
    },
    currentTraderName () {
      return this.$store.getters['traders/getters/handler/getCurrentTrader'].data.username
    },
    currentInstrument () {
      return this.$store.getters['trading/getters/trading/getInstrumentFull']
    },
    menu () {
      return [
        { title: this.$t('График доходности'), route: null, flag: 'chart' },
        { title: this.$t('Портфель'), route: null, flag: 'trades' },
        { title: this.$t('История торговли'), route: null, flag: 'trades-history' },
        { title: this.$t('Информация о трейдере'), route: null, flag: 'info' }
      ]
    },
    activeMenuItemTitle () {
      return this.menu.find(item => item.flag === this.activeItem).title
    },
    activeTraderMenuItem () {
      return this.$store.getters['traders/getters/handler/getActiveTraderMenuItem']
    },
    isAuthUser () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUser']
    },
    isDemoTour () {
      return this.$store.getters['dictionaries/getters/user/isDemoTour']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  watch: {
    'routePages.current' () {
      this.chartRandomKey = Math.floor(Math.random() * 1000000)
    }
  },
  created () {
    this.chartRandomKey = Math.floor(Math.random() * 1000000)

    if (this.routePages.second && this.routePages.current) {
      this.$store.dispatch('traders/actions/handler/fetchCurrentTrader', this.routePages.second)
    } else {
      this.$store.dispatch('traders/actions/handler/fetchCurrentTrader', this.routePages.current)
    }
    if (this.routePages.second && this.routePages.current) {
      this.activeItem = this.routePages.current
    }
  },
  destroyed () {
    this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_LINKS_ITEM', {
      rootData: this.$store.state.dictionaries.state.handler,
      data: this.activeTraderMenuItem
    })
    this.$store.commit('traders/mutations/handler/CLEAR_CURRENT_TRADER', {
      rootData: this.$store.state.traders.state.handler,
      data: null
    })
  },
  methods: {
    backToList () {
      this.$router.push(`/${this.routePages.locale}/traders/${this.activeTraderMenuItem}`)
    },
    isFavorite (instrument) {
      return this.$store.getters['trading/getters/trading/getTrading'].favorite.includes(instrument.symbol)
    },
    toggleFavorite (trader) {
      this.$store.dispatch('traders/actions/handler/toggleFavoriteTrader', {
        source: 'trader',
        trader
      })
    },
    clickHandler (item) {
      this.activeItem = item
      if (item === 'chart') {
        this.$router.push(`/${this.routePages.locale}/traders/${this.routePages.second}`)
      } else if (!this.routePages.second) {
        this.$router.push(`/${this.routePages.locale}/traders/${this.routePages.current}/${item}`)
      } else {
        this.$router.push(`/${this.routePages.locale}/traders/${this.routePages.second}/${item}`)
      }
    },
    async openChat (userId) {
      await this.$store.dispatch('chat/actions/handler/openCurrentRoom', { user_id: userId })
      this.$store.commit('chat/mutations/handler/TOGGLE_CHAT_SIDEBAR', { rootData: this.$store.state.chat.state.handler, data: true })
    },
    openTraderChart (item) {
      this.activeItem = 'chart'

      this.$instrument.openInstrumentTrader(item)
    }
  }
}
</script>
<style lang="scss" scoped>
  .current_trader {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    @media screen and (max-width: 767px) {
      height: 100vh;
    }

    &-header_container {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;

      @media screen and (max-width: 767px) {
        border-top: 1px solid #eaeced;
        border-bottom: 1px solid #d9dce1;
        background-color: white;
      }
    }

    &-header_container_chart {
      display: inline-block;
      height: 35px;
      padding: 2px 15px;
      margin-bottom: 30px;
      background-color: white;

      &.-chart_shown {
        padding: 2px 10px;
        margin-bottom: 10px;
      }

      &-icons {
        display: flex;
        align-items: center;
      }

      &-links {
        transform: translate(100px, -20px);
      }
    }

    &-header {
      display: flex;
      align-items: center;
      padding: 20px 30px 5px;
      margin-bottom: 10px;

      @media screen and (max-width: 767px) {
        padding: 10px 10px 0;
        justify-content: space-between;
      }

      &-main_data {
        display: flex;
        align-items: center;

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
            transform: rotate(180deg);
            margin-left: 5px;
          }

          &.-chart_shown {
            margin-right: 0;
            align-items: end;

            svg {
              transform: translateY(-2px);

              @media screen and (max-width: 767px) {
                fill: #8e9aac;
              }
            }
          }

          svg {
            fill: #3B4B68;
            width: 16px;
            height: 16px;
          }
        }

        &-trader_logo {
          width: 50px;
          height: 50px;
          border-radius: 100px;

          @media screen and (max-width: 767px) {
            width: 40px;
            height: 40px;
          }

          &.-empty {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #3B4B68;

            span {
              color: white;
              font-size: 20px;
            }
          }
        }

        &-user_name {
          color: #3B4B68;
          font-size: 20px;

          &.-ltr {
            margin-left: 10px;
          }

          &.-rtl {
            margin-right: 10px;
          }

          @media screen and (max-width: 767px) {
            font-size: 18px;
          }
        }
      }

      &-menu {
        padding: 0 30px;

        @media screen and (max-width: 767px) {
          padding: 0;
        }
      }

      &-buttons_mobile {
        display: flex;
        align-items: center;

        &-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          cursor: pointer;

          &.-chart_shown {
            width: 30px;
            height: 30px;
            align-items: end;
          }

          &-envelope {
            width: 20px;
            height: 20px;
            fill: #8e9aac;
          }

          &-star {
            width: 20px;
            height: 20px;
          }

          &-star_empty {
            width: 20px;
            height: 20px;
          }
        }
      }

      &-buttons_desktop {
        display: flex;
        align-items: center;

        &-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          cursor: pointer;
          margin: 0 10px;

          &-star {
            width: 20px;
            height: 20px;
          }

          &-star_empty {
            width: 20px;
            height: 20px;
          }
        }

        &-button_big {
          padding: 10px 15px;

          &-envelope {
            width: 20px;
            height: 20px;
            fill: #8e9aac;

            &.-ltr {
              margin-right: 14px;
            }

            &.-rtl {
              margin-left: 14px;
            }
          }

          &-text {
            font-size: 14px;
          }
        }
      }
    }

    &-menu {
      padding: 0;
      width: 100%;
    }

    &-content {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: 0 30px 30px;

      @media screen and (max-width: 767px) {
        padding: 0;
        margin-bottom: 110px;
        overflow: auto;

        &.-chart_shown {
          margin-bottom: 0;
        }
      }

      &-chart {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;

        @media screen and (max-width: 767px) {
          flex-direction: column;
          height: calc(100vh - 150px);
        }
      }

      &-button {
        font-size: 14px !important;
        margin: 10px;
      }

      //&.-chart_shown {
      //  transform: translateY(20px);
      //}
    }
  }

  .star {
    width: 20px;
    height: 20px;

    @media screen and (max-width: 768px) {
      width: 25px;
      height: 25px;
    }
  }
</style>
