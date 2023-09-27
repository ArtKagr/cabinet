<template>
  <div class="trading-settings" :class="[`-${menuTab}`, `-${source}`]">
    <span v-if="source === 'instrument'" class="trading-settings-title" :class="`-${dir}`" v-text="$t('Открытие сделки')" />
    <lfx-menu
      v-if="isAvailable"
      :menu="menu"
      :active-item="menuTab"
      source="traders"
      class="trading-settings-menu"
      :no-margin-title="true"
      :no-route="true"
      @click-handler="setMenuTab"
    />
    <div class="trading-settings-trade_buttons">
      <div class="trading-settings-trade_buttons-button" :class="tradeTab === 'bid' ? '-bid -active' : ''" @click="setTradeTab('bid')">
        <span class="trading-settings-trade_buttons-button-title" v-text="$t('Продажа')" />
        <span class="trading-settings-trade_buttons-button-value" v-text="Number(tradingCard.bid).toFixed(instrument.digits)" />
        <div v-if="tradeTab === 'bid' && isAvailable" class="trading-settings-trade_buttons-button-flag" :class="`-${tradeTab}`" />
      </div>
      <div class="trading-settings-trade_buttons-button" :class="tradeTab === 'ask' ? '-ask -active' : ''" @click="setTradeTab('ask')">
        <span class="trading-settings-trade_buttons-button-title" v-text="$t('Покупка')" />
        <span class="trading-settings-trade_buttons-button-value" v-text="Number(tradingCard.ask).toFixed(instrument.digits)" />
        <div v-if="tradeTab === 'ask' && isAvailable" class="trading-settings-trade_buttons-button-flag" :class="`-${tradeTab}`" />
      </div>
    </div>
    <template v-if="!(openTimeSession && openTimeSession.length) || [0, 3].includes(instrumentFull.trade_mode)">
      <div class="trading-settings-inputs">
        <div v-if="menuTab === 'order'" class="trading-settings-inputs-input -order">
          <span class="trading-settings-inputs-input-title" :class="`-${dir}`" v-text="$t('Цена открытия сделки')" />
          <field-numeric
            v-model="orderVolume"
            class="popup-trades-change-body-amount-input"
            :digits="instrument.digits"
            :min="instrument.point"
            :max="Number.MAX_SAFE_INTEGER"
            :counter="instrument.point"
            @change="setOrderVolume"
          />
        </div>
        <div class="trading-settings-inputs-input">
          <span class="trading-settings-inputs-input-title" :class="`-${dir}`" v-text="$t('Объем сделки в лотах')" />
          <field-numeric
            v-model="tradeVolume"
            class="popup-trades-change-body-amount-input"
            :digits="tradeVolumeStep"
            :min="instrument.lot_min"
            :max="instrument.lot_max"
            :counter="instrument.lot_step"
            @change="setTradeVolume"
          />
          <div class="trading-settings-inputs-input-hint" :class="`-${dir}`">
            <lfx-icon-help class="trading-settings-inputs-input-hint-icon" :class="`-${dir}`" @click.native="toggleHint" />
          </div>
          <div v-if="isHintShown" class="trading-settings-inputs-input-description" :class="`-${dir}`" @click="toggleHint">
            <div class="trading-settings-inputs-input-description-corner" :class="`-${dir}`" />
            <span
              class="trading-settings-inputs-input-description-text"
              :class="`-${dir}`"
              v-text="$t('Фиксированный объем валюты, принятый на валютном рынке Форекс за единицу торговой операции по купле-продаже валюты с использованием залоговой суммы – маржи, выраженный в базовой валюте инструмента. Величина лота для различных торговых инструментов не является одинаковой.')"
            />
          </div>
          <div class="trading-settings-inputs-input-values">
            <bdi class="trading-settings-inputs-input-values-value" :class="[involvedFunds > 100 ? 'text-danger-12' : '', isRtlMode ? 'ml-2' : 'mr-2']" v-text="`${currentMargin} ${account.currency}`" />
            <bdi class="trading-settings-inputs-input-values-value" v-text="$t('{involvedFunds}% средств', { involvedFunds })" />
          </div>
        </div>
      </div>
      <div class="trading-settings-conditions">
        <div class="trading-settings-conditions-head">
          <div v-b-toggle:trading-conditions-toggle class="trading-settings-conditions-head-icon">
            <lfx-icon-chevron-down class="when-closed icon-gray" />
            <lfx-icon-chevron-down class="when-open icon-gray rotate_180" />
          </div>
          <span v-b-toggle.trading-conditions-toggle class="trading-settings-conditions-head-text" v-text="$t('Условия закрытия сделки')" />
        </div>
        <b-collapse id="trading-conditions-toggle" class="trading-settings-conditions-container">
          <div class="popup-trades-change-body-data-conditions-row flex-row">
            <div class="popup-trades-change-body-data-conditions-row-column" :class="`-${dir}`">
              <span class="popup-trades-change-body-data-conditions-row-title" :class="`-${dir}`" v-text="$t('Take profit')" />
              <field-numeric
                :key="keys.tp.value"
                v-model="values.tp.value"
                class="popup-trades-change-body-data-conditions-row-input -small -value -tp"
                :class="values.tp.value > 0 ? '-profit' : values.tp.value < 0 ? '-loss' : ''"
                pointer="arrow"
                :prefix="values.tp.value > 0 ? '+' : ''"
                :label="account.currency"
                :digits="(values.tp.value >= 1 || values.tp.value <= -1) ? 0 : 2"
                :min="0"
                :max="isBuy ? Number.MAX_SAFE_INTEGER : Math.abs(priceInPoints)"
                :counter="1"
                :is-void-subst="values.tp.value === 0"
                @change="setValue($event, 'tp')"
              />
            </div>
            <div class="popup-trades-change-body-data-conditions-row-column" :class="`-${dir}`">
              <span class="popup-trades-change-body-data-conditions-row-title" :class="`-${dir}`" v-text="$t('Stop loss')" />
              <field-numeric
                :key="keys.sl.value"
                v-model="values.sl.value"
                class="popup-trades-change-body-data-conditions-row-input -small -value -sl"
                :class="values.sl.value > 0 ? '-profit' : values.sl.value < 0 ? '-loss' : ''"
                pointer="arrow"
                :prefix="values.sl.value > 0 ? '+' : ''"
                :label="account.currency"
                :digits="(values.sl.value >= 1 || values.sl.value <= -1) ? 0 : 2"
                :min="isBuy ? -Math.abs(priceInPoints) : Number.MIN_SAFE_INTEGER"
                :max="0"
                :counter="1"
                :is-void-subst="values.sl.value === 0"
                @change="setValue($event, 'sl')"
              />
            </div>
          </div>
          <div class="popup-trades-change-body-data-conditions-row flex-row">
            <div class="popup-trades-change-body-data-conditions-row-column" :class="`-${dir}`">
              <span class="popup-trades-change-body-data-conditions-row-title" :class="`-${dir}`" v-text="$t('Движение')" />
              <field-numeric
                :key="keys.tp.move"
                v-model="values.tp.move"
                class="popup-trades-change-body-data-conditions-row-input -small"
                pointer="arrow"
                :prefix="values.tp.move > 0 ? '+' : ''"
                :digits="instrument.digits"
                :min="isBuy ? 0 : -Math.abs(tradingCard.bid - instrument.point)"
                :max="Number.MAX_SAFE_INTEGER"
                :counter="instrument.point"
                :is-void-subst="false"
                @change="setMove($event, 'tp')"
              />
            </div>
            <div class="popup-trades-change-body-data-conditions-row-column" :class="`-${dir}`">
              <span class="popup-trades-change-body-data-conditions-row-title" :class="`-${dir}`" v-text="$t('Движение')" />
              <field-numeric
                :key="keys.sl.move"
                v-model="values.sl.move"
                class="popup-trades-change-body-data-conditions-row-input -small"
                pointer="arrow"
                :prefix="values.sl.move > 0 ? '+' : ''"
                :digits="instrument.digits"
                :min="isBuy ? -Math.abs(tradingCard.ask - instrument.point) : 0"
                :max="Number.MAX_SAFE_INTEGER"
                :counter="instrument.point"
                :is-void-subst="false"
                @change="setMove($event, 'sl')"
              />
            </div>
          </div>
          <div class="popup-trades-change-body-data-conditions-row flex-row">
            <div class="popup-trades-change-body-data-conditions-row-column" :class="`-${dir}`">
              <span class="popup-trades-change-body-data-conditions-row-title" :class="`-${dir}`" v-text="$t('Цена закрытия')" />
              <field-numeric
                :key="keys.tp.closePrice"
                v-model="values.tp.closePrice"
                class="popup-trades-change-body-data-conditions-row-input -small -volume -tp"
                pointer="arrow"
                :digits="instrument.digits"
                :min="instrument.point"
                :max="Number.MAX_SAFE_INTEGER"
                :counter="instrument.point"
                :is-void-subst="values.tp.value === 0"
                @change="changeClosePrice($event, 'tp')"
                @point="setClosePrice($event, 'tp')"
              />
            </div>
            <div class="popup-trades-change-body-data-conditions-row-column" :class="`-${dir}`">
              <span class="popup-trades-change-body-data-conditions-row-title" :class="`-${dir}`" v-text="$t('Цена закрытия')" />
              <field-numeric
                :key="keys.sl.closePrice"
                v-model="values.sl.closePrice"
                class="popup-trades-change-body-data-conditions-row-input -small -volume -sl"
                pointer="arrow"
                :digits="instrument.digits"
                :min="instrument.point"
                :max="Number.MAX_SAFE_INTEGER"
                :counter="instrument.point"
                :is-void-subst="values.sl.value === 0"
                @change="changeClosePrice($event, 'sl')"
                @point="setClosePrice($event, 'sl')"
              />
            </div>
          </div>
          <div class="popup-trades-change-body-data-conditions-row flex-row m-0">
            <div class="popup-trades-change-body-data-conditions-row-column" :class="`-${dir}`">
              <span class="popup-trades-change-body-data-conditions-row-hint" :class="`-${dir}`" v-text="$t('% от средств без учета текущего изменения')" />
              <span class="popup-trades-change-body-data-conditions-row-hint" :class="[`-${dir}`, getHintClass(percentTpAmount)]" v-text="`${percentTpAmount.toFixed(2)}%`" />
            </div>
            <div class="popup-trades-change-body-data-conditions-row-column" :class="`-${dir}`">
              <span class="popup-trades-change-body-data-conditions-row-hint" :class="`-${dir}`" v-text="$t('% от средств без учета текущего изменения')" />
              <span class="popup-trades-change-body-data-conditions-row-hint" :class="[`-${dir}`, getHintClass(percentSlAmount)]" v-text="`${percentSlAmount.toFixed(2)}%`" />
            </div>
          </div>
        </b-collapse>
      </div>
      <div class="trading-settings-button">
        <b-button v-if="tradeTab === 'bid'" class="w-100 text-white-16" variant="danger" @click="openTrade" v-text="$t('Продать')" />
        <b-button v-else-if="tradeTab === 'ask'" class="w-100 text-white-16" variant="success" @click="openTrade" v-text="$t('Купить')" />
      </div>
    </template>
    <div v-else class="d-flex flex-column px-3 mt-4">
      <div class="d-flex align-items-center mb-2">
        <div :class="isRtlMode ? 'ml-2' : 'mr-2'">
          <lfx-icon-info style="width: 19px; height: 19px; fill: #fbbc05;" />
        </div>
        <span class="text-secondary-14" :class="isRtlMode ? 'text-right' : ''" v-text="tradeDisabledInfo" />
      </div>
      <div
        v-if="openTimeSession && openTimeSession.length"
        class="d-flex flex-column"
        :class="isRtlMode ? 'text-right' : ''"
        :style="isRtlMode ? 'margin-right: 27px' : 'margin-left: 27px;'"
      >
        <span class="text-secondary-14 my-2" v-text="'До открытия торговой сессии:'" />
        <div class="d-flex align-items-center">
          <div class="d-flex flex-column mr-4">
            <span class="text-dark-primary-30 line-height-1" v-text="openTimeSession[0]" />
            <span class="text-secondary-10 text-uppercase text-center" v-text="'час.'" />
          </div>
          <div class="d-flex flex-column">
            <span class="text-dark-primary-30 line-height-1" v-text="openTimeSession[1]" />
            <span class="text-secondary-10 text-uppercase text-center" v-text="'мин.'" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="isDemo" class="d-flex flex-column px-3 mt-2">
      <div class="d-flex align-items-center mb-2">
        <div class="mr-2">
          <lfx-icon-info style="width: 19px; height: 19px; fill: #fbbc05;" />
        </div>
        <span class="text-secondary-14" v-text="`${$t('Режим демо-торговли')}.`" />
      </div>
      <div class="d-flex">
        <div class="mr-2">
          <lfx-icon-info style="width: 19px; height: 19px; fill: #fbbc05;" />
        </div>
        <span
          class="text-secondary-14"
          v-text="$t('Для сохранения торговых действий неоходимо {linkReg}зарегистрироваться{linkClose} или {linkAuth}авторизироваться{linkClose}', { linkReg: '', linkClose: '', linkAuth: '' })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LfxMenu from '~/components/_aux/lfx-menu.vue'
