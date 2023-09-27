<template>
  <div class="d-flex flex-column p-4 w-100">
    <span
      v-if="partnerCommissions && partnerCommissions.length"
      class="text-dark-primary-20"
      :class="isRtlMode ? 'text-right' : ''"
      v-text="partnerCommissionsTitle"
    />
    <div v-if="partnerCommissions && partnerCommissions.length" class="mt-4">
      <lfx-table-partner-commissions :items="partnerCommissions" />
    </div>
    <span v-else class="text-dark-primary-20" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Ничего не найдено')" />
  </div>
</template>

<script>
import LfxTablePartnerCommissions from '~/components/tables/lfx-table-partner-commissions'
export default {
  name: 'AffiliateCampaignsExportCommissions',
  components: { LfxTablePartnerCommissions },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Комиссия')} | ${this.$t('Кампании')}`)
    }
  },
  computed: {
    partnerCommissionsTitle () {
      return this.$store.getters['partners/getters/handler/getPartnerCommissions'].title
    },
    partnerCommissions () {
      return this.$store.getters['partners/getters/handler/getPartnerCommissions'].data
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }

  },
  created () {
    this.$store.dispatch('partners/actions/handler/fetchPartnerCommissions')
  }
}
</script>
