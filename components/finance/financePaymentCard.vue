<template>
  <div class="finance-payment_card">
    <div
      class="finance-page-payment_card"
      :class="[activeCard === paymentCard.method ? `-active-${dir}` : '', source === 'finance-wallet' && isVisible ? '-opened' : '', source === 'finance-wallet' ? '-wallet' : '']"
      @click="isVisible = !isVisible"
    >
      <img
        v-if="source === 'finance'"
        class="finance-page-payment_card-icon"
        :class="`-${dir}`"
        :src="paymentCard.icon"
        alt
      >
      <div
        class="d-flex flex-column w-50"
        :class="(paymentCard.rules && paymentCard.rules.min_payment) || (paymentCard.rules && paymentCard.rules.commission) ? 'justify-content-between h-100' : ''"
      >
        <div class="d-flex flex-column">
          <span class="finance-page-payment_card-title" :class="isRtlMode ? 'text-right' : ''" v-text="paymentCard.name" />
          <span
            v-if="paymentCard && paymentCard.purse"
            class="finance-page-payment_card-subtitle text-secondary-11"
            :class="isRtlMode ? 'text-right' : ''"
            v-text="paymentCard.purse"
          />
          <span
            v-if="paymentCard && paymentCard.number"
            class="finance-page-payment_card-subtitle text-secondary-11"
            :class="isRtlMode ? 'text-right' : ''"
            v-text="paymentCard.number"
          />
        </div>
        <div class="d-flex flex-column">
          <div
            v-if="paymentCard && paymentCard.min_amount"
            class="finance-page-payment_card-subtitle pt-1"
            :class="isRtlMode ? 'text-right' : ''"
            v-html="`${$t('Мин. платёж')}: ${paymentCard.min_amount}`"
          />
          <span
            v-else-if="paymentCard && paymentCard.rules && paymentCard.rules.min_payment"
            class="finance-page-payment_card-subtitle pt-1"
            :class="isRtlMode ? 'text-right' : ''"
            v-text="paymentCard.rules.min_payment"
          />
          <div
            v-if="paymentCard && paymentCard.commission"
            class="finance-page-payment_card-subtitle"
            :class="isRtlMode ? 'text-right' : ''"
            v-html="`${$t('Комиссия')}: ${paymentCard.commission}`"
          />
          <span
            v-else-if="paymentCard && paymentCard.rules && paymentCard.rules.commission"
            class="finance-page-payment_card-subtitle"
            :class="isRtlMode ? 'text-right' : ''"
            v-text="paymentCard.rules.commission"
          />
        </div>
      </div>
      <img
        v-if="source === 'finance-wallet'"
        :class="`finance-page-payment_card-icon -wallet-${dir}`"
        :src="paymentCard.icon"
        alt
      >
    </div>
    <b-collapse v-if="source === 'finance-wallet'" v-model="isVisible" class="finance-page-payment_card-buttons">
      <div class="d-flex align-items-center w-100 pb-3 px-3">
        <b-button
          v-if="paymentCard.method_type === 'bank'"
          :class="isRtlMode ? 'ml-2' : 'mr-2'"
          variant="secondary"
          style="padding: 5px 5px;"
          @click="editWallet(paymentCard)"
        >
          <lfx-icon-edit color="white" />
        </b-button>
        <b-button
          :class="isRtlMode ? 'ml-2' : 'mr-2'"
          variant="danger"
          style="padding: 5px 7px;"
          @click="deleteWallet(paymentCard)"
        >
          <lfx-icon-delete />
        </b-button>
        <template v-if="paymentCard.method">
          <b-button
            v-if="paymentCard.card_is_verified === true"
            variant="primary"
            style="padding: 5px 15px;"
            @click="depositMethod(paymentCard)"
            v-text="paymentCard.card_action_name"
          />
          <b-button
            v-else-if="paymentCard.card_is_verified === false"
            variant="success"
            style="padding: 5px 15px;"
            @click="depositMethod(paymentCard)"
            v-text="paymentCard.card_action_name"
          />
          <b-button
            v-else
            variant="primary"
            style="padding: 5px 15px;"
            @click="depositMethod(paymentCard)"
            v-text="paymentCard.card_action_name"
          />
        </template>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import LfxIconDelete from '~/components/icons/lfx-icon-delete'
import form from '~/mixins/form'
import LfxIconEdit from '~/components/icons/lfx-icon-edit'
export default {
  name: 'FinancePaymentCard',
  components: { LfxIconEdit, LfxIconDelete },
  mixins: [form],
  props: {
    source: {
      type: String,
      default: 'finance'
    },
    paymentCard: {
      type: Object,
      default: () => ({
        method: null,
        name: null,
        icon: null,
        rules: {
          min_payment: null,
          commission: null
        },
        purse: null,
        number: null,
        enable: true
      })
    },
    activeCard: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isVisible: false
    }
  },
  computed: {
    verificationData () {
      return this.$store.getters['profile/getters/handler/getVerificationData']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    }
  },
  methods: {
    saveMethod (card) {
      this.$store.commit('finance/mutations/handler/SAVE_ACTIVE_METHOD', { rootData: this.$store.state.finance.state.handler, data: card.method })
    },
    saveCard (card) {
      this.$store.commit('finance/mutations/handler/SAVE_ACTIVE_CARD', { rootData: this.$store.state.finance.state.handler, data: card })
    },
    deleteWallet (item) {
      localStorage.setItem('deleted_wallet', item.id)
      this.$store.dispatch('dictionaries/actions/handler/showPopup', 'finance-delete-wallet')
    },
    editWallet (item) {
      this.saveCard(item)

      this.fetchForm('editBank')
    },
    async depositMethod (item) {
      await this.saveMethod(item)

      if (['purse', 'bank'].includes(item.method_type) && item.method) {
        this.$router.push(`/${this.routePages.locale}/finance/deposit/${item.method}`)
      } else if (item.method_type === 'card' && item.card_is_verified) {
        await this.fetchForm('depositRequestCard')
      } else if (item.method_type === 'card') {
        this.$store.dispatch('dictionaries/actions/handler/showPopup', 'verification-bank-card')
        this.togglePopup(true)
        this.saveActiveBankCard(item)
      }
      await this.$store.commit('finance/mutations/handler/SAVE_ACTIVE_TRANSACTION', { rootData: this.$store.state.finance.state.handler, data: item })
    },
    saveActiveBankCard (card) {
      const currentCard = this.verificationData.cards.find(item => item.id === card.id)
      this.$store.commit('profile/mutations/handler/SAVE_ACTIVE_BANK_CARD', {
        rootData: this.$store.state.profile.state.handler,
        data: currentCard
      })
    }
  }
}
</script>
