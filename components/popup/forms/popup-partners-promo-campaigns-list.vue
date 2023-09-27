<template>
  <div class="popup-partners-campaigns-list">
    <div class="popup-partners-campaigns-list-head">
      <span class="popup-partners-campaigns-list-head-title" v-text="$t('Кампании')" />
    </div>
    <div class="popup-partners-campaigns-list-body">
      <span
        v-for="campaign in campaignList"
        :key="campaign[0]"
        class="popup-partners-campaigns-list-body-row"
        :class="{ '-active': campaign[0] === activeCampaign || campaign[1] === 'Standard' && activeCampaign === '0', '-ltr': dir === 'ltr', '-rtl': dir === 'rtl' }"
        @click="openCurrentCampaign(campaign[0])"
        v-text="campaign[1]"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupPartnersPromoCampaignsList',
  data () {
    return {
      activeCampaign: null
    }
  },
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    campaignList () {
      return Object.entries(this.$store.getters['partners/getters/handler/getPromoCampaigns']['campaign-list'])
    }
  },
  created () {
    const promoCid = localStorage.getItem('promo_cid')
    this.activeCampaign = promoCid || this.campaignList[0][0]
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    openCurrentCampaign (campaignId) {
      localStorage.setItem('promo_cid', campaignId)
      this.activeCampaign = campaignId
      this.$store.commit('partners/mutations/handler/SAVE_PROMO_CID', {
        rootData: this.$store.state.partners.state.handler,
        data: campaignId
      })
      this.togglePopup(false)
    }
  }
}
</script>
