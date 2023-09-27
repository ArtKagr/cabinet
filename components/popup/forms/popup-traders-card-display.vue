<template>
  <div class="popup-trades_history">
    <div class="popup-trades_history-head">
      <span class="popup-trades_history-head-name m-0" :class="`-${dir}`" v-text="$t('Настройка вида карточки')" />
    </div>
    <div class="popup-card-display-body">
      <div class="popup-card-display-body-info" :class="[`-${dir}`, windowWidth === 'sm' ? '-mobile' : '']">
        <lfx-icon-star class="popup-card-display-body-info-star" :class="`-${dir}`" />
        <div class="d-flex align-items-center">
          <div class="trading-page-card-head-avatar" :class="`-${dir}`">
            <span class="text-dark-primary-30" v-text="'СТ'" />
          </div>
          <div class="d-flex flex-column">
            <div class="d-flex flex-column mb-3">
              <span class="text-dark-primary-15 font-weight-500" :class="isRtlMode ? 'text-right' : ''" v-text="'@CopyTrading'" />
              <span class="text-secondary-12" :class="isRtlMode ? 'text-right' : ''" v-text="'Copy Trading'" />
            </div>
            <div class="d-flex flex-column">
              <span class="text-success-28 line-height-1" :class="isRtlMode ? 'text-right' : ''" v-text="'100.00%'" />
              <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Доходность')" />
            </div>
          </div>
        </div>
      </div>
      <div class="popup-card-display-body-chart -traders_settings" :class="traderCardSettingsCopy.chart ? '' : '-off'">
        <lfx-switch
          class="popup-card-display-body-chart-switch"
          :switch-state="traderCardSettingsCopy.chart"
          @click-handler="switchHandler($event, 'chart')"
        />
        <div class="popup-card-display-body-chart-line" :class="`-${dir}`">
          <sparkline :width="cardWidth" height="80">
            <sparklineCurve :data="[0,1,2,3,4,5,6]" :limit="7" :styles="chartStyle" />
          </sparkline>
        </div>
        <div class="popup-card-display-body-chart-base" :class="traderCardSettingsCopy.chart ? '' : '-off'" />
      </div>
      <div class="popup-card-display-body-settings" :class="[traderCardSettingsCopy.info ? '' : '-off', `-${dir}`]">
        <lfx-switch
          class="popup-card-display-body-settings-switch"
          :switch-state="traderCardSettingsCopy.info"
          @click-handler="switchHandler($event, 'info')"
        />
        <div class="popup-card-display-body-settings-volatility m-0" :class="`-${dir}`">
          <span class="popup-card-display-body-settings-volatility-value" :class="`-${dir}`" v-text="'100'" />
          <span class="popup-card-display-body-settings-volatility-title" :class="`-${dir}`" v-text="$t('Копируют')" />
        </div>
        <div class="popup-card-display-body-settings-spread" :class="`-${dir}`">
          <span class="popup-card-display-body-settings-spread-value" :class="`-${dir}`" v-text="`~10 000.00 USD`" />
          <span class="popup-card-display-body-settings-spread-title" v-text="$t('В управлении')" />
        </div>
      </div>
      <div class="popup-card-display-body-buttons" :class="traderCardSettingsCopy.buttons ? '' : '-off'">
        <lfx-switch
          class="popup-card-display-body-buttons-switch_icon"
          :switch-state="traderCardSettingsCopy.buttons"
          @click-handler="switchHandler($event, 'buttons')"
        />
        <div class="trading-page-card-buttons-input d-flex w-100" :class="`-${dir}`">
          <span class="w-100" :class="isRtlMode ? 'text-right' : ''" v-text="'100 EUR'" />
        </div>
        <b-button class="trading-page-card-buttons_trader-button" variant="primary" v-text="$t('Копировать')" />
      </div>
      <div class="popup-card-display-body-button">
        <b-button class="w-100" variant="primary" @click="saveTradingCardSettings" v-text="$t('Применить')" />
      </div>
    </div>
  </div>
</template>

<script>
import LfxIconStar from '~/components/icons/lfx-icon-star'
import LfxSwitch from '~/components/_aux/lfx-switch'
export default {
  name: 'PopupTradersCardDisplay',
  components: { LfxSwitch, LfxIconStar },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    windowWidthNumber () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    chartStyle () {
      return {
        stroke: this.traderCardSettingsCopy.chart ? '#93CEF3' : '#dedfe1',
        fill: this.traderCardSettingsCopy.chart ? '#DCf0FB' : '#f6f7f7',
        fillOpacity: 1,
        strokeWidth: 2
      }
    },
    traderCardSettings () {
      return this.$store.getters['traders/getters/handler/getTraderCardSettings']
    },
    traderCardSettingsCopy () {
      return this.$store.getters['traders/getters/handler/getTraderCardSettingsCopy']
    },
    cardWidth () {
      let result
      switch (this.windowWidth) {
        case 'xl':
        case 'lg':
        case 'lg-md':
        case 'md':
          result = 390
          break
        case 'sm':
          result = this.windowWidthNumber
          break
      }
      return `${result}`
    }
  },
  mounted () {
    const settings = JSON.parse(localStorage.getItem('trader_card_settings')) || { chart: true, info: false, buttons: false, mode: 'assign' }
    if (this.traderCardSettingsCopy.mode === 'assign') {
      this.updateSettingsCopy(settings, 'assign')
    }
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    switchHandler (flag, field) {
      if (field === 'buttons' && flag === true) {
        this.$store.dispatch('dictionaries/actions/handler/showPopup', 'traders-card-warning')
      }
      this.updateSettingsCopy({ field, flag }, 'update')
    },
    saveTradingCardSettings () {
      this.updateSettings(this.traderCardSettingsCopy)
      this.saveTraderCardSettings()
      this.togglePopup(false)
    },
    updateSettings (payload) {
      this.$store.commit('traders/mutations/handler/UPDATE_TRADER_CARD_SETTINGS', {
        data: payload, rootData: this.$store.state.traders.state.handler
      })
    },
    updateSettingsCopy (payload, mode) {
      this.$store.commit('traders/mutations/handler/UPDATE_TRADER_CARD_SETTINGS_COPY', {
        data: payload, mode, rootData: this.$store.state.traders.state.handler
      })
    },
    saveTraderCardSettings () {
      localStorage.setItem('trader_card_settings', JSON.stringify(this.traderCardSettingsCopy))
    }
  }
}
</script>
<style lang="scss">
 .trading-page-card-buttons_trader-button {
   &:hover {
     opacity: 1 !important;
   }
 }
</style>
