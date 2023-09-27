<template>
  <div class="popup-trades_history">
    <div class="popup-trades_history-head">
      <span class="popup-trades_history-head-name" v-text="$t('Изменение сделки')" />
    </div>
    <div class="popup-trades-change-body">
      <div class="popup-trades-change-body-head">
        <lfx-symbol :symbol="trade.instrument.symbol_original" :large="true" />
        <span class="popup-trades_history_investment-head-name" :class="`-${dir}`" v-text="trade.instrument.symbol_original" />
      </div>
      <div class="popup-trades-change-body-label" :class="trade.statusClass">
        <span class="popup-trades-change-body-label-title" v-text="$t(trade.statusLabel)" />
        <span class="popup-trades-change-body-label-value" v-text="trade.open_price.toFixed(trade.instrument.digits)" />
      </div>
      <div v-if="![0, 1].includes(trade.cmd)" class="popup-trades-change-body-amount">
        <span class="popup-trades-change-body-amount-title" :class="`-${dir}`" v-text="$t('Цена открытия сделки')" />
        <field-numeric
          v-model="orderVolume"
          class="popup-trades-change-body-amount-input"
          :digits="trade.instrument.digits"
          :min="isLimitOrder ? trade.current_price - trade.instrument.point : trade.instrument.point"
          :max="isStopOrder ? trade.current_price - trade.instrument.point : Number.MAX_SAFE_INTEGER"
          :counter="trade.instrument.point"
          @change="setOrderVolume"
        />
      </div>
      <div class="popup-trades-change-body-amount" :class="![0, 1].includes(trade.cmd) ? '-order' : ''">
        <span class="popup-trades-change-body-amount-title" :class="`-${dir}`" v-text="$t('Объем сделки в лотах')" />
        <field-numeric
          v-model="tradeVolume"
          class="popup-trades-change-body-amount-input"
          :digits="tradeVolumeStep"
          :min="trade.instrument.lot_min"
          :max="trade.volume"
          :counter="trade.instrument.lot_step"
          :disabled="isOrder"
          @change="setTradeVolume"
        />
        <div class="d-flex align-items-center justify-content-center">
          <bdi class="popup-trades-change-body-amount-total" :class="[involvedFunds > 100 ? 'text-danger-12' : '', isRtlMode ? 'ml-2' : 'mr-2']" v-text="`${currentMargin} ${account.currency}`" />
          <bdi class="popup-trades-change-body-amount-total" v-text="$t('{involvedFunds}% средств', { involvedFunds })" />
        </div>
      </div>
      <div class="popup-trades-change-body-data-values">
        <div class="popup-trades-change-body-data-values-item">
          <span class="popup-trades-change-body-data-values-item-title" :class="`-${dir}`" v-text="$t('Текущая котировка')" />
          <bdi
            class="popup-trades-change-body-data-values-item-value"
            :class="[`-${dir}`, quoteClass]"
            v-text="trade.current_price.toFixed(trade.instrument.digits)"
          />
        </div>
        <div class="popup-trades-change-body-data-values-item">
          <span class="popup-trades-change-body-data-values-item-title" :class="`-${dir}`" v-text="$t('Текущая прибыль')" />
          <bdi
            class="popup-trades-change-body-data-values-item-value"
            :class="[`-${dir}`, trade.changedProfit > 0 ? '-profit' : trade.changedProfit < 0 ? '-loss' : '']"
            v-text="`${trade.changedProfit.toFixed(2)} ${account.currency}`"
          />
        </div>
      </div>
      <div class="popup-trades-change-body-data-collapse">
        <div v-b-toggle:trades-trade-change class="popup-trades-change-body-data-collapse-chevron" :class="`-${dir}`">
          <lfx-icon-chevron-down class="when-closed" />
          <lfx-icon-chevron-down class="when-open rotate_180" />
        </div>
        <span v-b-toggle.trades-trade-change class="popup-trades-change-body-data-collapse-title" v-text="$t('Настройки копирования')" />
      </div>
      <b-collapse id="trades-trade-change">
        <div class="popup-trades-change-body-data-conditions">
          <div class="popup-trades-change-body-data-conditions-row flex-row">
            <div class="popup-trades-change-body-data-conditions-row-column" :class="`-${dir}`">
              <span class="popup-trades-change-body-data-conditions-row-title" :class="`-${dir}`" v-text="$t('Take profit')" />
              <field-numeric
                v-model="values.tp.value"
                class="popup-trades-change-body-data-conditions-row-input -small"
                :class="values.tp.value > 0 ? '-profit' : values.tp.value < 0 ? '-loss' : ''"
                pointer="arrow"
                :prefix="values.tp.value > 0 ? '+' : ''"
                :label="account.currency"
                :digits="(values.tp.value >= 1 || values.tp.value <= -1) ? 0 : 2"
                :min="trade.changedProfit + 1"
                :max="Number.MAX_SAFE_INTEGER"
                :counter="1"
                :is-void-subst="values.tp.value === 0"
                @change="setValue($event, 'tp')"
              />
            </div>
            <div class="popup-trades-change-body-data-conditions-row-column" :class="`-${dir}`">
              <span class="popup-trades-change-body-data-conditions-row-title" :class="`-${dir}`" v-text="$t('Stop loss')" />
              <field-numeric
                v-model="values.sl.value"
                class="popup-trades-change-body-data-conditions-row-input -small"
                :class="values.sl.value > 0 ? '-profit' : values.sl.value < 0 ? '-loss' : ''"
                pointer="arrow"
                :prefix="values.sl.value > 0 ? '+' : ''"
                :label="account.currency"
                :digits="(values.sl.value >= 1 || values.sl.value <= -1) ? 0 : 2"
                :min="Number.MIN_SAFE_INTEGER"
                :max="trade.changedProfit - 1"
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
                v-model="values.tp.move"
                class="popup-trades-change-body-data-conditions-row-input -small"
                pointer="arrow"
                :prefix="values.tp.move > 0 ? '+' : ''"
                :digits="trade.instrument.digits"
                :min="isBuy ? currentProfitInPoints + pointsInOne : -Math.abs(orderVolume - trade.instrument.point)"
                :max="isBuy ? Number.MAX_SAFE_INTEGER : Math.abs(currentProfitInPoints)"
                :counter="trade.instrument.point"
                @change="setMove($event, 'tp')"
              />
            </div>
            <div class="popup-trades-change-body-data-conditions-row-column" :class="`-${dir}`">
              <span class="popup-trades-change-body-data-conditions-row-title" :class="`-${dir}`" v-text="$t('Движение')" />
              <field-numeric
                v-model="values.sl.move"
                class="popup-trades-change-body-data-conditions-row-input -small"
                pointer="arrow"
                :prefix="values.sl.move > 0 ? '+' : ''"
                :digits="trade.instrument.digits"
                :min="isBuy ? trade.instrument.point - orderVolume : Number.MIN_SAFE_INTEGER"
                :max="isBuy ? currentProfitInPoints - pointsInOne : Number.MAX_SAFE_INTEGER"
                :counter="trade.instrument.point"
                @change="setMove($event, 'sl')"
              />
            </div>
          </div>
          <div class="popup-trades-change-body-data-conditions-row flex-row">
            <div class="popup-trades-change-body-data-conditions-row-column" :class="`-${dir}`">
              <span class="popup-trades-change-body-data-conditions-row-title" :class="`-${dir}`" v-text="$t('Цена закрытия')" />
              <field-numeric
                v-model="values.tp.closePrice"
                class="popup-trades-change-body-data-conditions-row-input -small"
                pointer="arrow"
                :digits="trade.instrument.digits"
                :min="trade.instrument.point"
                :max="Number.MAX_SAFE_INTEGER"
                :counter="trade.instrument.point"
                :is-void-subst="values.tp.value === 0"
                @change="changeClosePrice($event, 'tp')"
                @point="setClosePrice($event, 'tp')"
              />
            </div>
            <div class="popup-trades-change-body-data-conditions-row-column" :class="`-${dir}`">
              <span class="popup-trades-change-body-data-conditions-row-title" :class="`-${dir}`" v-text="$t('Цена закрытия')" />
              <field-numeric
                v-model="values.sl.closePrice"
                class="popup-trades-change-body-data-conditions-row-input -small"
                pointer="arrow"
                :digits="trade.instrument.digits"
                :min="trade.instrument.point"
                :max="Number.MAX_SAFE_INTEGER"
                :counter="trade.instrument.point"
                :is-void-subst="values.sl.value === 0"
                @change="changeClosePrice($event, 'sl')"
                @point="setClosePrice($event, 'sl')"
              />
            </div>
          </div>
          <div class="popup-trades-change-body-data-conditions-row flex-row">
            <div class="popup-trades-change-body-data-conditions-row-column" :class="`-${dir}`">
              <span class="popup-trades-change-body-data-conditions-row-hint" :class="`-${dir}`" v-text="$t('% от средств без учета текущего изменения')" />
              <span class="popup-trades-change-body-data-conditions-row-hint" :class="[`-${dir}`, getHintClass(percentTpAmount)]" v-text="`${percentTpAmount.toFixed(2)}%`" />
            </div>
            <div class="popup-trades-change-body-data-conditions-row-column" :class="`-${dir}`">
              <span class="popup-trades-change-body-data-conditions-row-hint" :class="`-${dir}`" v-text="$t('% от средств без учета текущего изменения')" />
              <span class="popup-trades-change-body-data-conditions-row-hint" :class="[`-${dir}`, getHintClass(percentSlAmount)]" v-text="`${percentSlAmount.toFixed(2)}%`" />
            </div>
          </div>
        </div>
      </b-collapse>
      <div class="popup-trades-change-body-data-buttons">
        <b-button class="popup-trades-change-body-data-buttons-button m-0" :disabled="isButtonDisabled" variant="primary" @click="clickHandler" v-text="$t('Применить')" />
      </div>
    </div>
  </div>
