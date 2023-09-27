<template>
  <div class="popup-finance-deposit-form">
    <div class="popup-finance-deposit-form-head">
      <span class="popup-finance-deposit-form-head-title" :class="`-${dir}`" v-text="$t('Пополнение через {method}', { method: info.name })" />
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
    <div class="popup-finance-deposit-form-payload">
      <span
        class="popup-finance-deposit-form-payload-text"
        :class="`-${dir}`"
        v-text="$t('* Компания LiteFinance Global LLC возмещает своим клиентам комиссии платежных систем, используемых при пополнении торговых счетов. Возмещение осуществляется на торговый счет в автоматическом режиме сразу же, после зачисления депозита.')"
      />
      <div class="popup-finance-deposit-form-payload-buttons">
        <div class="popup-finance-deposit-form-payload-buttons-container">
          <b-button
            class="popup-finance-deposit-form-payload-buttons-container-button"
            :class="`-${dir}`"
            variant="outline-primary"
            @click="editDeposit"
            v-text="$t('Редактировать')"
          />
          <b-button
            class="popup-finance-deposit-form-payload-buttons-container-button"
            :class="`-${dir}`"
            variant="primary"
            @click="confirmDeposit"
            v-text="$t('Подтвердить')"
          />
        </div>
        <div class="popup-finance-data-content-secure">
          <div class="popup-finance-data-content-secure-icon" :class="`-${dir}`">
            <lfx-icon-lock />
          </div>
          <span class="popup-finance-data-content-secure-text" v-text="'HTTP and SSL secure'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LfxIconLock from '~/components/icons/lfx-icon-lock'
export default {
  name: 'PopupFinanceDepositForm',
  components: { LfxIconLock },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    info () {
      return this.$store.getters['finance/getters/handler/getDepositInfo']
    },
    infoResponse () {
      return this.$store.getters['finance/getters/handler/getDepositInfoResponse']
    },
    dataResponse () {
      return this.$store.getters['finance/getters/handler/getDepositDataResponse']
    }
  },
  methods: {
    editDeposit () {
      this.togglePopup(false)
    },
    getParams (params) {
      return Object.entries(params).reduce((acc, item, index) => {
        acc.push(`${index === 0 ? '?' : '&'}${item[0]}=${item[1]}`)
        return acc
      }, [])
    },
    confirmDeposit () {
      if (Object.keys(this.dataResponse.params)) {
        const params = this.getParams(this.dataResponse.params)
        window.open(`${this.dataResponse.url}${params.join('')}`)
      } else {
        window.open(this.dataResponse.url)
      }
    }
  }
}
</script>
