<template>
  <div class="popup-partners-current-referral">
    <div class="popup-partners-current-referral-head">
      <span class="popup-partners-current-referral-head-title" :class="`-${dir}`" v-text="$t('Информация о реферале')" />
    </div>
    <div class="popup-partners-current-referral-body">
      <div v-for="field in currentReferral" :key="field.id" class="popup-partners-current-referral-body-column">
        <span class="popup-partners-current-referral-body-column-value" v-text="field.value" />
        <span class="popup-partners-current-referral-body-column-label" v-text="field.title" />
      </div>
    </div>
    <div class="popup-partners-current-referral-footer">
      <span
        class="popup-partners-current-referral-footer-text"
        :class="`-${dir}`"
        @click="openExportCommissions"
        v-text="$t('Партнерская комиссия')"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'PopupPartnersCurrentReferral',
  data () {
    return {
      moment
    }
  },
  computed: {
    currentReferral () {
      const data = this.$store.getters['partners/getters/handler/getCurrentReferral']
      const result = [
        { id: 0, title: this.$t('Кампания'), value: this.currentCampaignData.campaign },
        { id: 1, title: this.$t('UID'), value: data.client_uid },
        { id: 2, title: this.$t('Регистрация'), value: this.moment(data.reg_date).format('DD.MM.YYYY') },
        { id: 3, title: this.$t('Страна'), value: data.country }
      ]
      return this.isRtlMode ? result.reverse() : result
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    campaigns () {
      return this.$store.getters['partners/getters/handler/getPartnerCampaigns'].allCampaigns
    },
    currentCampaignData () {
      const result = this.campaigns.find(item => item.id === Number(this.routePages.current))
      return result && result.id ? result : { campaign: '', type: '' }
    }
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    openExportCommissions () {
      this.$router.push(`/${this.routePages.locale}/affiliate-campaigns/export-commissions/${this.$store.getters['partners/getters/handler/getCurrentReferral'].id}`)
      this.togglePopup(false)
    }
  }
}
</script>
<style lang="scss">
  .popup-partners-current-referral {
    display: flex;
    flex-direction: column;

    &-head {
      display: flex;
      align-items: center;
      padding: 18px 20px;

      &-title {
        font-size: 20px;
        color: #3B4B68;
        line-height: 1;

        &.-rtl {
          text-align: right;
        }
      }
    }

    &-body {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 20px;
      background-color: #eff1f5;

      &-column {
        display: flex;
        flex-direction: column;
        padding: 5px;

        &-value {
          font-size: 18px;
          color: #3B4B68;
          font-weight: 500;
        }

        &-label {
          font-size: 12px;
          color: #8e9aac;
          line-height: 1;
        }
      }
    }

    &-footer {
      display: flex;
      align-items: center;
      padding: 15px 20px;

      &-text {
        font-size: 15px;
        color: #3498db;
        cursor: pointer;

        &.-rtl {
          text-align: right;
        }
      }
    }
  }
</style>