</template>

<script>
import LfxSymbol from '~/components/_aux/lfx-symbol'
import FieldNumeric from '~/components/modal/fields/field-numeric'
import {
  CMD_BUY,
  CMD_BUY_LIMIT,
  CMD_BUY_STOP,
  CMD_BUY_STOP_LIMIT,
  CMD_SELL_LIMIT,
  CMD_SELL_STOP,
  CMD_SELL_STOP_LIMIT
} from '~/plugins/trading/Constants'
import LfxIconChevronDown from '~/components/icons/lfx-icon-chevron-down'
export default {
  name: 'PopupTradesTradeChange',
  components: { LfxIconChevronDown, FieldNumeric, LfxSymbol },
  data () {
    return {
      tradeVolume: 0,
      tradeVolumeStep: 0,
      orderVolume: 0,
      currentMargin: 0,
      isButtonDisabled: true,
      isBuy: true,
      isOrder: false,
      isStopOrder: false,
      isLimitOrder: false,
      quoteClass: '',
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
      accountInfo: {
        server: null,
        group: null,
        leverage: null,
        currency: null
      }
    }
  },
  computed: {
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    accountAvailableFunds () {
      return this.$store.getters['trading/getters/trading/getAccountAvailableFunds']
    },
    trade () {
      return this.$store.getters['trading/getters/handler/getOpenedTrade']
    },
    onePointCost () {
      return this.$instrument.getOnePointCost(this.account.server, this.trade.instrument, this.tradeVolume, this.account.currency)
    },
    currentProfitInPoints () {
      return this.getPointsInCost(this.trade.changedProfit)
    },
    pointsInOne () {
      return this.getPointsInCost(1)
    },
    involvedFunds () {
      return (this.currentMargin * 100 / this.accountAvailableFunds).toFixed(2)
    },
    percentTpAmount () {
      return this.values.tp.value * 100 / this.account.balance
    },
    percentSlAmount () {
      return this.values.sl.value * 100 / this.account.balance
    }
  },
  watch: {
    'trade.server' (newValue) {
      console.warn('server', newValue)
    },
    'trade.current_price' (newValue, oldValue) {
      this.quoteClass = newValue > oldValue ? '-up' : newValue < oldValue ? '-down' : ''
      this.currentMargin = this.getPreMargin(newValue, this.tradeVolume)
    },
    tradeVolume (newValue) {
      this.currentMargin = this.getPreMargin(this.trade.current_price, newValue)
      this.isButtonDisabled = newValue === this.trade.volume
    },
    values: {
      handler (newValue) {
        this.isButtonDisabled = newValue.tp.move === 0 && newValue.sl.move === 0 && (this.orderVolume === this.trade.open_price)
      },
      deep: true
    }
  },
  created () {
    this.getAccountInfo(
      this.account.server === this.trade.server
        ? this.account
        : this.$store.getters['trading/getters/trading/getInvestments'].find(investments => investments.server === this.trade.server)
    )

    this.isBuy = this.isBuyTrade(this.trade.cmd)
    this.isOrder = this.getIsOrder(this.trade.cmd)
    this.isStopOrder = this.getIsStop(this.trade.cmd)
    this.isLimitOrder = this.getIsLimit(this.trade.cmd)

    this.tradeVolume = this.trade.volume
    this.orderVolume = this.trade.open_price
    this.currentMargin = this.getPreMargin(this.trade.current_price, this.tradeVolume)
    this.tradeVolumeStep = this.numbersAfterComma(this.trade.instrument.lot_step)

    if (this.trade.tp) {
      this.changeClosePrice(this.trade.tp, 'tp')
    }
    if (this.trade.sl) {
      this.changeClosePrice(this.trade.sl, 'sl')
    }
  },
  methods: {
    numbersAfterComma (value = 0) {
      return value.toString().includes('.') ? value.toString().split('.').pop().length : 0
    },
    isBuyTrade (cmd) {
      return [CMD_BUY, CMD_BUY_STOP, CMD_BUY_LIMIT, CMD_BUY_STOP_LIMIT].includes(cmd)
    },
    getIsOrder (cmd) {
      return [CMD_BUY_STOP, CMD_SELL_STOP, CMD_BUY_LIMIT, CMD_SELL_LIMIT, CMD_BUY_STOP_LIMIT, CMD_SELL_STOP_LIMIT].includes(cmd)
    },
    getIsStop (cmd) {
      return [CMD_BUY_STOP, CMD_SELL_STOP].includes(cmd)
    },
    getIsLimit (cmd) {
      return [CMD_BUY_LIMIT, CMD_SELL_LIMIT].includes(cmd)
    },
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    getHintClass (value) {
      return value > 0 ? 'text-success-12' : value < 0 ? 'text-danger-12' : 'text-secondary-12'
    },
    getPreMargin (currentPrice, volume) {
      return this.$instrument.getPreMargin(
        this.accountInfo.server,
        this.accountInfo.group,
        this.trade.instrument.symbol,
        volume,
        this.accountInfo.leverage,
        currentPrice,
        this.accountInfo.currency
      ).toFixed(2)
    },
    getCostInPoints (value) {
      return Number(Number(this.onePointCost * value / this.trade.instrument.point).toFixed(2))
    },
    getPointsInCost (value) {
      return Number(Number(value * this.trade.instrument.point / this.onePointCost).toFixed(this.trade.instrument.digits))
    },
    getMoveDifference (value) {
      return value - this.orderVolume
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
    //
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
      this.values[flag].move = this.getMoveDifference(value)
      this.values[flag].value = this.getCostInPoints(this.getCmdValue(this.values[flag].move))
    },
    async changeTrade () {
      await this.$store.dispatch('trading/actions/handler/changeCurrentTrade', {
        server: this.trade.server,
        login: this.trade.login,
        order: this.trade.order,
        volume: this.tradeVolume,
        sl: this.values.sl.move ? this.values.sl.closePrice : 0,
        tp: this.values.tp.move ? this.values.tp.closePrice : 0
      })
      await this.togglePopup(false)
    },
    async changeOrder () {
      await this.$store.dispatch('trading/actions/handler/changeCurrentOrder', {
        server: this.trade.server,
        login: this.trade.login,
        order: this.trade.order,
        volume: this.tradeVolume,
        price: this.orderVolume,
        sl: this.values.sl.move ? this.values.sl.closePrice : 0,
        tp: this.values.tp.move ? this.values.tp.closePrice : 0
      })
      await this.togglePopup(false)
    },
    clickHandler () {
      [0, 1].includes(this.trade.cmd) ? this.changeTrade() : this.changeOrder()
    },
    getAccountInfo ({ server, group, leverage, currency }) {
      this.accountInfo.server = server
      this.accountInfo.group = group
      this.accountInfo.leverage = leverage
      this.accountInfo.currency = currency
    }
  }
}
</script>
