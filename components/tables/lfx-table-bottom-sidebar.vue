<template>
  <b-table
    :fields="changedFields"
    :items="items"
    :class="`lfx-table -bottom_sidebar -${windowWidth}`"
    :thead-class="[`lfx-table-head -bottom_sidebar -${windowWidth}`, 'hidden_header']"
    :tbody-class="`lfx-table-body -bottom_sidebar -${windowWidth}`"
    :tbody-tr-class="`lfx-table-body-row -bottom_sidebar -${windowWidth} -${dir}`"
  >
    <!-- Head -->
    <template #head(trades)>
      <div />
    </template>
    <template #head(symbol)>
      <div class="lfx-table-head-symbol" :class="isRtlMode ? '-text_right' : '-text_left'" v-text="`${$t('Инструмент')} | ${$t('Трейдер')}`" />
    </template>
    <template #head(cmd)>
      <div class="lfx-table-head-cmd -primary" v-text="$t('Тип сделки')" />
    </template>
    <template #head(volume)>
      <div class="lfx-table-head-volume -primary" v-text="$t('Объем сделки')" />
    </template>
    <template #head(open_time)>
      <div class="lfx-table-head-open_time -primary" v-text="$t('Дата и время открытия')" />
    </template>
    <template #head(open_price)>
      <div class="lfx-table-head-open_price" v-text="$t('Точка входа')" />
    </template>
    <template #head(current_level)>
      <div class="lfx-table-head-current_level" v-text="$t('Текущий уровень')" />
    </template>
    <template #head(sl)>
      <div class="lfx-table-head-sl" v-text="$t('Stop loss')" />
    </template>
    <template #head(tp)>
      <div class="lfx-table-head-tp" v-text="$t('Take profit')" />
    </template>
    <template #head(profit)>
      <div class="lfx-table-head-profit -primary -bottom_sidebar" :class="`-${dir}`" v-text="$t('Прибыль')" />
    </template>
    <template #head(buttons)>
      <div class="lfx-table-head-buttons" />
    </template>
    <template #head(horizontal_dots)>
      <div class="lfx-table-head-horizontal_dots" />
    </template>
    <!-- Rows -->
    <template #cell(trades)="row">
      <template v-if="row.item.isInvestment && row.item.trades.length">
        <lfx-icon-minus v-if="row.detailsShowing" @click.native="row.toggleDetails" />
        <lfx-icon-plus v-else @click.native="row.toggleDetails" />
      </template>
      <div v-else style="width: 10px; height: 16px;" />
    </template>
    <template #cell(symbol)="row">
      <div class="d-flex align-items-center">
        <div v-if="row.item.isInvestment" :class="isRtlMode ? 'ml-3' : 'mr-3'" @click="openItem(row.item)">
          <img v-if="row.item.image" class="lfx-table-body-trader_logo" :src="row.item.image" alt>
          <div v-else class="lfx-table-body-trader_logo -empty -bottom_sidebar">
            <span v-text="row.item.name" />
          </div>
        </div>
        <template v-else>
          <lfx-symbol-trading-card
            v-if="windowWidth === 'sm'"
            :symbol="row.item.instrument.symbol_original"
            :class="isRtlMode ? 'ml-3' : 'mr-3'"
            @click.native="openItem(row.item)"
          />
          <lfx-symbol
            v-else
            :symbol="row.item.instrument.symbol_original"
            :class="isRtlMode ? 'ml-3' : 'mr-3'"
            @click.native="openItem(row.item)"
          />
        </template>
        <div v-if="windowWidth === 'sm'" class="d-flex flex-column">
          <div v-if="row.item.isInvestment" class="lfx-table-body-symbol" :class="isRtlMode ? 'text-right' : ''" v-text="row.item.symbol" />
          <div v-else class="lfx-table-body-symbol" :class="isRtlMode ? 'text-right' : ''" v-text="row.item.instrument.symbol_original" />
          <div class="d-flex">
            <div class="lfx-table-body-cmd" :class="[isRtlMode ? 'text-right' : '', row.item.statusClass]" v-text="$t(row.item.statusLabel)" />
          </div>
          <div
            class="lfx-table-body-volume mt-1"
            :class="isRtlMode ? 'text-right' : ''"
            v-text="row.item.volume"
          />
        </div>
        <div v-else-if="row.item.isInvestment" class="lfx-table-body-symbol" @click="openItem(row.item)" v-text="row.item.symbol" />
        <div v-else class="lfx-table-body-symbol" @click="openItem(row.item)" v-text="row.item.instrument.symbol_original" />
      </div>
    </template>
    <template #cell(cmd)="row">
      <div class="d-flex justify-content-center">
        <div class="lfx-table-body-cmd -bottom_sidebar" :class="`-bs${row.item.statusClass}`" v-text="$t(row.item.statusLabel)" />
      </div>
    </template>
    <template #cell(volume)="row">
      <div class="lfx-table-body-volume" v-text="row.item.volume" />
    </template>
    <template #cell(open_time)="row">
      <div class="lfx-table-body-open_time">
        <span class="lfx-table-body-open_time-date" v-text="moment.unix(row.item.open_time).format('DD.MM.YYYY')" />
        <span class="lfx-table-body-open_time-time" v-text="moment.unix(row.item.open_time).format('HH:mm:ss')" />
      </div>
    </template>
    <template #cell(open_price)="row">
      <div class="lfx-table-body-open_price" :class="rowClass">
        <bdi v-if="row.item.isInvestment" v-text="row.item.open_price" />
        <bdi v-else v-text="row.item.open_price.toFixed(row.item.instrument.digits)" />
      </div>
    </template>
    <template #cell(current_level)="row">
      <div v-if="row.item.isInvestment" class="lfx-table-body-current_level" :class="rowClass" v-text="row.item.current_price" />
      <div v-else class="lfx-table-body-current_level" :class="rowClass" v-text="row.item.current_price.toFixed(row.item.instrument.digits)" />
    </template>
    <template #cell(sl)="row">
      <div v-if="row.item.isInvestment" class="lfx-table-body-sl" :class="rowClass" v-text="`${row.item.sl.toFixed(2)} ${account.currency}`" />
      <div v-else class="lfx-table-body-sl" :class="rowClass" v-text="row.item.sl.toFixed(row.item.instrument.digits)" />
    </template>
    <template #cell(tp)="row">
      <div v-if="row.item.isInvestment" class="lfx-table-body-tp" :class="rowClass" v-text="`${row.item.tp.toFixed(2)} ${account.currency}`" />
      <div v-else class="lfx-table-body-sl" :class="rowClass" v-text="row.item.tp.toFixed(row.item.instrument.digits)" />
    </template>
    <template #cell(profit)="row">
      <div class="d-flex align-items-center w-100" :class="windowWidth === 'sm' ? 'justify-content-between' : 'justify-content-end'">
        <div class="d-flex flex-column w-100" :class="windowWidth === 'sm' ? 'align-items-start' : 'align-items-end'">
          <span
            v-if="windowWidth === 'sm'"
            style="width: 100px"
            class="text-secondary-10 text-uppercase mb-1"
            :class="isRtlMode ? '' : 'text-right'"
            v-text="$t('Прибыль')"
          />
          <template v-if="[CMD_BUY, CMD_SELL].includes(row.item.cmd)">
            <div
              class="lfx-table-body-profit"
              :class="[isRtlMode ? '' : 'text-right', row.item.profitClass]"
              v-text="`${row.item.changedProfit.toFixed(2)} ${account.currency}`"
            />
            <div
              class="lfx-table-body-profitability"
              :class="[isRtlMode ? '' : 'text-right', row.item.profitClass]"
              v-text="`${row.item.profitability.toFixed(2)}%`"
            />
          </template>
          <template v-if="[CMD_BUY_LIMIT, CMD_SELL_LIMIT, CMD_BUY_STOP, CMD_SELL_STOP, CMD_BUY_STOP_LIMIT, CMD_SELL_STOP_LIMIT].includes(row.item.cmd)">
            <div class="lfx-table-body-profit" :class="isRtlMode ? '' : 'text-right'" v-text="`0.00 ${account.currency}`" />
            <div class="lfx-table-body-profitability" :class="isRtlMode ? '' : 'text-right'" v-text="'0.00%'" />
          </template>
          <div
            v-else-if="row.item.isInvestment"
            class="lfx-table-body-profit"
            :class="[isRtlMode ? '' : 'text-right', row.item.profitClass]"
            v-text="`${row.item.changedProfit.toFixed(2)} ${row.item.currency}`"
          />
        </div>
        <b-icon-chevron-right
          v-if="windowWidth === 'sm' && row.item.isInvestment"
          class="icon-gray pointer h5 m-0"
          :class="isRtlMode ? 'rotate_180' : ''"
          @click="fetchCopyForm(row.item)"
        />
        <b-icon-chevron-right
          v-else-if="windowWidth === 'sm'"
          class="icon-gray pointer h5 m-0"
          :class="isRtlMode ? 'rotate_180' : ''"
          @click="openCurrentPopup(row.item, 'trades-trade-change')"
        />
      </div>
    </template>
    <template #cell(buttons)="row">
      <div class="lfx-table-body-buttons" :class="['-bottom_sidebar', `-${dir}`]">
        <template v-if="row.item.isInvestment && row.item.status === 0">
          <b-button
            :variant="relation === 'parent' ? 'secondary' : 'outline-secondary'"
            :class="isRtlMode ? 'ml-2' : 'mr-2'"
            @click="fetchCopyForm(row.item)"
            v-text="$t('Изменить')"
          />
          <b-button
            :variant="relation === 'parent' ? 'danger' : 'outline-danger'"
            @click="stopCopying(row.item)"
            v-text="$t('Остановить')"
          />
        </template>
        <template v-else-if="!row.item.isInvestment">
          <b-button
            :variant="relation === 'parent' ? 'secondary' : 'outline-secondary'"
            :class="isRtlMode ? 'ml-2' : 'mr-2'"
            @click="openCurrentPopup(row.item, 'trades-trade-change')"
            v-text="$t('Изменить')"
          />
          <b-button
            v-if="[CMD_BUY, CMD_SELL].includes(row.item.cmd)"
            :variant="relation === 'parent' ? 'danger' : 'outline-danger'"
            @click="stopCurrentTrade(row.item)"
            v-text="$t('Закрыть')"
          />
          <b-button
            v-else-if="[CMD_BUY_LIMIT, CMD_SELL_LIMIT, CMD_BUY_STOP, CMD_SELL_STOP, CMD_BUY_STOP_LIMIT, CMD_SELL_STOP_LIMIT].includes(row.item.cmd)"
            :variant="relation === 'parent' ? 'danger' : 'outline-danger'"
            @click="stopCurrentOrder(row.item)"
            v-text="$t('Закрыть')"
          />
        </template>
      </div>
    </template>
    <template #cell(horizontal_dots)="row">
      <div
        v-if="!row.item.isInvestment || row.item.status === 0"
        :class="isRtlMode ? 'd-flex justify-content-end' : ''"
        @click="openCurrentPopup(row.item, row.item.isInvestment ? 'trades-investment' : 'trades-trade')"
      >
        <lfx-icon-dots class="pointer" />
      </div>
    </template>
    <!-- Row details -->
    <template #row-details="row">
      <lfx-table-bottom-sidebar :items="row.item.trades" :relation="'child'" />
    </template>
  </b-table>
