<template>
  <div v-if="copiersPartner.partners && copiersPartner.partners.length" class="profile-page-copiers">
    <div class="partners-campaigns-table -copiers_partner">
      <div class="partners-campaigns-table-head -copiers_partner">
        <span class="partners-campaigns-table-head-title-visits" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Партнер')" />
        <span class="partners-campaigns-table-head-title-visits" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Регистрация')" />
        <span class="partners-campaigns-table-head-title-visits" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Страна')" />
        <span class="partners-campaigns-table-head-title-visits" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Кол-во копирующих')" />
        <span class="partners-campaigns-table-head-title-visits" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Процент комиссии')" />
        <span class="partners-campaigns-table-head-title-visits" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Комиссия')" />
      </div>
      <div class="partners-campaigns-table-rows">
        <div v-for="(partner, key) in copiersPartner.partners" :key="key" class="d-flex flex-column">
          <div class="partners-campaigns-table-rows-row -copiers_partner" :class="partner.is_visible ? 'mb-0' : ''">
            <template v-if="windowWidthNumber > 1223">
              <div class="d-flex align-items-center">
                <div class="d-flex pointer" :class="isRtlMode ? 'ml-2' : 'mr-2'" @click="showCopiersPartner(partner.client_uid)">
                  <lfx-icon-minus-square v-if="partner.is_visible" />
                  <lfx-icon-plus-square v-else />
                </div>
                <span class="partners-campaigns-table-rows-row-type -primary line-height-1" @click="openCurrentCopier(partner, 'copiers-partner-edit')" v-text="partner.fullName" />
              </div>
              <span class="partners-campaigns-table-rows-row-type" :class="isRtlMode ? 'text-right' : ''" v-text="moment(partner.regDate).format('DD.MM.YYYY')" />
              <span class="partners-campaigns-table-rows-row-type" :class="isRtlMode ? 'text-right' : ''" v-text="partner.country" />
              <span class="partners-campaigns-table-rows-row-type" :class="isRtlMode ? 'text-right' : ''" v-text="partner.investorsCount" />
              <span class="partners-campaigns-table-rows-row-type" :class="isRtlMode ? 'text-right' : ''" v-text="`${partner.commissionPercent}%`" />
              <span class="partners-campaigns-table-rows-row-type" :class="isRtlMode ? 'text-right' : ''" v-text="`${(partner.commission || 0).toFixed(2)} ${copiersPartner.currency}`" />
            </template>
            <template v-else>
              <div class="d-flex flex-column w-100">
                <div class="partners-campaigns-table-grid_rows -copiers_partner">
                  <div class="d-flex flex-column">
                    <span class="partners-campaigns-table-head-title-visits text-secondary-10 mb-1" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Партнер')" />
                    <span
                      class="partners-campaigns-table-rows-row-visits -primary"
                      :class="isRtlMode ? 'text-right' : ''"
                      @click="openCurrentCopier(partner, 'copiers-partner-edit')"
                      v-text="partner.fullName"
                    />
                  </div>
                  <div class="d-flex flex-column">
                    <span class="partners-campaigns-table-head-title-registrations text-secondary-10 mb-1" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Регистрация')" />
                    <span class="partners-campaigns-table-rows-row-registrations" :class="isRtlMode ? 'text-right' : ''" v-text="moment(partner.regDate).format('DD.MM.YYYY')" />
                  </div>
                  <div class="d-flex flex-column">
                    <span class="partners-campaigns-table-head-title-conversion text-secondary-10 mb-1" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Страна')" />
                    <span class="partners-campaigns-table-rows-row-conversion" :class="isRtlMode ? 'text-right' : ''" v-text="partner.country" />
                  </div>
                  <div class="d-flex flex-column">
                    <span class="partners-campaigns-table-head-title-deposit text-secondary-10 mb-1" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Кол-во копирующих')" />
                    <span class="partners-campaigns-table-rows-row-deposit" :class="isRtlMode ? 'text-right' : ''" v-text="partner.investorsCount" />
                  </div>
                  <div class="d-flex flex-column">
                    <span class="partners-campaigns-table-head-title-withdrawal text-secondary-10 mb-1" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Процент комиссии')" />
                    <span class="partners-campaigns-table-rows-row-withdrawal" :class="isRtlMode ? 'text-right' : ''" v-text="`${partner.commissionPercent}%`" />
                  </div>
                  <div class="d-flex flex-column">
                    <span class="partners-campaigns-table-head-title-commission text-secondary-10 mb-1" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Комиссия')" />
                    <span class="partners-campaigns-table-rows-row-commission" :class="isRtlMode ? 'text-right' : ''" v-text="`${(partner.commission || 0).toFixed(2)} ${copiersPartner.currency}`" />
                  </div>
                </div>
                <b-button class="mt-4" variant="outline-primary" @click="showCopiersPartner(partner.client_uid)" v-text="`${$t('Показать копирующих трейдеров')} (${partner.investors.length || 0})`" />
              </div>
            </template>
          </div>
          <lfx-table-copiers-partner v-if="partner.is_visible" :items="partner.investors" :currency="copiersPartner.currency" :class="partner.is_visible ? 'mb-2' : ''" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LfxTableCopiersPartner from '~/components/tables/lfx-table-copiers-partner'
import LfxIconPlusSquare from '~/components/icons/lfx-icon-plus-square'
import LfxIconMinusSquare from '~/components/icons/lfx-icon-minus-square'
export default {
  name: 'CopiersPartner',
  components: { LfxIconMinusSquare, LfxIconPlusSquare, LfxTableCopiersPartner },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Партнеры копирующих')}`)
    }
  },
  computed: {
    windowWidthNumber () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    copiersPartner () {
      return this.$store.getters['profile/getters/handler/getCopiersPartner']
    }
  },
  created () {
    this.$store.dispatch('profile/actions/handler/fetchCopiersPartner')
  },
  methods: {
    openCurrentCopier (currentCopier, popupName) {
      this.$store.commit('profile/mutations/handler/SAVE_CURRENT_COPIER_PARTNER', {
        rootData: this.$store.state.profile.state.handler,
        data: { ...currentCopier, currency: this.currency }
      })
      this.$store.dispatch('dictionaries/actions/handler/showPopup', popupName)
    },
    showCopiersPartner (clientUid) {
      this.$store.commit('profile/mutations/handler/TOGGLE_CURRENT_COPIERS_PARTNER', {
        rootData: this.$store.state.profile.state.handler,
        data: clientUid
      })
    }
  }
}
</script>