import LfxIconInfo from '~/components/icons/lfx-icon-info.vue'
import LfxIconHelp from '~/components/icons/lfx-icon-help.vue'
import FieldNumeric from '~/components/modal/fields/field-numeric'
import LfxIconChevronDown from '~/components/icons/lfx-icon-chevron-down'
export default {
  name: 'Settings',
  components: {
    LfxIconChevronDown,
    FieldNumeric,
    LfxIconHelp,
    LfxIconInfo,
    LfxMenu
  },
  props: {
    instrument: {
      type: Object,
      default: () => {
        return {
          symbol: null,
          symbol_original: null,
          digits: 2
        }
      }
    },
    source: {
      type: String,
      default: 'instrument'
    }
  },
  data () {
    return {
      menuTab: 'trade',
      tradeTab: 'bid',
      orderVolume: 0,
      tradeVolume: 0,
      tradeVolumeStep: 0,
      isBuy: true,
      //
      values: {
        tp: {
          value: 0,
          move: 0,
          closePrice: 0
        },
        sl: {
          value: 0,
          move: 0,
          closePrice: 0
        }
      },
      keys: {
        tp: {
          value: null,
          move: null,
          closePrice: null
        },
        sl: {
          value: null,
          move: null,
          closePrice: null
        }
      },
      isHintShown: false,
      openTimeSession: [],
      timerId: null
    }
  },
  computed: {
    isDemo () {
      return this.$store.getters['dictionaries/getters/user/getIsDemo']
    },
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    tradingCard () {
      const result = this.$store.getters['trading/getters/trading/getTradingCard'](this.instrument.category, this.instrument.symbol_original)
      return { ...result, bid: Number(result.bid), ask: Number(result.ask) }
    },
    isAvailable () {
      if (this.instrument.trade_mode === 0) {
        return false
      } else if (this.instrument.trade_mode === 3) {
        return false
      } else {
        return this.tradingCard.activeSession
      }
    },
    tradeDisabledInfo () {
      if (this.instrumentFull.trade_mode === 0) {
        return this.$t('Рынок закрыт')
      } else if (this.instrument.trade_mode === 3) {
        return this.$t('Только закрытие')
      } else if (!this.tradingCard.activeSession) {
        return this.$t('В текущий момент времени торговая сессия закрыта')
      } else {
        return ''
      }
    },
    lotStep () {
      return this.instrument && this.instrument.lot_step ? this.instrument.lot_step : 1
    },
    menu () {
      return [
        { title: 'Сейчас', route: null, flag: 'trade' },
        { title: 'По цене', route: null, flag: 'order' }
      ]
    },
    currentMargin () {
      return this.$instrument.getPreMargin(
        this.account.server,
        this.account.group,
        this.instrument.symbol,
        this.tradeVolume,
        this.account.leverage,
        this.tradingCard[this.tradeTab === 'bid' ? 'ask' : 'bid'],
        this.account.currency
      ).toFixed(2)
    },
    cmdType () {
      let result
      switch (this.menuTab) {
        case 'trade':
          switch (this.tradeTab) {
            case 'bid':
              result = 1
              break
            case 'ask':
              result = 0
              break
          }
          break
        case 'order':
          switch (this.tradeTab) {
            case 'bid':
              result = this.orderVolume > this.tradingCard.bid ? 3 : 5
              break
            case 'ask':
              result = this.orderVolume > this.tradingCard.ask ? 4 : 2
              break
          }
          break
      }
      return result
    },
    onePointCost () {
      return this.$instrument.getOnePointCost(this.account.server, this.instrument, this.tradeVolume, this.account.currency)
    },
    currentProfitInPoints () {
      return this.getPointsInCost(this.changedProfit)
    },
    priceInPoints () {
      return this.getCostInPoints(this.tradingCard[this.tradeTab])
    },
    priceInOnePoint () {
      return this.getCostInPoints(this.instrument.point)
    },
    involvedFunds () {
      return (this.currentMargin * 100 / this.accountAvailableFunds).toFixed(2)
    },
    percentTpAmount () {
      return this.values.tp.value * 100 / this.account.balance
    },
    percentSlAmount () {
      return this.values.sl.value * 100 / this.account.balance
    },
    instrumentFull () {
      return this.$store.getters['trading/getters/trading/getInstrumentFull']
    }
  },
  watch: {
    tradeTab (newValue) {
      this.orderVolume = this.tradingCard[newValue]
      this.isBuy = newValue === 'ask'
    },
    async isBuy () {
      await this.setValue(this.getMaxValue(this.values.tp.value), 'tp')
      await this.setValue(this.values.sl.value, 'sl')
    },
    'tradingCard.bid' (newValue) {
      this.setVolume(newValue, this.isBuy ? 'sl' : 'tp')
    },
    'tradingCard.ask' (newValue) {
      this.setVolume(newValue, this.isBuy ? 'tp' : 'sl')
    }
  },
  mounted () {
    this.updateKeys()
    this.isBuy = this.tradeTab === 'ask'
    this.setOrderVolume(this.tradingCard[this.tradeTab])
    this.tradeVolume = this.instrument.lot_min
    this.tradeVolumeStep = this.numbersAfterComma(this.instrument.lot_step)

    if (this.tradingCard && this.tradingCard.sessionSchedule && this.tradingCard.sessionSchedule.length) {
      const hours = this.tradingCard.sessionSchedule[0]
      const minutes = this.tradingCard.sessionSchedule[1]
      this.openTimeSession = [hours < 10 ? `0${hours}` : hours, minutes < 10 ? `0${minutes}` : minutes]
      this.timerId = setInterval(() => {
        this.openTimeSession = this.setSessionSchedule()
      }, 60000)
    }
  },
  destroyed () {
    clearInterval(this.timerId)
  },
  methods: {
    numbersAfterComma (value = 0) {
      return value.toString().includes('.') ? value.toString().split('.').pop().length : 0
    },
    setRandomKey () {
      return Math.floor(Math.random() * 1000000)
    },
    setSessionSchedule () {
      const result = this.$trading.setSessionSchedule(this.instrumentFull.session)

      if (result && result.length) {
        return [result[0] < 10 ? `0${result[0]}` : result[0], result[1] < 10 ? `0${result[1]}` : result[1]]
      } else {
        return []
      }
    },
    getHintClass (value) {
      return value > 0 ? 'text-success-12' : value < 0 ? 'text-danger-12' : 'text-secondary-12'
    },
    getMaxValue (value) {
      if (this.isBuy) {
        return value
      } else if (value > Math.abs(this.priceInPoints - this.priceInOnePoint)) {
        return Math.abs(this.priceInPoints - this.priceInOnePoint)
      } else {
        return value
      }
    },
    setMenuTab (menuTab) {
      this.menuTab = menuTab
      this.setVolume(this.isBuy ? this.values.sl.closePrice : this.values.tp.closePrice, this.isBuy ? 'sl' : 'tp')
      this.setVolume(this.isBuy ? this.values.tp.closePrice : this.values.sl.closePrice, this.isBuy ? 'tp' : 'sl')

      if (menuTab === 'order') {
        this.setOrderVolume(this.tradingCard[this.tradeTab])
      }

      this.updateKeys()
    },
    setTradeTab (tradeTab) {
      if (this.isAvailable) {
        this.tradeTab = tradeTab
        this.setOrderVolume(this.tradingCard[this.tradeTab])
      }

      this.updateKeys()
    },
    //
    getCostInPoints (value) {
      return Number(Number(this.onePointCost * value / this.instrument.point).toFixed(2))
    },
    getPointsInCost (value) {
      return Number(Number(value * this.instrument.point / this.onePointCost).toFixed(this.instrument.digits))
    },
    getCurrentClosePrice (value) {
      return this.orderVolume + value
    },
    getCmdValue (value) {
      if (this.isBuy) {
        return value
      } else {
        switch (Math.sign(value)) {
          case -1:
            return Math.abs(value)
          case 1:
            return -Math.abs(value)
          case 0:
            return value
        }
      }
    },
    setVolume (value, flag) {
      this.values[flag].closePrice = value + this.values[flag].move
      this.values[flag].closePrice = value + this.values[flag].move
    },
    setOrderVolume (value) {
      this.orderVolume = value
      this.values.tp.closePrice = value + this.values.tp.move
      this.values.sl.closePrice = value + this.values.sl.move
    },
    setTradeVolume (value) {
      this.tradeVolume = value
      this.values.tp.value = this.getCostInPoints(this.getCmdValue(this.values.tp.move))
      this.values.sl.value = this.getCostInPoints(this.getCmdValue(this.values.sl.move))
    },
    setValue (value, flag) {
      this.values[flag].value = value
      this.values[flag].move = this.getPointsInCost(this.getCmdValue(value))
      this.values[flag].closePrice = this.getCurrentClosePrice(this.values[flag].move)
    },
    setMove (value, flag) {
      this.values[flag].value = this.getCostInPoints(this.getCmdValue(value))
      this.values[flag].move = value
      this.values[flag].closePrice = this.getCurrentClosePrice(this.values[flag].move)
    },
    setClosePrice (value, flag) {
      this.values[flag].move += value
      this.values[flag].value = this.getCostInPoints(this.getCmdValue(this.values[flag].move))
      this.values[flag].closePrice = this.getCurrentClosePrice(this.values[flag].move)
    },
    changeClosePrice (value, flag) {
      this.values[flag].closePrice = value
      this.values[flag].move = value - this.orderVolume
      this.values[flag].value = this.getCostInPoints(this.getCmdValue(this.values[flag].move))
    },
    toggleHint () {
      this.isHintShown = !this.isHintShown
    },
    async openTrade () {
      if (this.isGuest) {
        this.$store.dispatch('dictionaries/actions/handler/showPopup', 'demo-real')
      } else if ([0, 1].includes(this.cmdType)) {
        await this.$store.dispatch('trading/actions/handler/openCurrentTrade', {
          server: this.account.server,
          login: this.account.login,
          symbol: this.instrument.symbol,
          volume: this.tradeVolume,
          sl: this.values.sl.move ? this.values.sl.closePrice : 0,
          tp: this.values.tp.move ? this.values.tp.closePrice : 0
        })
      } else {
        await this.$store.dispatch('trading/actions/handler/openCurrentOrder', {
          server: this.account.server,
          login: this.account.login,
          symbol: this.instrument.symbol,
          volume: this.tradeVolume,
          cmd: this.cmdType,
          price: this.orderVolume,
          sl: this.values.sl.move ? this.values.sl.closePrice : 0,
          tp: this.values.tp.move ? this.values.tp.closePrice : 0
        })
      }
    },
    updateKeys () {
      this.keys.tp.value = this.setRandomKey()
      this.keys.tp.move = this.setRandomKey()
      this.keys.tp.closePrice = this.setRandomKey()
      this.keys.sl.value = this.setRandomKey()
      this.keys.sl.move = this.setRandomKey()
      this.keys.sl.closePrice = this.setRandomKey()
    }
  }
}
</script>
<style lang="scss">
  .trading-settings {
    display: flex;
    flex-direction: column;
    background-color: white;
    min-width: 340px;
    max-width: 340px;
    height: 100%;
    border: 1px solid #d9dce1;
    min-height: calc(100vh - 305px);

    &.-instrument {
      @media screen and (max-width: 990px) {
        display: none;
      }
    }

    &.-popup {
      border: none;
      min-width: 100%;
      max-width: 100%;
    }

    &-title {
      font-size: 20px;
      color: #3B4B68;
      padding: 20px;
      line-height: 1;
    }

    &-menu {
      padding: 0 20px 20px !important;

      .menu-items {
        margin: 0 !important;
      }
    }

    &-trade_buttons {
      display: flex;
      align-items: center;
      width: 100%;

      &-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 50%;
        background-color: #eaeced;
        color: #8e9aac;
        height: 50px;
        position: relative;

        &.-bid {
          background-color: #ff4b5f;
        }

        &.-ask {
          background-color: #47bf6f;
        }

        &.-active {
          color: white;
        }

        &-title {
          line-height: 20px;
          font-size: 12px;
          text-transform: uppercase;
        }

        &-value {
          line-height: 20px;
          font-weight: 500;
          font-size: 18px;
          z-index: 2;

          &.-bid, &.-ask {
            color: white;
          }
        }

        &-flag {
          position: absolute;
          width: 15px;
          height: 15px;
          transform: translateY(24px) rotate(45deg);
          z-index: 1;

          &.-bid {
            background-color: #ff4b5f;
          }

          &.-ask {
            background-color: #47bf6f;
          }
        }
      }
    }

    &-inputs {
      padding: 30px 20px 20px;

      &-input {
        display: flex;
        flex-direction: column;
        position: relative;

        &.-order {
          margin-bottom: 20px;
        }

        &-title {
          color: #8e9aac;
          font-size: 12px;
          margin-bottom: 5px;

          &.-rtl {
            text-align: right;
          }
        }

        &-hint {
          display: flex;
          align-items: center;
          position: absolute;
          top: -5px;

          &.-ltr {
            right: 0;
          }

          &.-rtl {
            left: 0;
          }

          &-icon {
            cursor: pointer;
          }
        }

        &-description {
          display: flex;
          padding: 20px;
          border-radius: 3px;
          background-color: #3498db;
          position: absolute;
          top: -100px;
          z-index: 3;

          &.-ltr {
            right: 40px;
          }

          &.-rtl {
            left: 40px;
          }

          &-corner {
            width: 15px;
            height: 15px;
            background-color: #3498db;
            position: absolute;
            top: calc(50% - 22px);
            transform: rotate(45deg);

            &.-ltr {
              right: -8px;
            }

            &.-rtl {
              left: -8px;
            }
          }

          &-text {
            color: white;
            font-size: 14px;
            line-height: 1.3;

            &.-rtl {
              text-align: right;
            }
          }
        }

        &-values {
          margin-top: 5px;
          display: flex;
          align-items: center;
          justify-content: center;

          &-value {
            font-size: 12px;
            color: #8e9aac;
            text-transform: uppercase;
            margin-right: 9px;
          }
        }
      }
    }

    &-conditions {
      display: flex;
      flex-direction: column;
      padding: 0 20px 20px;

      &-head {
        display: flex;
        align-items: center;

        &-icon {
          margin-right: 10px;

          svg {
            width: 18px;
            height: 14px;
          }
        }

        &-text {
          font-size: 14px;
          color: #3B4B68;
        }
      }

      &-container {
        padding: 20px 0 0;
      }
    }

    &-button {
      padding: 20px;
    }
  }
</style>
