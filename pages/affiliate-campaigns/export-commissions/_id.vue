<template>
  <div class="d-flex flex-column p-3">
    <div class="d-flex align-items-center w-100 mb-1" :class="isRtlMode ? 'ml-auto' : ''">
      <span
        v-for="(tab, key) in tabs"
        :key="key"
        class="partners-promo-title pointer"
        :class="[key === activeTab ? '-active' : '', isRtlMode ? 'ml-3' : 'mr-3']"
        @click="setActiveTab(key)"
        v-text="tab"
      />
    </div>
    <div v-if="activeTabPayload && activeTabPayload.length" class="mt-2">
      <lfx-table-partner-commissions :items="activeTabPayload" />
    </div>
    <span v-else class="text-dark-primary-20" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Ничего не найдено')" />
  </div>
</template>

<script>
import moment from 'moment'
import LfxTablePartnerCommissions from '~/components/tables/lfx-table-partner-commissions'
export default {
  name: 'AffiliateCampaignsExportCommissionsCurrent',
  components: { LfxTablePartnerCommissions },
  data () {
    return {
      moment,
      activeTab: 0
    }
  },
  computed: {
    affiliateDates () {
      const dateTo = localStorage.getItem('affiliate_to') || moment().format('YYYY-MM-DD')
      const dateFrom = localStorage.getItem('affiliate_from') || moment(dateTo).subtract(29, 'days').format('YYYY-MM-DD')
      return { dateTo, dateFrom }
    },
    currentReferral () {
      return this.$store.getters['partners/getters/handler/getCurrentReferral']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    partnerCommissions () {
      return this.$store.getters['partners/getters/handler/getPartnerCommissions'].data
    },
    tabs () {
      const result = this.partnerCommissions ? Object.keys(this.partnerCommissions) : []
      return this.isRtlMode ? result.reverse() : result
    },
    activeTabPayload () {
      return this.tabs.length ? this.partnerCommissions[this.tabs[this.activeTab]] : {}
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  created () {
    this.$store.dispatch('partners/actions/handler/fetchPartnerCommissions', {
      id: this.currentReferral.id || this.routePages.current,
      activity: this.currentReferral.activity,
      dateFrom: this.affiliateDates.dateFrom,
      dateTo: this.affiliateDates.dateTo
    })
  },
  methods: {
    setActiveTab (key) {
      this.activeTab = key
    }
  }
}
</script>
