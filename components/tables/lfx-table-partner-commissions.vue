<template>
  <b-table
    :fields="changedFields"
    :items="items"
    :class="`lfx-table -contest_winners -${windowWidth}`"
    :thead-class="`lfx-table-head -contest_winners -${windowWidth}`"
    :tbody-class="`lfx-table-body -contest_winners -${windowWidth}`"
    :tbody-tr-class="`lfx-table-body-row -contest_winners -${windowWidth}`"
  >
    <template #head(date)="row">
      <div class="lfx-table-head-commissions" :class="`-${dir}`" v-text="row.label" />
    </template>
    <template #head(type)="row">
      <div class="lfx-table-head-commissions" :class="`-${dir}`" v-text="row.label" />
    </template>
    <template #head(uid)="row">
      <div class="lfx-table-head-commissions" :class="`-${dir}`" v-text="row.label" />
    </template>
    <template #head(level)="row">
      <div class="lfx-table-head-commissions" :class="`-${dir}`" v-text="row.label" />
    </template>
    <template #head(account)="row">
      <div class="lfx-table-head-commissions" :class="`-${dir}`" v-text="row.label" />
    </template>
    <template #head(ticket)="row">
      <div class="lfx-table-head-commissions" :class="`-${dir}`" v-text="row.label" />
    </template>
    <template #head(symbol)="row">
      <div class="lfx-table-head-commissions" :class="`-${dir}`" v-text="row.label" />
    </template>
    <template #head(volume)="row">
      <div class="lfx-table-head-commissions" :class="`-${dir}`" v-text="row.label" />
    </template>
    <template #head(commission)="row">
      <div class="lfx-table-head-commissions" :class="`-${dir}`" v-text="row.label" />
    </template>
    <template #cell(date)="row">
      <div :class="isRtlMode ? 'text-right' : ''" v-text="moment(row.item.date).format('HH:mm:ss DD.MM.YYYY')" />
    </template>
    <template #cell(type)="row">
      <div :class="isRtlMode ? 'text-right' : ''" v-text="row.item.type" />
    </template>
    <template #cell(uid)="row">
      <div :class="isRtlMode ? 'text-right' : ''" v-text="row.item.uid" />
    </template>
    <template #cell(level)="row">
      <div :class="isRtlMode ? 'text-right' : ''" v-text="row.item.level" />
    </template>
    <template #cell(account)="row">
      <div :class="isRtlMode ? 'text-right' : ''" v-text="row.item.account" />
    </template>
    <template #cell(ticket)="row">
      <div :class="isRtlMode ? 'text-right' : ''" v-text="row.item.ticket" />
    </template>
    <template #cell(symbol)="row">
      <div :class="isRtlMode ? 'text-right' : ''" v-text="row.item.symbol" />
    </template>
    <template #cell(volume)="row">
      <div :class="isRtlMode ? 'text-right' : ''" v-text="row.item.volume" />
    </template>
    <template #cell(commission)="row">
      <div :class="isRtlMode ? 'text-right' : ''" v-text="row.item.commission" />
    </template>
  </b-table>
</template>

<script>
import moment from 'moment'
export default {
  name: 'LfxTablePartnerCommissions',
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
      fields: ['date', 'type', 'uid', 'level', 'account', 'ticket', 'symbol', 'volume', 'commission']
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
