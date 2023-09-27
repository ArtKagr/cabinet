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
        :class="{ '-active': campaign[0] === Number(routePages.current), '-ltr': dir === 'ltr', '-rtl': dir === 'rtl' }"
        @click="openCurrentCampaign(campaign[0])"
        v-text="campaign[1]"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupPartnersCampaignsList',
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    campaignList () {
      return this.$store.getters['partners/getters/handler/getCurrentPartnerCampaign'].userCampaignList
    }
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    openCurrentCampaign (campaignId) {
      this.$router.push(`/${this.routePages.locale}/affiliate-campaigns/${campaignId}`)
      this.togglePopup(false)
    }
  }
}
</script>
<style lang="scss">
  .popup-partners-campaigns-list {
    display: flex;
    flex-direction: column;

    &-head {
      display: flex;
      align-items: center;

      &-title {
        padding: 18px 20px;
        font-size: 20px;
        color: #3B4B68;
      }
    }

    &-body {
      display: flex;
      flex-direction: column;

      &-row {
        padding: 10px 20px;
        font-size: 14px;
        color: #3498db;
        border-top: 1px solid #e2e4e8;
        cursor: pointer;

        &:hover, &.-active {
          background-color: #3498db;
          color: white;
          border-top: 1px solid #3498db;
        }

        &.-rtl {
          text-align: right;
        }
      }
    }
  }
</style>
