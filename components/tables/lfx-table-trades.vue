<template>
  <b-table
    :fields="changedFields"
    :items="items"
    :class="`lfx-table -trades -${windowWidth}`"
    :thead-class="`lfx-table-head -trades -${windowWidth}`"
    :tbody-class="`lfx-table-body -trades -${windowWidth}`"
    :tbody-tr-class="`lfx-table-body-row -trades -${windowWidth}`"
  >
    <!-- Head -->
    <template #head(symbol)>
      <div class="lfx-table-head-symbol" :class="isRtlMode ? '-text_right mr-4' : '-text_left ml-4'" v-text="`${$t('Инструмент')} | ${$t('Трейдер')}`" />
    </template>
    <template #head(cmd)>
      <div class="lfx-table-head-cmd -primary" v-text="$t('Тип')" />
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
      <div class="lfx-table-head-profit -primary -trades" :class="`-${dir}`" v-text="$t('Прибыль')" />
    </template>
    <template #head(buttons)>
      <div class="lfx-table-head-buttons" />
    </template>
    <template #head(horizontal_dots)>
      <div class="lfx-table-head-horizontal_dots" />
    </template>
    <!-- Rows -->
    <template #cell(symbol)="row">
      <div class="d-flex align-items-center ml-2" @click="openCurrentInstrument(row.item)">
        <div v-if="windowWidth === 'sm'" class="d-flex flex-column">
          <div v-if="row.item.isInvestment" class="d-flex align-items-center">
            <img v-if="row.item.image" class="lfx-table-body-trader_logo" :class="isRtlMode ? 'ml-3' : 'mr-3'" :src="row.item.image" alt>
            <div v-else class="lfx-table-body-trader_logo -empty" :class="isRtlMode ? 'ml-3' : 'mr-3'">
              <span v-text="row.item.name" />
            </div>
            <div class="d-flex flex-column">
              <div class="lfx-table-body-symbol" :class="isRtlMode ? 'text-right' : ''" v-text="row.item.symbol" />
              <div class="d-flex mt-1">
                <div class="lfx-table-body-cmd" :class="[isRtlMode ? 'text-right' : '', `-bs${row.item.statusClass}`]" v-text="$t(row.item.statusLabel)" />
              </div>
              <div class="lfx-table-body-volume mt-1" :class="isRtlMode ? 'text-right' : ''" v-text="row.item.volume" />
            </div>
          </div>
          <div v-else class="d-flex align-items-center">
            <lfx-symbol-trading-card :symbol="row.item.instrument.symbol_original" :class="isRtlMode ? 'ml-3' : 'mr-3'" />
            <div class="d-flex flex-column">
              <div class="lfx-table-body-symbol" :class="isRtlMode ? 'text-right' : ''" v-text="row.item.instrument.symbol_original" />
              <div class="d-flex mt-1">
                <div class="lfx-table-body-cmd" :class="[isRtlMode ? 'text-right' : '', row.item.statusClass]" v-text="$t(row.item.statusLabel)" />
              </div>
              <div class="lfx-table-body-volume mt-1" :class="isRtlMode ? 'text-right' : ''" v-text="row.item.volume" />
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="row.item.isInvestment" class="d-flex align-items-center">
            <img v-if="row.item.image" class="lfx-table-body-trader_logo" :class="isRtlMode ? 'ml-3' : 'mr-3'" :src="row.item.image" alt>
            <div v-else class="lfx-table-body-trader_logo -empty" :class="isRtlMode ? 'ml-3' : 'mr-3'">
              <span v-text="row.item.name" />
            </div>
            <div class="lfx-table-body-symbol" :class="isRtlMode ? 'text-right' : ''" v-text="row.item.symbol" />
          </div>
          <div v-else class="d-flex align-items-center">
            <lfx-symbol :symbol="row.item.instrument.symbol_original" :class="isRtlMode ? 'ml-3' : 'mr-3'" />
            <div class="lfx-table-body-symbol" :class="isRtlMode ? 'text-right' : ''" v-text="row.item.instrument.symbol_original" />
          </div>
        </div>
      </div>
    </template>
    <template #cell(cmd)="row">
      <div class="d-flex justify-content-center">
        <div class="lfx-table-body-cmd" :class="row.item.statusClass" v-text="$t(row.item.statusLabel)" />
      </div>
    </template>
    <template #cell(volume)="row">
      <div class="d-flex justify-content-center">
        <bdi class="lfx-table-body-volume" v-text="row.item.volume" />
      </div>
    </template>
    <template #cell(open_time)="row">
      <div class="lfx-table-body-open_time">
        <span class="lfx-table-body-open_time-date" v-text="moment.unix(row.item.open_time).format('DD.MM.YYYY')" />
        <span class="lfx-table-body-open_time-time" v-text="moment.unix(row.item.open_time).format('HH:mm:ss')" />
      </div>
    </template>
    <template #cell(open_price)="row">
      <bdi v-if="row.item.isInvestment" class="lfx-table-body-open_price" v-text="row.item.open_price" />
      <bdi v-else class="lfx-table-body-open_price" v-text="row.item.open_price.toFixed(row.item.instrument.digits)" />
    </template>
    <template #cell(current_level)="row">
      <bdi v-if="row.item.isInvestment" class="lfx-table-body-current_level" v-text="row.item.current_price" />
      <bdi v-else class="lfx-table-body-current_level" v-text="row.item.current_price.toFixed(row.item.instrument.digits)" />
    </template>
    <template #cell(sl)="row">
      <bdi v-if="row.item.isInvestment" class="lfx-table-body-sl" v-text="`${row.item.sl.toFixed(2)} ${account.currency}`" />
      <bdi v-else class="lfx-table-body-sl" v-text="row.item.sl.toFixed(row.item.instrument.digits)" />
    </template>
    <template #cell(tp)="row">
      <bdi v-if="row.item.isInvestment" class="lfx-table-body-tp" v-text="`${row.item.tp.toFixed(2)} ${account.currency}`" />
      <bdi v-else class="lfx-table-body-sl" v-text="row.item.tp.toFixed(row.item.instrument.digits)" />
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
            <bdi
              class="lfx-table-body-profit"
              :class="[isRtlMode ? '' : 'text-right', row.item.profitClass]"
              v-text="`${row.item.changedProfit.toFixed(2)} ${account.currency}`"
            />
            <bdi
              class="lfx-table-body-profitability"
              :class="[isRtlMode ? '' : 'text-right', row.item.profitClass]"
              v-text="`${row.item.profitability.toFixed(2)}%`"
            />
          </template>
          <template v-if="[CMD_BUY_LIMIT, CMD_SELL_LIMIT, CMD_BUY_STOP, CMD_SELL_STOP, CMD_BUY_STOP_LIMIT, CMD_SELL_STOP_LIMIT].includes(row.item.cmd)">
            <bdi class="lfx-table-body-profit" :class="isRtlMode ? '' : 'text-right'" v-text="`0.00 ${account.currency}`" />
            <bdi class="lfx-table-body-profitability" :class="isRtlMode ? '' : 'text-right'" v-text="'0.00%'" />
          </template>
          <bdi
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
      <div class="lfx-table-body-buttons" :class="`-${dir}`">
        <template v-if="row.item.isInvestment && row.item.status === 0">
          <b-button
            variant="secondary"
            :class="isRtlMode ? 'ml-2' : 'mr-2'"
            @click="fetchCopyForm(row.item)"
            v-text="$t('Изменить')"
          />
          <b-button
            variant="danger"
            @click="stopCopying(row.item)"
            v-text="$t('Остановить')"
          />
        </template>
        <template v-else-if="!row.item.isInvestment">
          <b-button
            variant="secondary"
            :class="isRtlMode ? 'ml-2' : 'mr-2'"
            @click="openCurrentPopup(row.item, 'trades-trade-change')"
            v-text="$t('Изменить')"
          />
          <b-button
            v-if="[CMD_BUY, CMD_SELL].includes(row.item.cmd)"
            variant="danger"
            @click="stopCurrentTrade(row.item)"
            v-text="$t('Закрыть')"
          />
          <b-button
            v-else-if="[CMD_BUY_LIMIT, CMD_SELL_LIMIT, CMD_BUY_STOP, CMD_SELL_STOP, CMD_BUY_STOP_LIMIT, CMD_SELL_STOP_LIMIT].includes(row.item.cmd)"
            variant="danger"
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
  </b-table>
