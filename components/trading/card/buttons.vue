<template>
  <div class="trading-page-card-buttons" :class="activeVolumeInput === card.symbol ? 'p-3' : ''">
    <div v-if="activeVolumeInput === card.symbol" class="d-flex justify-content-between w-100">
      <field-numeric
        class="popup-trades-change-body-amount-input -trading_card"
        :value="cardVolume"
        :label="label"
        :counter="card.lot_step"
        :min="card.lot_min"
        :max="card.lot_max"
        :digits="digits"
        @change="setValue"
      />
      <b-button class="w-15 text-white-16" :class="isRtlMode ? 'mr-2' : 'ml-2'" variant="primary" @click="showVolumeInput(null)" v-text="$t('Ок')" />
    </div>
    <template v-else>
      <b-button
        class="trading-page-card-buttons-button"
        variant="danger"
        :disabled="!isSaleAvailable"
        @click="openCurrentTrade(1)"
      >
        <span class="trading-page-card-buttons-button-value" v-text="card.bid" />
        <span class="trading-page-card-buttons-button-title" v-text="$t('Продать')" />
      </b-button>
      <div
        class="trading-page-card-buttons-volume"
        @click="showVolumeInput(card.symbol)"
      >
        <span class="trading-page-card-buttons-volume-title" v-text="$t('Объем')" />
        <span v-if="cardVolume !== lotMin" class="trading-page-card-buttons-volume-value" v-text="cardVolume.toFixed(digits)" />
        <span v-else class="trading-page-card-buttons-volume-value" v-text="lotMin" />
      </div>
      <b-button
        class="trading-page-card-buttons-button"
        variant="success"
        :disabled="!isBuyAvailable"
        @click="openCurrentTrade(0)"
      >
        <span class="trading-page-card-buttons-button-value" v-text="card.ask" />
        <span class="trading-page-card-buttons-button-title" v-text="$t('Купить')" />
      </b-button>
    </template>
  </div>
</template>

<script>
import FieldNumeric from '~/components/modal/fields/field-numeric'
export default {
  name: 'Buttons',
  components: {
    FieldNumeric
  },
  props: {
    card: {
      type: Object,
      default: () => {
        return {
          activeSession: true,
          trade_mode: 4
        }
      }
    },
    lotMin: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      cardVolume: 0,
      counterId: null
    }
  },
  computed: {
    digits () {
      return this.numbersAfterComma(this.card.lot_min)
    },
    label () {
      return this.$pluralize(this.cardVolume, [this.$t('лот'), this.$t('лота'), this.$t('лотов')]).replace(`${this.cardVolume} `, '')
    },
    isSaleAvailable () {
      if (this.card.trade_mode === 0) {
        return false
      } else if (this.card.trade_mode === 1) {
        return false
      } else if (this.card.trade_mode === 3) {
        return false
      } else {
        return this.card.activeSession
      }
    },
    isBuyAvailable () {
      if (this.card.trade_mode === 0) {
        return false
      } else if (this.card.trade_mode === 2) {
        return false
      } else if (this.card.trade_mode === 3) {
        return false
      } else {
        return this.card.activeSession
      }
    },
    tradingData () {
      return this.$store.getters['trading/getters/trading/getTrading']
    },
    activeVolumeInput () {
      return this.$store.getters['trading/getters/handler/getActiveInputVolume']
    },
    isDemo () {
      return this.$store.getters['dictionaries/getters/user/getIsDemo']
    },
    isGuest () {
      return this.$store.getters['dictionaries/getters/user/getIsGuest']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    }
  },
  watch: {
    'routePages.current' () {
      this.cardVolume = this.lotMin
    }
  },
  created () {
    this.cardVolume = this.lotMin
  },
  methods: {
    numbersAfterComma (value = 0) {
      return value.toString().includes('.') ? value.toString().split('.').pop().length : 0
    },
    setValue (value) {
      this.cardVolume = value
    },
    async openCurrentTrade (tradeType) {
      if (this.isGuest) {
        this.$store.dispatch('dictionaries/actions/handler/showPopup', 'demo-real')
      } else {
        await this.$store.dispatch('dictionaries/actions/handler/togglePreloader', true)
        await this.$store.dispatch('trading/actions/handler/openCurrentTrade', {
          server: this.tradingData.account.server,
          login: this.tradingData.account.login,
          symbol: this.card.symbol,
          volume: this.cardVolume,
          cmd: tradeType,
          sl: 0,
          tp: 0
        })
      }
    },
    clickHandler (value) {
      this.cardVolume = Number(Number(this.cardVolume + value).toFixed(this.card.digits))
    },
    mouseDownHandler (value) {
      this.counterId = setInterval(() => {
        this.cardVolume = Number(Number(this.cardVolume + value).toFixed(this.card.digits))
      }, 100)
    },
    mouseUpHandler () {
      clearInterval(this.counterId)
    },
    mouseLeaveHandler () {
      clearInterval(this.counterId)
    },
    blurHandler (value) {
      if (value === 0 || value < 0) {
        this.cardVolume = Number(this.card.lot_min)
      } else {
        this.cardVolume = Number(Number(value).toFixed(this.card.digits))
      }
    },
    showVolumeInput (cardSymbol) {
      if (this.isSaleAvailable || this.isBuyAvailable) {
        this.$store.commit('trading/mutations/handler/SAVE_ACTIVE_VOLUME_INPUT', {
          data: cardSymbol,
          rootData: this.$store.state.trading.state.handler
        })
      }
    },
    inputEvent (e) {
      e.stopPropagation()
    }
  }
}
</script>
