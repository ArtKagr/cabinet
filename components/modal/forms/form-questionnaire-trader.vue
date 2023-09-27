<template>
  <div class="form-questionnaire-eu">
    <div class="form-questionnaire-eu-data">
      <div class="form-questionnaire-eu-data-steps">
        <span class="form-questionnaire-eu-data-steps-title" v-text="$t('Шаг')" />
        <span class="form-questionnaire-eu-data-steps-value" v-text="`${step}/${maxStep}`" />
      </div>
      <div class="form-questionnaire-eu-data-image">
        <img src="~/assets/images/questionnaire-trader/step-1.png" alt>
      </div>
    </div>
    <div class="form-questionnaire-eu-steps">
      <questionnaire-trader-step-one v-if="step === 1" />
      <questionnaire-trader-step-two v-else-if="step === 2" />
    </div>
  </div>
</template>

<script>
import QuestionnaireTraderStepOne from '~/components/modal/forms/questionnaire-trader-steps/questionnaire-trader-step-one'
import QuestionnaireTraderStepTwo from '~/components/modal/forms/questionnaire-trader-steps/questionnaire-trader-step-two'
export default {
  name: 'FormQuestionnaireTrader',
  components: { QuestionnaireTraderStepTwo, QuestionnaireTraderStepOne },
  data () {
    return {
      lastStep: 0
    }
  },
  computed: {
    step () {
      return this.$store.getters['profile/getters/handler/getQuestionnaireEuSteps'].step
    },
    maxStep () {
      return this.$store.getters['profile/getters/handler/getQuestionnaireEuSteps'].max_step
    }
  },
  created () {
    this.lastStep = this.step
  }
}
</script>
