<template>
  <div class="form-container">
    <div v-if="formTitle === 'traderEdit'" class="form-profile_about">
      <form-profile-about ref="form-profile-about" :is-button-shown="false" />
      <div class="form-profile_about-button">
        <b-button type="submit" class="w-100" variant="primary" @click="onSubmit" v-text="$t(formData.button)" />
      </div>
    </div>
    <form-login v-else-if="formTitle === 'login'" />
    <form-registration v-else-if="formTitle === 'registration'" />
    <form-edit-phone v-else-if="formTitle === 'editPhone'" />
    <form-edit-email v-else-if="formTitle === 'editEmail'" />
    <form-edit-identity v-else-if="formTitle === 'editIdentity'" />
    <form-edit-address v-else-if="formTitle === 'editAddress'" />
    <form-notifications v-else-if="formTitle === 'notifications'" />
    <form-copy-action v-else-if="formTitle === 'copyAction'" />
    <form-finance-history v-else-if="formTitle === 'financeHistory'" />
    <form-finance-withdrawal-request v-else-if="formTitle === 'withdrawalRequest'" />
    <form-finance-withdrawal-modal v-else-if="formTitle === 'withdrawalRequestModal'" />
    <form-finance-deposit-request v-else-if="formTitle === 'depositRequest'" />
    <form-finance-deposit-modal v-else-if="formTitle === 'depositRequestModal'" />
    <form-finance-deposit-card v-else-if="formTitle === 'depositRequestCard'" />
    <form-partners-create-company v-else-if="formTitle === 'affiliateCreateCompany'" />
    <form-partners-edit-company v-else-if="formTitle === 'affiliateEditCompany'" />
    <form-partners-calculator v-else-if="formTitle === 'affiliateCalculator'" />
    <form-partners-reg-rep v-else-if="formTitle === 'affiliatePrograms'" />
    <form-partners-make-app v-else-if="formTitle === 'affiliatePromoMakeApp'" />
    <form-profile-username v-else-if="formTitle === 'editUsername'" />
    <form-questionnaire-eu v-else-if="formTitle === 'questionnaireEu'" />
    <form-questionnaire-trader v-else-if="formTitle === 'questionnaireTrader'" />
    <form-twitter-watcher v-else-if="formTitle === 'twitterWatcher'" />
    <form-verification-pep v-else-if="formTitle === 'pepStatus'" />
    <form-mt-vps-buy v-else-if="formTitle === 'buyVps'" />
    <form-standard v-else />
  </div>
</template>

<script>
import FormEditPhone from '~/components/modal/forms/form-edit-phone'
import FormEditEmail from '~/components/modal/forms/form-edit-email'
import FormEditIdentity from '~/components/modal/forms/form-edit-identity'
import FormProfileAbout from '~/components/modal/forms/form-profile-about'
import FormStandard from '~/components/modal/forms/form-standard'
import FormEditAddress from '~/components/modal/forms/form-edit-address'
import FormLogin from '~/components/modal/forms/form-login'
import FormRegistration from '~/components/modal/forms/form-registration'
import FormNotifications from '~/components/modal/forms/form-notifications'
import FormCopyAction from '~/components/modal/forms/form-copy-action'
import FormFinanceHistory from '~/components/modal/forms/form-finance-history'
import FormFinanceWithdrawalRequest from '~/components/modal/forms/form-finance-withdrawal-request'
import FormFinanceWithdrawalModal from '~/components/modal/forms/form-finance-withdrawal-modal'
import FormFinanceDepositRequest from '~/components/modal/forms/form-finance-deposit-request'
import FormFinanceDepositModal from '~/components/modal/forms/form-finance-deposit-modal'
import FormFinanceDepositCard from '~/components/modal/forms/form-finance-deposit-card'
import FormPartnersCreateCompany from '~/components/modal/forms/form-partners-create-company'
import FormPartnersEditCompany from '~/components/modal/forms/form-partners-edit-company'
import FormPartnersCalculator from '~/components/modal/forms/form-partners-calculator'
import FormPartnersRegRep from '~/components/modal/forms/form-partners-reg-rep'
import FormQuestionnaireEu from '~/components/modal/forms/form-questionnaire-eu'
import FormQuestionnaireTrader from '~/components/modal/forms/form-questionnaire-trader'
import FormTwitterWatcher from '~/components/modal/forms/form-twitter-watcher'
import FormVerificationPep from '~/components/modal/forms/form-verification-pep'
import FormMtVpsBuy from '~/components/modal/forms/form-mt-vps-buy'
import FormProfileUsername from '~/components/modal/forms/form-profile-username'
import FormPartnersMakeApp from '~/components/modal/forms/form-partners-make-app'

export default {
  name: 'MainForm',
  components: {
    FormPartnersMakeApp,
    FormProfileUsername,
    FormMtVpsBuy,
    FormVerificationPep,
    FormTwitterWatcher,
    FormQuestionnaireTrader,
    FormQuestionnaireEu,
    FormPartnersRegRep,
    FormPartnersCalculator,
    FormPartnersEditCompany,
    FormPartnersCreateCompany,
    FormFinanceDepositCard,
    FormFinanceDepositModal,
    FormFinanceDepositRequest,
    FormFinanceWithdrawalModal,
    FormFinanceWithdrawalRequest,
    FormFinanceHistory,
    FormCopyAction,
    FormNotifications,
    FormRegistration,
    FormLogin,
    FormEditAddress,
    FormEditPhone,
    FormEditEmail,
    FormEditIdentity,
    FormProfileAbout,
    FormStandard
  },
  computed: {
    formData () {
      return this.$store.getters['forms/getters/handler/getFormData'](null)
    },
    formTitle () {
      return this.$store.getters['forms/getters/handler/getFormTitle']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    }
  },
  methods: {
    onSubmit (event) {
      this.$refs['form-profile-about'].onSubmit(event)
    }
  }
}
</script>
<style lang="scss">
.form-container {
  background-color: white;

}
.form-profile_about {

  &-button {
    border-top: 1px solid #d9dce1;
    padding: 30px;
  }
}
</style>
