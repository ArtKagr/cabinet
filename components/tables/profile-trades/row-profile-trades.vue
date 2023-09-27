<template>
  <div class="custom-table-row-container -profile_trades" :class="[`-${relation}`, isChildShown ? '-opened' : '', `-${dir}`]">
    <div class="custom-table-row-profile_trades" :class="[`-${relation}`, isChildShown ? '-opened' : '', `-${dir}`]">
      <div v-for="column in columns" :key="column[0]" class="custom-table-row-profile_trades-column" :class="`-${column[0]}`">
        <template v-if="column[0] === 'symbol'">
          <div class="d-flex align-items-center ml-2" @click="openItem(row)">
            <div v-if="windowWidth === 'sm'" class="d-flex flex-column">
              <div v-if="row.isInvestment" class="d-flex align-items-center">
                <img v-if="row.image" class="lfx-table-body-trader_logo -profile_trades" :class="isRtlMode ? 'ml-3' : 'mr-3'" :src="row.image" alt>
                <div v-else class="lfx-table-body-trader_logo -empty" :class="isRtlMode ? 'ml-3' : 'mr-3'">
                  <span v-text="row.name" />
                </div>
                <div class="d-flex flex-column">
                  <div class="lfx-table-body-symbol" :class="isRtlMode ? 'text-right' : ''" v-text="row.symbol" />
                  <div class="d-flex mt-1">
                    <div class="lfx-table-body-cmd" :class="[isRtlMode ? 'text-right' : '', `-bs${row.statusClass}`]" v-text="$t(row.statusLabel)" />
                  </div>
                  <div class="lfx-table-body-volume mt-1" :class="isRtlMode ? 'text-right' : ''" v-text="row.volume" />
                </div>
              </div>
              <div v-else class="d-flex align-items-center">
                <lfx-symbol-trading-card :symbol="row.instrument.symbol_original" :class="isRtlMode ? 'ml-3' : 'mr-3'" />
                <div class="d-flex flex-column">
                  <div class="lfx-table-body-symbol" :class="isRtlMode ? 'text-right' : ''" v-text="row.instrument.symbol_original" />
                  <div class="d-flex mt-1">
                    <div class="lfx-table-body-cmd" :class="[isRtlMode ? 'text-right' : '', row.statusClass]" v-text="$t(row.statusLabel)" />
                  </div>
                  <div class="lfx-table-body-volume mt-1" :class="isRtlMode ? 'text-right' : ''" v-text="row.volume" />
                </div>
              </div>
            </div>
            <div v-else>
              <div v-if="row.isInvestment" class="d-flex align-items-center">
                <img v-if="row.image" class="lfx-table-body-trader_logo -profile_trades" :class="isRtlMode ? 'ml-3' : 'mr-3'" :src="row.image" alt>
                <div v-else class="lfx-table-body-trader_logo -empty" :class="isRtlMode ? 'ml-3' : 'mr-3'">
                  <span v-text="row.name" />
                </div>
                <div class="lfx-table-body-symbol" :class="isRtlMode ? 'text-right' : ''" v-text="row.symbol" />
              </div>
              <div v-else class="d-flex align-items-center">
                <lfx-symbol :symbol="row.instrument.symbol_original" :class="isRtlMode ? 'ml-3' : 'mr-3'" />
                <div class="lfx-table-body-symbol" :class="isRtlMode ? 'text-right' : ''" v-text="row.instrument.symbol_original" />
              </div>
            </div>
          </div>
        </template>
        <template v-if="column[0] === 'cmd'">
          <div class="d-flex justify-content-center">
            <div class="lfx-table-body-cmd -bottom_sidebar" :class="`-bs${row.statusClass}`" v-text="$t(row.statusLabel)" />
          </div>
        </template>
        <template v-if="column[0] === 'volume'">
          <div class="lfx-table-body-volume" v-text="row.volume" />
        </template>
        <template v-if="column[0] === 'open_time'">
          <div class="lfx-table-body-open_time">
            <span class="lfx-table-body-open_time-date" v-text="moment.unix(row.open_time).format('DD.MM.YYYY')" />
            <span class="lfx-table-body-open_time-time" v-text="moment.unix(row.open_time).format('HH:mm:ss')" />
          </div>
        </template>
        <template v-if="column[0] === 'open_price'">
          <div class="lfx-table-body-open_price" :class="rowClass">
            <bdi v-if="row.isInvestment" v-text="row.open_price" />
            <bdi v-else v-text="row.open_price.toFixed(row.instrument.digits)" />
          </div>
        </template>
        <template v-if="column[0] === 'current_level'">
          <div v-if="row.isInvestment" class="lfx-table-body-current_level" :class="rowClass" v-text="row.current_price" />
          <div v-else class="lfx-table-body-current_level" :class="rowClass" v-text="row.current_price.toFixed(row.instrument.digits)" />
        </template>
        <template v-if="column[0] === 'sl'">
          <div v-if="row.isInvestment" class="lfx-table-body-sl" :class="rowClass" v-text="`${row.sl.toFixed(2)} ${account.currency}`" />
          <div v-else class="lfx-table-body-sl" :class="rowClass" v-text="row.sl.toFixed(row.instrument.digits)" />
        </template>
        <template v-if="column[0] === 'tp'">
          <div v-if="row.isInvestment" class="lfx-table-body-tp" :class="rowClass" v-text="`${row.tp.toFixed(2)} ${account.currency}`" />
          <div v-else class="lfx-table-body-sl" :class="rowClass" v-text="row.tp.toFixed(row.instrument.digits)" />
        </template>
        <template v-if="column[0] === 'changedProfit'">
          <div class="d-flex align-items-center w-100" :class="windowWidth === 'sm' ? 'justify-content-between' : 'justify-content-end'">
            <div class="d-flex flex-column w-100" :class="windowWidth === 'sm' ? 'align-items-start' : 'align-items-end'">
              <span
                v-if="windowWidth === 'sm'"
                style="width: 100px"
                class="text-secondary-10 text-uppercase mb-1"
                :class="isRtlMode ? '' : 'text-right'"
                v-text="$t('Прибыль')"
              />
              <template v-if="[CMD_BUY, CMD_SELL].includes(row.cmd)">
                <bdi
                  class="lfx-table-body-profit"
                  :class="[isRtlMode ? '' : 'text-right', row.profitClass]"
                  v-text="`${row.changedProfit.toFixed(2)} ${account.currency}`"
                />
                <bdi
                  class="lfx-table-body-profitability"
                  :class="[isRtlMode ? '' : 'text-right', row.profitClass]"
                  v-text="`${row.profitability.toFixed(2)}%`"
                />
              </template>
              <template v-if="[CMD_BUY_LIMIT, CMD_SELL_LIMIT, CMD_BUY_STOP, CMD_SELL_STOP, CMD_BUY_STOP_LIMIT, CMD_SELL_STOP_LIMIT].includes(row.cmd)">
                <bdi class="lfx-table-body-profit" :class="isRtlMode ? '' : 'text-right'" v-text="`0.00 ${account.currency}`" />
                <bdi class="lfx-table-body-profitability" :class="isRtlMode ? '' : 'text-right'" v-text="'0.00%'" />
              </template>
              <bdi
                v-else-if="row.isInvestment"
                class="lfx-table-body-profit"
                :class="[isRtlMode ? '' : 'text-right', row.profitClass]"
                v-text="`${row.changedProfit.toFixed(2)} ${row.currency}`"
              />
            </div>
            <b-icon-chevron-right
              v-if="windowWidth === 'sm' && row.isInvestment"
              class="icon-gray pointer h5 m-0"
              :class="isRtlMode ? 'rotate_180' : ''"
              @click="fetchCopyForm(row)"
            />
            <b-icon-chevron-right
              v-else-if="windowWidth === 'sm'"
              class="icon-gray pointer h5 m-0"
              :class="isRtlMode ? 'rotate_180' : ''"
              @click="openCurrentPopup(row, 'trades-trade-change')"
            />
          </div>
        </template>
        <template v-if="column[0] === 'buttons'">
          <div class="lfx-table-body-buttons d-flex align-items-center" :class="['-bottom_sidebar', `-${dir}`]">
            <template v-if="row.isInvestment && row.status === 0">
              <b-button
                :variant="relation === 'parent' ? 'secondary' : 'outline-secondary'"
                :class="isRtlMode ? 'ml-2' : 'mr-2'"
                @click="fetchCopyForm(row)"
                v-text="$t('Изменить')"
              />
              <b-button
                :variant="relation === 'parent' ? 'danger' : 'outline-danger'"
                @click="stopCopying(row)"
                v-text="$t('Остановить')"
              />
            </template>
            <template v-else-if="!row.isInvestment">
              <b-button
                :variant="relation === 'parent' ? 'secondary' : 'outline-secondary'"
                :class="isRtlMode ? 'ml-2' : 'mr-2'"
                @click="openCurrentPopup(row, 'trades-trade-change')"
                v-text="$t('Изменить')"
              />
              <b-button
                v-if="[CMD_BUY, CMD_SELL].includes(row.cmd)"
                :variant="relation === 'parent' ? 'danger' : 'outline-danger'"
                @click="stopCurrentTrade(row)"
                v-text="$t('Закрыть')"
              />
              <b-button
                v-else-if="[CMD_BUY_LIMIT, CMD_SELL_LIMIT, CMD_BUY_STOP, CMD_SELL_STOP, CMD_BUY_STOP_LIMIT, CMD_SELL_STOP_LIMIT].includes(row.item.cmd)"
                :variant="relation === 'parent' ? 'danger' : 'outline-danger'"
                @click="stopCurrentOrder(row)"
                v-text="$t('Закрыть')"
              />
            </template>
          </div>
        </template>
        <template v-if="column[0] === 'horizontal_dots'">
          <div
            v-if="!row.isInvestment || row.status === 0"
            :class="isRtlMode ? 'd-flex justify-content-end' : ''"
            @click="openCurrentPopup(row, row.isInvestment ? 'trades-investment' : 'trades-trade')"
          >
            <lfx-icon-dots class="pointer" />
          </div>
        </template>
      </div>
    </div>
    <div v-if="relation === 'parent' && isChildShown" class="custom-table-row-container-trades">
      <tables-columns-row-bottom-sidebar v-for="(trade, key) in row.trades" :key="key" :columns="columns" :row="trade" relation="child" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
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
import LfxSymbolTradingCard from '~/components/_aux/lfx-symbol-trading-card'
import LfxSymbol from '~/components/_aux/lfx-symbol'
import LfxIconDots from '~/components/icons/lfx-icon-dots'
export default {
  name: 'RowProfileTrades',
  components: {
    LfxIconDots,
    LfxSymbol,
    LfxSymbolTradingCard
  },
  props: {
    columns: {
      type: Array,
      default: () => ([])
    },
    row: {
      type: Object,
      default: () => ({})
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
      isChildShown: false
    }
  },
  computed: {
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    rowClass () {
      return this.isRtlMode ? 'text-left' : 'text-right'
    }
  },
  methods: {
    openItem (item) {
      this.$emit('open-item', item)
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
    toggleChildVisible () {
      this.isChildShown = !this.isChildShown
    }
  }
}
</script>
