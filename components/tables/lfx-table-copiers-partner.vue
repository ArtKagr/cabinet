<template>
  <b-table
    :fields="changedFields"
    :items="items"
    :class="`lfx-table -copiers_partner -${windowWidth}`"
    :thead-class="`lfx-table-head -copiers_partner -${windowWidth}`"
    :tbody-class="`lfx-table-body -copiers_partner -${windowWidth}`"
    :tbody-tr-class="`lfx-table-body-row -copiers_partner -${windowWidth}`"
  >
    <!-- Head -->
    <template #head(name)>
      <div class="lfx-table-head-symbol" :class="isRtlMode ? '-text_right mr-2' : '-text_left ml-2'" v-text="$t('Копирующий трейдер')" />
    </template>
    <template #head(duration)>
      <div class="lfx-table-head-open_time -primary" v-text="$t('Длительность')" />
    </template>
    <template #head(copy_type)>
      <div class="lfx-table-head-close_time -primary" v-text="$t('Тип копирования')" />
    </template>
    <template #head(amount_acc)>
      <div class="lfx-table-head-cmd" v-text="$t('Сумма копирования')" />
    </template>
    <template #head(profit_acc)>
      <div class="lfx-table-head-volume" v-text="$t('Результат торговли')" />
    </template>
    <template #head(commission_acc)>
      <div class="lfx-table-head-open_price" v-text="$t('Моя прибыль')" />
    </template>
    <template #head(horizontal_dots)>
      <div class="lfx-table-head-horizontal_dots" />
    </template>
    <!-- Rows -->
    <template #cell(name)="row">
      <div class="d-flex align-items-center" @click="openInstrumentTrader(row.item)">
        <img
          v-if="row.item.avatar_url"
          class="lfx-table-body-trader_logo"
          :class="isRtlMode ? 'ml-2' : 'mr-2'"
          :src="row.item.avatar_url"
          alt
        >
        <div v-else class="lfx-table-body-trader_logo -empty" :class="isRtlMode ? 'ml-2' : 'mr-2'">
          <span v-text="row.item.avatar_name" />
        </div>
        <span v-if="windowWidthNumber > 768" class="lfx-table-body-symbol text-primary-15" v-text="row.item.name" />
        <div v-else class="d-flex flex-column ml-1">
          <span
            class="lfx-table-body-symbol text-primary-15 line-height-1 mb-2 pl-0"
            :class="isRtlMode ? 'text-right' : ''"
            v-text="row.item.name"
          />
          <span
            class="text-secondary-10 text-uppercase line-height-1 mb-2"
            :class="isRtlMode ? 'text-right' : ''"
            v-text="$t('Моя прибыль')"
          />
          <span
            class="font-weight-600 line-height-1"
            :class="[isRtlMode ? 'text-right' : '', row.item.pause ? 'text-secondary-17' : 'text-medium-secondary-17']"
            v-text="`${(row.item.commission_acc || 0).toFixed(2)} ${currency}`"
          />
        </div>
      </div>
    </template>
    <template #cell(duration)="row">
      <div class="d-flex align-items-center justify-content-center">
        <span
          class="text-center"
          :class="row.item.pause ? 'text-secondary-17' : 'text-medium-secondary-17'"
          v-text="$pluralize(row.item.duration, [$t('день'), $t('дня'), $t('дней')])"
        />
      </div>
    </template>
    <template #cell(copy_type)="row">
      <div class="d-flex align-items-center justify-content-center">
        <span
          class="text-uppercase text-center"
          :class="row.item.pause ? 'text-secondary-10' : 'text-medium-secondary-10'"
          v-text="row.item.copy_type"
        />
      </div>
    </template>
    <template #cell(amount_acc)="row">
      <div class="d-flex align-items-center justify-content-center">
        <span
          class="font-weight-600 text-center"
          :class="row.item.pause ? 'text-secondary-17' : 'text-medium-secondary-17'"
          v-text="`${(row.item.amount_acc || 0).toFixed(2)} ${currency}`"
        />
      </div>
    </template>
    <template #cell(profit_acc)="row">
      <div class="d-flex align-items-center justify-content-center">
        <span
          class="font-weight-600 text-center"
          :class="row.item.pause ? 'text-secondary-17' : 'text-medium-secondary-17'"
          v-text="`${(row.item.profit_acc || 0).toFixed(2)} ${currency}`"
        />
      </div>
    </template>
    <template #cell(commission_acc)="row">
      <div class="d-flex align-items-center justify-content-center">
        <span
          class="font-weight-600 text-center"
          :class="row.item.pause ? 'text-secondary-17' : 'text-medium-secondary-17'"
          v-text="`${(row.item.commission_acc || 0).toFixed(2)} ${currency}`"
        />
      </div>
    </template>
    <template #cell(horizontal_dots)="row">
      <div
        class="d-flex align-items-center justify-content-end"
        :class="isRtlMode ? 'ml-3' : 'mr-3'"
        @click="openCurrentCopier(row.item, 'copiers-partner')"
      >
        <lfx-icon-pause v-if="row.item.pause" :class="isRtlMode ? 'ml-3' : 'mr-3'" />
        <b-icon-chevron-right v-if="windowWidth === 'sm'" :class="isRtlMode ? 'rotate_180' : ''" class="icon-gray pointer h5 m-0" />
        <lfx-icon-dots v-else class="pointer" />
      </div>
    </template>
  </b-table>
</template>

<script>
import LfxIconDots from '~/components/icons/lfx-icon-dots'
import LfxIconPause from '~/components/icons/lfx-icon-pause'
export default {
  name: 'LfxTableCopiersPartner',
  components: {
    LfxIconPause,
    LfxIconDots
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    currency: {
      type: String,
      default: null
    },
    pagination: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fields: ['name', 'duration', 'copy_type', 'amount_acc', 'profit_acc', 'commission_acc', 'horizontal_dots']
    }
  },
  computed: {
    windowWidthNumber () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
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
              case 'amount_acc':
              case 'profit_acc':
                result = false
                break
              default:
                result = true
            }
            break
          case 'sm':
            switch (field) {
              case 'duration':
              case 'copy_type':
              case 'amount_acc':
              case 'profit_acc':
              case 'commission_acc':
                result = false
                break
              default:
                result = true
            }
            break
        }
        return result
      }).map((field) => { return { key: field } })
    }
  },
  methods: {
    openCurrentCopier (currentCopier, popupName) {
      this.$store.commit('profile/mutations/handler/SAVE_CURRENT_COPIER_PARTNER', {
        rootData: this.$store.state.profile.state.handler,
        data: { ...currentCopier, currency: this.currency }
      })
      this.$store.dispatch('dictionaries/actions/handler/showPopup', popupName)
    },
    openInstrumentTrader (item) {
      this.$instrument.openInstrumentTrader(item)
    }
  }
}
</script>
