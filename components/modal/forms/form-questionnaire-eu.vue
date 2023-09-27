<template>
  <div class="form-questionnaire-eu">
    <div class="form-questionnaire-eu-data">
      <div class="form-questionnaire-eu-data-steps">
        <span class="form-questionnaire-eu-data-steps-title" v-text="$t('Шаг')" />
        <span class="form-questionnaire-eu-data-steps-value" v-text="`${step}/${maxStep}`" />
      </div>
      <div class="form-questionnaire-eu-data-image">
        <img v-if="step === 1" src="~/assets/images/questionnaire/step-1.png" alt>
        <img v-else-if="step === 2" src="~/assets/images/questionnaire/step-2.png" alt>
        <img v-else-if="step === 3" src="~/assets/images/questionnaire/step-3.png" alt>
        <img v-else-if="step === 4" src="~/assets/images/questionnaire/step-4.png" alt>
        <img v-else-if="step === 5" src="~/assets/images/questionnaire/step-5.png" alt>
        <img v-else-if="step === 6" src="~/assets/images/questionnaire/step-6.png" alt>
        <img v-else-if="step === 7" src="~/assets/images/questionnaire/step-7.png" alt>
        <img v-else-if="step === 8" src="~/assets/images/questionnaire/step-8.png" alt>
        <img v-else-if="step === 9" src="~/assets/images/questionnaire/step-9.png" alt>
      </div>
    </div>
    <div class="form-questionnaire-eu-steps">
      <questionnaire-step-one v-if="step === 1" />
      <questionnaire-step-two v-else-if="step === 2" />
      <questionnaire-step-three v-else-if="step === 3" />
      <questionnaire-step-four v-else-if="step === 4" />
      <questionnaire-step-five v-else-if="step === 5" />
      <questionnaire-step-six v-else-if="step === 6" />
      <questionnaire-step-seven v-else-if="step === 7" />
      <questionnaire-step-eight v-else-if="step === 8" />
      <questionnaire-step-nine v-else-if="step === 9" />
    </div>
  </div>
</template>

<script>
import QuestionnaireStepOne from '~/components/modal/forms/questionnaire-steps/questionnaire-step-one'
import QuestionnaireStepTwo from '~/components/modal/forms/questionnaire-steps/questionnaire-step-two'
import QuestionnaireStepThree from '~/components/modal/forms/questionnaire-steps/questionnaire-step-three'
import QuestionnaireStepFour from '~/components/modal/forms/questionnaire-steps/questionnaire-step-four'
import QuestionnaireStepFive from '~/components/modal/forms/questionnaire-steps/questionnaire-step-five.vue'
import QuestionnaireStepSix from '~/components/modal/forms/questionnaire-steps/questionnaire-step-six.vue'
import QuestionnaireStepSeven from '~/components/modal/forms/questionnaire-steps/questionnaire-step-seven.vue'
import QuestionnaireStepEight from '~/components/modal/forms/questionnaire-steps/questionnaire-step-eight.vue'
import QuestionnaireStepNine from '~/components/modal/forms/questionnaire-steps/questionnaire-step-nine.vue'
export default {
  name: 'FormQuestionnaireEu',
  components: {
    QuestionnaireStepOne,
    QuestionnaireStepTwo,
    QuestionnaireStepThree,
    QuestionnaireStepFour,
    QuestionnaireStepFive,
    QuestionnaireStepSix,
    QuestionnaireStepSeven,
    QuestionnaireStepEight,
    QuestionnaireStepNine
  },
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
<style lang="scss">
  #form_questionnaireEu,
  #form_questionnaireTrader {
    padding: 0 30px 30px;
  }

  .form-questionnaire-eu {
    display: flex;
    flex-direction: column;

    &-data {
      display: flex;
      flex-direction: column;

      &-steps {
        text-align: center;
        margin-top: 15px;
        line-height: 1;
        padding-bottom: 30px;
        border-bottom: 1px solid #d9dce1;

        &-title {
          font-size: 13px;
          color: #8e9aac;
          line-height: 1;
        }

        &-value {
          font-size: 13px;
          color: #8e9aac;
          line-height: 1;
        }
      }

      &-image {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 0;
      }
    }
  }
</style>
