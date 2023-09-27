<template>
  <div class="popup-finance-data">
    <div class="popup-finance-data-head">
      <span class="popup-finance-data-head-title" v-text="dataResponse.text" />
    </div>
    <div class="popup-finance-data-container mb-2">
      <span class="text-dark-primary-14 font-weight-500" v-text="$t('Пожалуйста, используйте данные реквизиты для оплаты')" />
    </div>
    <div class="popup-finance-deposit-form-body">
      <div v-for="(row, key) in infoResponse" :key="key" class="popup-finance-deposit-form-body-row">
        <div class="popup-finance-deposit-form-body-row-column">
          <span class="popup-finance-deposit-form-body-row-column-label" :class="`-${dir}`" v-text=" row.label" />
        </div>
        <div class="popup-finance-deposit-form-body-row-column">
          <span class="popup-finance-deposit-form-body-row-column-value" :class="`-${dir}`" v-text=" row.value" />
        </div>
      </div>
    </div>
    <div class="popup-finance-data-content -message">
      <div class="popup-finance-data-content-buttons">
        <b-button class="popup-finance-data-content-buttons-button" :class="`-${dir}`" variant="primary" @click="closePopup" v-text="$t('Закрыть')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupFinanceDepositMessage',
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    form () {
      return this.$store.getters['forms/getters/handler/getForm']
    },
    dataResponse () {
      return this.$store.getters['finance/getters/handler/getDepositDataResponse']
    },
    accountField () {
      return this.form.find(field => field.attribute === 'account')
    },
    bankIdField () {
      return this.form.find(field => field.attribute === 'bank_id')
    },
    bankIdValue () {
      if (this.bankIdField) {
        const result = this.bankIdField.values.find(item => item.value === this.bankIdField.value)
        return result && result.text ? result.text : null
      }

      return null
    },
    infoResponse () {
      return [
        { label: this.$t('Банковский счет'), value: this.bankIdValue },
        { label: this.$t('Торговый счет'), value: this.accountField.value },
        { label: this.$t('Сумма пополнения'), value: this.dataResponse.amount }
      ]
    }
  },
  methods: {
    closePopup () {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: false
      })
    }
  }
}
</script>