</template>

<script>
import moment from 'moment'
import LfxIconDots from '~/components/icons/lfx-icon-dots'
import LfxSymbol from '~/components/_aux/lfx-symbol'
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
export default {
  name: 'LfxTableTrades',
  components: { LfxSymbolTradingCard, LfxSymbol, LfxIconDots },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fields: ['symbol', 'cmd', 'volume', 'open_time', 'open_price', 'current_level', 'sl', 'tp', 'profit', 'buttons', 'horizontal_dots'],
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
      moment
    }
  },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
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
    stopCopying (investment) {
      this.$store.dispatch('trading/actions/handler/stopCopying', investment.user_id)
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
    openCurrentInstrument (item) {
      if (item.isInvestment) {
        this.$router.push(`/${this.routePages.locale}/traders/${item.user_id}`)
        this.$store.commit('dictionaries/mutations/handler/SAVE_ACTIVE_MAIN_MENU_BUTTON', {
          rootData: this.$store.state.dictionaries.state.handler,
          data: 'traders'
        })
      } else {
        this.$router.push(`/${this.routePages.locale}/trading/${item.page}/${item.instrument.symbol_original}`)
        this.$store.commit('dictionaries/mutations/handler/SAVE_ACTIVE_MAIN_MENU_BUTTON', {
          rootData: this.$store.state.dictionaries.state.handler,
          data: 'trading'
        })
      }
    }
  }
}
</script>
