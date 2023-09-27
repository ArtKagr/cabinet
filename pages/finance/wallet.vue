<template>
  <div class="finance-page">
    <span class="finance-page-title mb-4" :class="isRtlMode ? 'text-right' : ''" v-text="financeWallets.title" />
    <div class="finance-page-wallets">
      <div
        v-for="(paymentSystem, key) in financeWallets.payment_system_list"
        :key="key"
        class="finance-page-wallets-wallet"
        :class="`-first-${dir}`"
        @click="addPayment(paymentSystem)"
      >
        <img class="finance-page-wallets-wallet-icon" :class="`-${dir}`" :src="paymentSystem.icon" alt>
        <span class="finance-page-wallets-wallet-title" v-text="paymentSystem.name" />
      </div>
    </div>
    <template v-if="financeWallets && financeWallets.my_wallets">
      <span class="finance-page-title my-4" :class="isRtlMode ? 'text-right' : ''" v-text="financeWallets.my_wallets.title" />
      <div class="finance-page-payment-cards -wallet">
        <finance-payment-card
          v-for="(card, key) in financeWallets.my_wallets.list"
          :key="key"
          source="finance-wallet"
          :payment-card="card"
          @click.native="openCardDetails"
        />
      </div>
    </template>
  </div>
</template>

<script>
import FinancePaymentCard from '~/components/finance/financePaymentCard'
export default {
  name: 'Wallet',
  components: { FinancePaymentCard },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Кошелек')} | ${this.$t('Финансы')}`)
    }
  },
  computed: {
    financeWallets () {
      return this.$store.getters['finance/getters/handler/getFinanceWallets']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  async created () {
    await this.$store.dispatch('finance/actions/handler/fetchFinanceWallets')
    await this.$store.dispatch('profile/actions/handler/fetchProfileVerificationData')
  },
  methods: {
    async addPayment (payment) {
      // console.warn('payment', payment)
      await this.$store.commit('finance/mutations/handler/SAVE_ACTIVE_METHOD', { rootData: this.$store.state.finance.state.handler, data: payment.method })
      if (payment.method_type === 'wallet') {
        await this.$store.dispatch('forms/actions/handler/fetchForm', 'addWallet')
      } else if (payment.method_type === 'card') {
        await this.$store.dispatch('forms/actions/handler/fetchForm', 'addBankCard')
      } else if (payment.method_type === 'bank') {
        await this.$store.dispatch('forms/actions/handler/fetchForm', 'addBankTransfer')
      }
    },
    openCardDetails () {
      //
    }
  }
}
</script>
