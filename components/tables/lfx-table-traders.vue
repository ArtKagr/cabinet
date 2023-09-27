<template>
  <b-table
    :fields="changedFields"
    :items="items"
    :class="`lfx-table -traders -${windowWidthAdvance}`"
    :thead-class="`lfx-table-head -traders -${windowWidthAdvance}`"
    :tbody-class="`lfx-table-body -traders -${windowWidthAdvance}`"
    :tbody-tr-class="`lfx-table-body-row -traders -${windowWidthAdvance}`"
    @scroll.native="scrollTable"
  >
    <!-- Head -->
    <template #head(favorite)>
      <div />
    </template>
    <template #head(symbol)>
      <div class="lfx-table-head-symbol -text_left" v-text="$t('Трейдер')" />
    </template>
    <template #head(trade_period)>
      <div class="lfx-table-head-trade_period -text_left -primary" v-text="$t('Срок торговли')" />
    </template>
    <template #head(risk)>
      <div class="lfx-table-head-risk -text_left -primary" v-text="$t('Риск')" />
    </template>
    <template #head(chart)>
      <div class="lfx-table-head-chart -text_left" v-text="$t('График')" />
    </template>
    <template #head(profit_traders)>
      <div class="lfx-table-head-profit_traders -primary" v-text="$t('Доходность')" />
    </template>
    <template #head(commission)>
      <div class="lfx-table-head-commission -text_left" v-text="$t('Комиссия')" />
    </template>
    <template #head(copy)>
      <div class="lfx-table-head-copy -text_left" v-text="$t('Копируют')" />
    </template>
    <template #head(aggregate_funds)>
      <div class="lfx-table-head-aggregate_funds -text_left -primary" v-text="$t('Совокупные средства')" />
    </template>
    <template #head(trader_buttons)>
      <div />
    </template>
    <!-- Rows -->
    <template #cell(favorite)="row">
      <div class="lfx-table-body-favorite">
        <lfx-icon-star v-if="row.item.favorite" class="pointer" @click.native="toggleFavorite($event, false, row.item.user_id)" />
        <lfx-icon-star-empty v-else class="pointer" @click.native="toggleFavorite($event, true, row.item.user_id)" />
      </div>
    </template>
    <template #cell(symbol)="row">
      <div class="d-flex align-items-center">
        <img v-if="row.item.avatar_url" class="trading-page-card-head-trader_logo -table" :src="row.item.avatar_url" alt>
        <div v-else class="trading-page-card-head-trader_logo -table">
          <span v-if="row.item.avatar_name" class="text-uppercase" v-text="row.item.avatar_name" />
        </div>
        <div v-if="windowWidthAdvance === 'sm'" class="d-flex flex-column">
          <div class="lfx-table-body-symbol" v-text="row.item.symbol_original || row.item.name || row.item.username" />
          <div class="lfx-table-body-volume mt-1" v-text="row.item.type_label === 'label_blue' ? '' : row.item.volume" />
        </div>
        <div v-else class="lfx-table-body-symbol" v-text="row.item.symbol || row.item.name || row.item.username" />
      </div>
    </template>
    <template #cell(trade_period)="row">
      <div class="lfx-table-body-trade_period" v-text="`${row.item.days} дн.`" />
    </template>
    <template #cell(risk)="row">
      <lfx-circle-progress :data-value="Number(row.item.risk)" />
    </template>
    <template #cell(chart)="row">
      <div class="trading-page-card-chart -table mt-2">
        <div class="trading-page-card-chart-line -table">
          <sparkline :width="240" height="50">
            <sparklineCurve :data="row.item.graph" :limit="row.item.graph.length" :styles="chartStyle" />
          </sparkline>
        </div>
        <div class="trading-page-card-chart-base -table" />
      </div>
    </template>
    <template #cell(profit_traders)="row">
      <div
        class="lfx-table-body-profit_traders"
        :class="row.item.profit > 0 ? 'text-success-15' : row.item.profit < 0 ? 'text-danger-15' : 'text-dark-primary-15'"
        v-text="`${row.item.profit}%`"
      />
    </template>
    <template #cell(commission)="row">
      <div class="lfx-table-body-commission" v-text="`${row.item.profit_sharing}%`" />
    </template>
    <template #cell(copy)="row">
      <div class="lfx-table-body-copy" v-text="row.item.investors_count" />
    </template>
    <template #cell(aggregate_funds)="row">
      <div class="lfx-table-body-aggregate_funds" v-text="getInvestorsEquity(row.item.investors_equity + row.item.trader_equity)" />
    </template>
    <template #cell(trader_buttons)="row">
      <div class="lfx-table-body-trading_buttons">
        <buttons :card="row.item" source="table" />
      </div>
    </template>
  </b-table>
</template>

<script>
import moment from 'moment'
import LfxCircleProgress from '~/components/_aux/lfx-circle-progress'
import LfxIconStar from '~/components/icons/lfx-icon-star'
import LfxIconStarEmpty from '~/components/icons/lfx-icon-star-empty'
import Buttons from '~/components/traders/card/buttons.vue'
export default {
  name: 'LfxTableTraders',
  components: { LfxCircleProgress, Buttons, LfxIconStar, LfxIconStarEmpty },
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
      moment,
      chartStyle: { stroke: '#93CEF3', fill: '#DCf0FB', fillOpacity: 1, strokeWidth: 2, zIndex: 1 },
      fields: ['favorite', 'symbol', 'trade_period', 'risk', 'chart', 'profit_traders', 'commission', 'copy', 'aggregate_funds', 'trader_buttons'],
      isTableTop: true,
      isTableBottom: false
    }
  },
  computed: {
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    windowWidthAdvance () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentTradingWindowWidth']
    },
    changedFields () {
      return this.fields.filter((field) => {
        let result = true
        switch (this.windowWidthAdvance) {
          case 'lg-md':
            switch (field) {
              case 'chart':
                result = false
                break
            }
            break
          case 'md':
            switch (field) {
              case 'chart':
              case 'trader_buttons':
              case 'aggregate_funds':
              case 'trade_period':
                result = false
                break
            }
            break
          case 'sm':
            switch (field) {
              case 'chart':
              case 'trader_buttons':
              case 'aggregate_funds':
              case 'copy':
              case 'trade_period':
              case 'risk':
              case 'commission':
                result = false
                break
            }
        }
        return result
      }).map((field) => { return { key: field } })
    },
    tradersDataManage () {
      return this.$store.getters['traders/getters/handler/getTradersFilter']
    }
  },
  methods: {
    scrollTable (event) {
      this.isTableTop = event.target.scrollTop === 0
      this.isTableBottom = Math.abs(Math.round((this.items.length * 75 - event.target.clientHeight - event.target.scrollTop) / 100) * 100) === 0
    },
    getInvestorsEquity (value) {
      let multiply = Math.round(value).toString().split('')
      multiply.pop()
      multiply = Number(multiply.map((item, index) => index === 0 ? 1 : 0).join(''))
      return `${this.currentNumberFormat(Math.round(value / multiply) * multiply, 'symbol')} ${this.account.currency}`
    },
    currentNumberFormat (payload, symbol = null) {
      const data = symbol ? payload > 0 ? '~' : '' : ''
      const result = this.$numberFormat(payload, 0)
      return this.isRtlMode
        ? symbol ? result.split(' ').reverse().join(' ') + data : result
        : symbol ? data + result : result
    },
    toggleFavorite (e, flag, payload) {
      e.stopPropagation()
      this.$store.dispatch('traders/actions/handler/toggleFavoriteTrader', {
        source: 'list',
        trader: payload
      })
    }
  }
}
</script>
