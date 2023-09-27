<template>
  <div class="popup-trades_history">
    <div class="popup-trades_history-head -copiers-partner-edit">
      <span class="popup-trades_history-head-name m-0" :class="`-${dir}`" v-text="$t('Редактирование')" />
    </div>
    <div class="popup-trades_history-data -copiers-partner-edit">
      <span class="copiers-partner-edit-input-title" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Комиссия партнера (% от дохода)')" />
      <field-numeric
        class="popup-trades-change-body-amount-input"
        :value="commission"
        label="%"
        :counter="1"
        :min="0"
        :max="100"
        :digits="0"
        @change="setCommission"
      />
    </div>
    <div class="popup-trades_history-buttons -copiers-partner-edit">
      <b-button variant="primary" :disabled="isButtonDisabled" @click="setCommissionPercent" v-text="$t('Сохранить')" />
    </div>
  </div>
</template>

<script>
import FieldNumeric from '~/components/modal/fields/field-numeric'
export default {
  name: 'PopupCopiersPartnerEdit',
  components: { FieldNumeric },
  data () {
    return {
      commission: 0,
      isButtonDisabled: false
    }
  },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    copier () {
      return this.$store.getters['profile/getters/handler/getCurrentCopierPartner']
    }
  },
  watch: {
    commission (newValue) {
      this.isButtonDisabled = newValue === this.copier.commissionPercent
    }
  },
  created () {
    this.commission = this.copier.commissionPercent
  },
  methods: {
    setCommission (value) {
      this.commission = value
    },
    async setCommissionPercent () {
      await this.$store.dispatch('profile/actions/handler/editPartnerCommissionPercent', {
        uid: this.copier.clientUid,
        commission: this.commission
      })
      await this.togglePopup(false)
    }
  }
}
</script>
<style lang="scss">
  .copiers-partner-edit-input-title {
    font-size: 12px;
    color: #6d788a;
    margin-bottom: 5px;
  }
</style>
