<template>
  <b-table
    :fields="changedFields"
    :items="items"
    :class="`lfx-table -contest_participants -${windowWidth}`"
    :thead-class="`lfx-table-head -contest_participants -${windowWidth}`"
    :tbody-class="`lfx-table-body -contest_participants -${windowWidth}`"
    :tbody-tr-class="`lfx-table-body-row -contest_participants -${windowWidth}`"
  >
    <!-- Head -->
    <template #head(place-value)>
      <div
        class="lfx-table-head-place"
        :class="isRtlMode ? 'text-right' : ''"
        v-text="source === 'lucky-ticket' ? $t('Номер билета участника') : $t('Место')"
      />
    </template>
    <template #head(uid-value)>
      <div
        class="lfx-table-head-uid"
        :class="isRtlMode ? 'text-right' : ''"
        v-text="$t('Uid')"
      />
    </template>
    <template #head(lots-value)>
      <div
        class="lfx-table-head-uid"
        :class="isRtlMode ? 'text-right' : ''"
        v-text="$t('Количество лотов')"
      />
    </template>
    <template #head(active-referrals-value)>
      <div
        class="lfx-table-head-uid"
        :class="isRtlMode ? 'text-right' : ''"
        v-text="$t('Активные рефералы')"
      />
    </template>
    <template #head(rating-value)>
      <div
        class="lfx-table-head-uid"
        :class="isRtlMode ? 'text-right' : ''"
        v-text="$t('Очки')"
      />
    </template>
    <template #head(prize-amount-value)>
      <div
        class="lfx-table-head-uid"
        :class="isRtlMode ? 'text-right' : ''"
        v-text="$t('Призовая сумма')"
      />
    </template>
    <!-- Rows -->
    <template #cell(place-value)="row">
      <div
        class="lfx-table-body-place"
        :class="isRtlMode ? 'text-right' : ''"
        v-text="row.item['place-value']"
      />
    </template>
    <template #cell(uid-value)="row">
      <div
        class="lfx-table-body-uid"
        :class="isRtlMode ? 'text-right' : ''"
        v-text="row.item['uid-value']"
      />
    </template>
    <template #cell(lots-value)="row">
      <div
        class="lfx-table-body-uid"
        :class="isRtlMode ? 'text-right' : ''"
        v-text="row.item['lots-value']"
      />
    </template>
    <template #cell(active-referrals-value)="row">
      <div
        class="lfx-table-body-uid"
        :class="isRtlMode ? 'text-right' : ''"
        v-text="row.item['active-referrals-value']"
      />
    </template>
    <template #cell(rating-value)="row">
      <div
        class="lfx-table-body-uid"
        :class="isRtlMode ? 'text-right' : ''"
        v-text="row.item['rating-value']"
      />
    </template>
    <template #cell(prize-amount-value)="row">
      <div
        class="lfx-table-body-uid"
        :class="isRtlMode ? 'text-right' : ''"
        v-text="row.item['prize-amount-value']"
      />
    </template>
  </b-table>
</template>

<script>
import moment from 'moment'
export default {
  name: 'LfxTableContestParticipants',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Boolean,
      default: false
    },
    fields: {
      type: Array,
      default: () => {
        return []
      }
    },
    source: {
      type: String,
      default: 'lucky-ticket'
    }
  },
  data () {
    return {
      moment
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
