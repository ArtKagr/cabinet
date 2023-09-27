<template>
  <b-table
    :fields="changedFields"
    :items="items"
    :class="`lfx-table -copiers -${windowWidth}`"
    :thead-class="`lfx-table-head -copiers -${windowWidth}`"
    :tbody-class="`lfx-table-body -copiers -${windowWidth}`"
    :tbody-tr-class="`lfx-table-body-row -copiers -${windowWidth}`"
  >
    <!-- Head -->
    <template #head(symbol)>
      <div class="lfx-table-head-symbol" :class="isRtlMode ? '-text_right mr-2' : '-text_left ml-2'" v-text="$t('Трейдер')" />
    </template>
    <template #head(duration)>
      <div class="lfx-table-head-duration" v-text="$t('Длительность')" />
    </template>
    <template #head(copy_type)>
      <div class="lfx-table-head-copy_type" v-text="$t('Тип копирования')" />
    </template>
    <template #head(amount)>
      <div class="lfx-table-head-amount" v-text="$t('Сумма копирования')" />
    </template>
    <template #head(profit)>
      <div class="lfx-table-head-profit" v-text="windowWidth === 'sm' ? '' : $t('Результат торговли')" />
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
          <span
            class="lfx-table-body-symbol -copiers"
            :class="isRtlMode ? 'text-right' : ''"
            v-text="row.item.name"
          />
          <span
            v-if="windowWidth === 'sm'"
            class="text-secondary-10 text-uppercase mb-1 mt-1"
            :class="isRtlMode ? 'text-right' : ''"
            v-text="$t('Моя прибыль')"
          />
          <div
            v-if="windowWidth === 'sm'"
            class="lfx-table-body-profit"
            :class="[isRtlMode ? 'text-right' : '', getProfitClass(Number(row.item.commission))]"
            v-text="`${Number(row.item.commission).toFixed(2)} ${row.item.currency}`"
          />
        </div>
      </div>
    </template>
    <template #cell(duration)="row">
      <div class="d-flex align-items-center justify-content-center w-100">
        <span class="text-center" :class="row.item.pause ? 'text-secondary-15' : 'text-dark-primary-15'" v-text="$pluralize(row.item.duration, [$t('день'), $t('дня'), $t('дней')])" />
      </div>
    </template>
    <template #cell(copy_type)="row">
      <div class="d-flex align-items-center justify-content-center w-100">
        <span class="text-center text-uppercase" :class="row.item.pause ? 'text-secondary-10' : 'text-dark-primary-10'" v-text="row.item.copy_type" />
      </div>
    </template>
    <template #cell(amount)="row">
      <div class="d-flex align-items-center justify-content-center w-100">
        <bdi class="text-center text-uppercase" :class="row.item.pause ? 'text-secondary-15' : 'text-dark-primary-15'" v-text="`${row.item.amount} ${row.item.currency}`" />
      </div>
    </template>
    <template #cell(profit)="row">
      <div class="d-flex align-items-center w-100" :class="windowWidth === 'sm' ? 'justify-content-between' : 'justify-content-center'">
        <div class="d-flex flex-column w-100" :class="windowWidth === 'sm' ? 'align-items-start' : 'align-items-center'">
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
      <div class="d-flex align-items-center w-100" :class="windowWidth === 'sm' ? 'justify-content-between' : 'justify-content-center'">
        <div class="d-flex flex-column w-100" :class="windowWidth === 'sm' ? 'align-items-start' : 'align-items-end'">
          <span v-if="windowWidth === 'sm'" class="text-secondary-10 text-uppercase mb-1" v-text="$t('Моя прибыль')" />
          <bdi
            class="lfx-table-body-profit"
            :class="[isRtlMode ? 'text-left' : 'text-right', getProfitClass(Number(row.item.commission)), row.item.pause ? 'text-secondary-15' : '']"
            v-text="`${Number(row.item.commission).toFixed(2)} ${row.item.currency}`"
          />
        </div>
        <template>
          <b-icon-chevron-right v-if="windowWidth === 'sm'" class="icon-gray pointer h5 m-0" @click="openCurrentCopier(row.item, 'copiers')" />
        </template>
      </div>
    </template>
    <template #cell(horizontal_dots)="row">
      <div
        class="d-flex align-items-center justify-content-end"
        :class="[isRtlMode ? 'ml-2' : 'mr-2', windowWidth === 'sm' ? 'justify-content-end' : '']"
        @click="openCurrentCopier(row.item, 'copiers')"
      >
        <lfx-icon-pause v-if="row.item.pause" :class="isRtlMode ? 'ml-3' : 'mr-3'" />
        <b-icon-chevron-right
          v-if="windowWidth === 'sm'"
          class="icon-gray pointer h5 m-0"
          :class="isRtlMode ? 'rotate_180' : ''"
          @click="openCurrentCopier(row.item, 'copiers')"
        />
        <lfx-icon-dots v-else class="pointer" />
      </div>
    </template>
  </b-table>
</template>

<script>
import LfxIconDots from '~/components/icons/lfx-icon-dots'
import LfxIconPause from '~/components/icons/lfx-icon-pause'
export default {
  name: 'LfxTableCopiers',
  components: { LfxIconPause, LfxIconDots },
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
      fields: ['symbol', 'duration', 'copy_type', 'amount', 'profit', 'my_profit', 'horizontal_dots']
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
              case 'copy_type':
                result = false
                break
              default:
                result = true
            }
            break
          case 'md-sm':
            switch (field) {
              case 'copy_type':
              case 'amount':
              case 'profit':
                result = false
                break
              default:
                result = true
            }
            break
          case 'sm':
            switch (field) {
              case 'copy_type':
              case 'duration':
              case 'amount':
              case 'profit':
              case 'my_profit':
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
    getProfitClass (value) {
      return value > 0 ? '-profit' : value === 0 ? '' : '-loss'
    },
    openCurrentCopier (currentCopier, popupName) {
      this.$store.commit('profile/mutations/handler/SAVE_CURRENT_COPIER', { rootData: this.$store.state.profile.state.handler, data: currentCopier })
      this.$store.dispatch('dictionaries/actions/handler/showPopup', popupName)
    },
    openInstrumentTrader (item) {
      this.$instrument.openInstrumentTrader(item)
    }
  }
}
</script>
