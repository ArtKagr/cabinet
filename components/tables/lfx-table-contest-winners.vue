<template>
  <b-table
    :fields="changedFields"
    :items="items"
    :class="`lfx-table -contest_winners -${windowWidth}`"
    :thead-class="`lfx-table-head -contest_winners -${windowWidth}`"
    :tbody-class="`lfx-table-body -contest_winners -${windowWidth}`"
    :tbody-tr-class="`lfx-table-body-row -contest_winners -${windowWidth}`"
  >
    <!-- Head -->
    <template #head(number-value)>
      <div class="lfx-table-head-place" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Номер билета участника')" />
    </template>
    <template #head(month-value)>
      <div class="lfx-table-head-place" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Месяц')" />
    </template>
    <template #head(prize-amount-value)>
      <div class="lfx-table-head-place" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Призовая сумма')" />
    </template>
    <template #head(uid-value)>
      <div class="lfx-table-head-place" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Uid')" />
    </template>
    <!-- Rows -->
    <template #cell(number-value)="row">
      <div class="lfx-table-body-place" :class="isRtlMode ? 'text-right' : ''" v-text="row.item['number-value']" />
    </template>
    <template #cell(month-value)="row">
      <div class="lfx-table-body-uid" :class="isRtlMode ? 'text-right' : ''" v-text="row.item['month-value']" />
    </template>
    <template #cell(prize-amount-value)="row">
      <div class="lfx-table-body-uid" :class="isRtlMode ? 'text-right' : ''" v-text="row.item['prize-amount-value']" />
    </template>
    <template #cell(uid-value)="row">
      <div class="lfx-table-body-uid" :class="isRtlMode ? 'text-right' : ''" v-text="row.item['uid-value']" />
    </template>
  </b-table>
</template>

<script>
import moment from 'moment'
export default {
  name: 'LfxTableContestWinners',
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
      fields: ['number-value', 'month-value', 'prize-amount-value', 'uid-value']
    }
  },
  computed: {
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    changedFields () {
      return this.fields.map((field) => {
        return { key: field }
      })
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  }
}
</script>