</template>

<script>
import moment from 'moment'
import LfxIconDots from '~/components/icons/lfx-icon-dots'
import {
  CMD_BUY,
  CMD_SELL,
  CMD_BUY_LIMIT,
  CMD_SELL_LIMIT,
  CMD_BUY_STOP,
  CMD_SELL_STOP,
  CMD_BUY_STOP_LIMIT,
  CMD_SELL_STOP_LIMIT,
  CATEGORY_CURRENCY,
  CATEGORY_CRYPTO
} from '@/plugins/trading/Constants'
import LfxSymbol from '~/components/_aux/lfx-symbol'
import LfxSymbolTradingCard from '~/components/_aux/lfx-symbol-trading-card'
import LfxIconPlus from '~/components/icons/lfx-icon-plus'
import LfxIconMinus from '~/components/icons/lfx-icon-minus'

export default {
  name: 'LfxTableBottomSidebar',
  components: { LfxIconMinus, LfxIconPlus, LfxSymbolTradingCard, LfxSymbol, LfxIconDots },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    source: {
      type: String,
      default: 'desktop'
    },
    relation: {
      type: String,
      default: 'parent'
    }
  },
  data () {
    return {
      CMD_BUY,
      CMD_SELL,
      CMD_BUY_LIMIT,
      CMD_SELL_LIMIT,
      CMD_BUY_STOP,
      CMD_SELL_STOP,
      CMD_BUY_STOP_LIMIT,
      CMD_SELL_STOP_LIMIT,
      CATEGORY_CURRENCY,
      CATEGORY_CRYPTO,
      moment,
      fields: ['trades', 'symbol', 'cmd', 'volume', 'open_time', 'open_price', 'current_level', 'sl', 'tp', 'profit', 'buttons', 'horizontal_dots'],
      tableHeight: 630
    }
  },
  computed: {
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    stickyHeaderSettings () {
      return this.relation === 'child' ? null : this.source === 'desktop' ? `${this.tableHeight}px` : '100%'
    },
    changedFields () {
      return this.fields.filter((field) => {
        let result = true
        switch (this.windowWidth) {
          case 'md':
            switch (field) {
              case 'open_time':
              case 'open_price':
              case 'current_level':
              case 'sl':
              case 'tp':
                result = false
                break
              default:
                result = true
            }
            break
          case 'sm':
            switch (field) {
              case 'symbol':
              case 'profit':
                result = true
                break
              default:
                result = false
            }
        }
        return result
      }).map((field) => { return { key: field } })
    },
    rowClass () {
      return this.isRtlMode ? 'text-left' : 'text-right'
    }
  },
  methods: {
    fetchForm (formTitle) {
      this.$store.dispatch('forms/actions/handler/fetchForm', formTitle)
    },
    fetchCopyForm (item) {
      this.$store.commit('trading/mutations/handler/SAVE_OPENED_TRADE', {
        rootData: this.$store.state.trading.state.handler,
        data: item
      })
      this.fetchForm('copyAction')
    },
    openCurrentPopup (item, popupName) {
      this.$store.commit('trading/mutations/handler/SAVE_OPENED_TRADE', {
        rootData: this.$store.state.trading.state.handler,
        data: item
      })
      this.$store.dispatch('dictionaries/actions/handler/showPopup', popupName)
    },
    stopCurrentTrade (currentTrade) {
      this.$store.dispatch('trading/actions/handler/closeCurrentTrade', {
        server: currentTrade.server,
        login: currentTrade.login,
        order: currentTrade.order
      })
    },
    stopCurrentOrder (currentTrade) {
      this.$store.dispatch('trading/actions/handler/closeCurrentOrder', {
        server: currentTrade.server,
        login: currentTrade.login,
        order: currentTrade.order
      })
    },
    getProfitClass (value) {
      return value > 0 ? '-profit' : value === 0 ? '' : '-loss'
    },
    stopCopying (investment) {
      this.$store.dispatch('trading/actions/handler/stopCopying', investment.user_id)
    },
    openItem (item) {
      this.$emit('hide-table')
      this.$instrument.openInstrumentTrader(item)
    },
    openCurrentInstrument (instrument) {
      console.warn('instrument', instrument)
    }
  }
}
</script>
