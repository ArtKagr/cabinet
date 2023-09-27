<template>
  <b-table
    :fields="changedFields"
    :items="items"
    :class="`lfx-table -copiers_history -${windowWidth}`"
    :thead-class="`lfx-table-head -copiers_history -${windowWidth}`"
    :tbody-class="`lfx-table-body -copiers_history -${windowWidth}`"
    :tbody-tr-class="`lfx-table-body-row -copiers_history -${windowWidth}`"
  >
    <!-- Head -->
    <template #head(symbol)>
      <div class="lfx-table-head-symbol" :class="isRtlMode ? '-text_right mr-2' : '-text_left ml-2'" v-text="$t('Трейдер')" />
    </template>
    <template #head(open_time)>
      <div class="lfx-table-head-open_time" v-text="$t('Дата и время открытия')" />
    </template>
    <template #head(close_time)>
      <div class="lfx-table-head-close_time" v-text="$t('Дата и время закрытия')" />
    </template>
    <template #head(open_price)>
      <div class="lfx-table-head-open_price" v-text="$t('Точка входа')" />
    </template>
    <template #head(close_price)>
      <div class="lfx-table-head-close_price" v-text="$t('Выход')" />
    </template>
    <template #head(profit)>
      <div class="lfx-table-head-profit" :class="`-${dir}`" v-text="windowWidth === 'sm' ? '' : $t('Результат торговли')" />
    </template>
    <template #head(my_profit)>
      <div class="lfx-table-head-my_profit" :class="`-${dir}`" v-text="windowWidth === 'sm' ? '' : $t('Моя прибыль')" />
    </template>
    <template #head(horizontal_dots)>
      <div class="lfx-table-head-horizontal_dots" />
    </template>
    <!-- Rows -->
    <template #cell(symbol)="row">
      <div class="d-flex align-items-center" @click="openInstrumentTrader(row.item)">
        <img
          v-if="row.item.avatar_url"
          class="lfx-table-body-trader_logo"
          :class="isRtlMode ? 'ml-3' : 'mr-3'"
          :src="row.item.avatar_url"
          alt
        >
        <div
          v-else
          class="lfx-table-body-trader_logo -empty"
          :class="isRtlMode ? 'ml-3' : 'mr-3'"
        >
          <span v-text="row.item.avatar_name" />
        </div>
        <div class="d-flex flex-column">
          <span class="lfx-table-body-symbol -copiers" :class="isRtlMode ? 'text-right' : ''" v-text="row.item.name" />
          <span v-if="windowWidth === 'sm'" class="text-secondary-10 text-uppercase mb-1 mt-1" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Результат торговли')" />
          <div
            v-if="windowWidth === 'sm'"
            class="lfx-table-body-profit"
            :class="[isRtlMode ? 'text-right' : '', getProfitClass(Number(row.item.profit))]"
            v-text="`${Number(row.item.profit).toFixed(2)} ${row.item.currency}`"
          />
        </div>
      </div>
    </template>
    <template #cell(open_time)="row">
      <div class="lfx-table-body-open_time">
        <span class="lfx-table-body-open_time-date" v-text="moment(row.item.date_start).format('DD.MM.YYYY')" />
        <span class="lfx-table-body-open_time-time" v-text="moment(row.item.date_start).format('HH:mm:ss')" />
      </div>
    </template>
    <template #cell(close_time)="row">
      <div class="lfx-table-body-close_time">
        <span class="lfx-table-body-open_time-date" v-text="moment(row.item.date_end).format('DD.MM.YYYY')" />
        <span class="lfx-table-body-open_time-time" v-text="moment(row.item.date_end).format('HH:mm:ss')" />
      </div>
    </template>
    <template #cell(open_price)="row">
      <div class="lfx-table-body-open_price">
        <bdi v-text="row.item.profit_start" />
      </div>
    </template>
    <template #cell(close_price)="row">
      <div class="lfx-table-body-close_price">
        <bdi v-text="row.item.profit_end" />
      </div>
    </template>
    <template #cell(profit)="row">
      <div class="d-flex align-items-center w-100" :class="windowWidth === 'sm' ? 'justify-content-between' : 'justify-content-end'">
        <div class="d-flex flex-column w-100" :class="windowWidth === 'sm' ? 'align-items-start' : 'align-items-end'">
          <span v-if="windowWidth === 'sm'" class="text-secondary-10 text-uppercase mb-1" v-text="$t('Результат торговли')" />
          <bdi
            class="lfx-table-body-profit"
            :class="getProfitClass(Number(row.item.profit))"
            v-text="`${Number(row.item.profit).toFixed(2)} ${row.item.currency}`"
          />
        </div>
      </div>
    </template>
    <template #cell(my_profit)="row">
      <div class="d-flex align-items-center w-100" :class="windowWidth === 'sm' ? 'justify-content-between' : 'justify-content-end'">
        <div class="d-flex flex-column w-100" :class="windowWidth === 'sm' ? 'align-items-start' : 'align-items-end'">
          <span v-if="windowWidth === 'sm'" class="text-secondary-10 text-uppercase mb-1" v-text="$t('Моя прибыль')" />
          <bdi
            class="lfx-table-body-profit"
            :class="[isRtlMode ? 'text-left' : 'text-right', getProfitClass(Number(row.item.commission))]"
            v-text="`${Number(row.item.commission).toFixed(2)} ${row.item.currency}`"
          />
        </div>
        <template>
          <b-icon-chevron-right
            v-if="windowWidth === 'sm'"
            class="icon-gray pointer h5 m-0"
            :class="isRtlMode ? 'rotate_180' : ''"
            @click="openCurrentCopier(row.item, 'copiers-history')"
          />
        </template>
      </div>
    </template>
    <template #cell(horizontal_dots)="row">
      <div class="d-flex align-items-center" @click="openCurrentCopier(row.item, 'copiers-history')">
        <lfx-icon-dots class="pointer mx-auto" />
      </div>
    </template>
  </b-table>
</template>

<script>
import moment from 'moment'
import LfxIconDots from '~/components/icons/lfx-icon-dots'

export default {
  name: 'LfxTableCopiersHistory',
  components: { LfxIconDots },
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
      fields: ['symbol', 'open_time', 'close_time', 'open_price', 'close_price', 'profit', 'my_profit', 'horizontal_dots']
    }
  },
  computed: {
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
              case 'close_price':
                result = false
                break
              default:
                result = true
            }
            break
          case 'sm':
            switch (field) {
              case 'open_time':
              case 'close_time':
              case 'open_price':
              case 'close_price':
              case 'profit':
              case 'horizontal_dots':
                result = false
                break
              default:
                result = true
            }
        }
        return result
      }).map((field) => { return { key: field } })
    }

  },
  methods: {
    openCurrentCopier (currentCopier, popupName) {
      this.$store.commit('profile/mutations/handler/SAVE_CURRENT_COPIER', { rootData: this.$store.state.profile.state.handler, data: currentCopier })
      this.$store.dispatch('dictionaries/actions/handler/showPopup', popupName)
    },
    getProfitClass (value) {
      return value > 0 ? '-profit' : value === 0 ? '' : '-loss'
    },
    openInstrumentTrader (item) {
      this.$instrument.openInstrumentTrader(item)
    }
  }
}
</script>
