<template>
  <div class="modal-custom">
    <div class="modal-custom-container" :class="`-${formTitle}`">
      <div class="modal-custom-container-modal" :class="`-${formTitle}`">
        <!-- head -->
        <div class="modal-container-head" :class="`-${formTitle}`">
          <div v-if="['questionnaireEu', 'questionnaireTrader'].includes(formTitle)" class="modal-container-head-questionnaire">
            <lfx-icon-arrow-back
              v-if="step > 1"
              class="modal-container-head-questionnaire-arrow"
              :class="{ 'rotate_180': isRtlMode }"
              @click.native="setPreviousStep(step - 1)"
            />
            <span class="modal-container-head-title" v-text="stepTitles[step]" />
          </div>
          <span v-else-if="formTitle === 'withdrawalRequestModal'" class="modal-container-head-title" v-text="$t(withdrawalInfo.name)" />
          <span v-else-if="formTitle === 'depositRequestModal'" class="modal-container-head-title" v-text="$t(depositInfo.name)" />
          <span v-else-if="formTitle === 'depositRequestCard'" class="modal-container-head-title" v-text="$t(depositInfo.name)" />
          <span v-else class="modal-container-head-title" v-text="$t(formData.head)" />
          <lfx-icon-close class="modal-container-head-close" @click.native="closeModal()" />
        </div>
        <!-- form -->
        <main-form />
      </div>
    </div>
  </div>
</template>

<script>
import modal from '~/mixins/modal'
import LfxIconClose from '~/components/icons/lfx-icon-close'
import MainForm from '~/components/modal/forms/main-form'
import LfxIconArrowBack from '~/components/icons/lfx-icon-arrow-back'
export default {
  name: 'Modal',
  components: { LfxIconArrowBack, MainForm, LfxIconClose },
  mixins: [modal],
  computed: {
    stepTitles () {
      return this.formTitle === 'questionnaireEu'
        ? {
            1: this.$t('Персональная информация'),
            2: this.$t('Инвестиционная Информация'),
            3: this.$t('Финансовый Источник'),
            4: this.$t('Опыт'),
            5: `${this.$t('Знания')} ${this.$t('часть {number}', { number: 1 })}`,
            6: `${this.$t('Знания')} ${this.$t('часть {number}', { number: 2 })}`,
            7: `${this.$t('Знания')} ${this.$t('часть {number}', { number: 3 })}`,
            8: this.$t('Образование'),
            9: this.$t('Знания и опыт работы с копированием сделок')
          }
        : {
            1: this.$t('Опросник трейдера'),
            2: this.$t('Опросник трейдера')
          }
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    formData () {
      return this.$store.getters['forms/getters/handler/getFormData'](null)
    },
    formTitle () {
      return this.$store.getters['forms/getters/handler/getFormTitle']
    },
    withdrawalInfo () {
      return this.$store.getters['finance/getters/handler/getWithdrawalInfo']
    },
    depositInfo () {
      return this.$store.getters['finance/getters/handler/getDepositInfo']
    },
    step () {
      return Number(this.$store.getters['profile/getters/handler/getQuestionnaireEuSteps'].step)
    }
  },
  methods: {
    setPreviousStep (step) {
      localStorage.setItem('step_quest_eu', step)
      this.$store.dispatch('forms/actions/handler/fetchForm', this.formTitle)
    }
  }
}
</script>

<style lang="scss">
  .modal-custom {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 9998;
    transition: all .4s;
    background: rgba(59,75,104,.25);
    padding-top: 30px;
    overflow: auto;

    @media screen and (max-width: 767px) {
      padding: 0;
      height: calc(100% - 60px);
      transform: translateY(60px);
      z-index: 2998;
      border-top: 1px solid #eaeced;
    }

    &-container {
      display: flex;
      align-items: baseline;
      width: 430px;
      height: 100%;
      margin: 0 auto;

      &.-depositRequestCard,
      &.-depositRequestModal,
      &.-withdrawalRequestModal {
        width: 720px;

        @media screen and (max-width: 767px) {
          width: 100%;
        }
      }

      &.-registration,
      &.-registrationPage {
        width: 480px;

        @media screen and (max-width: 767px) {
          width: 100%;
        }
      }

      &.-copyAction,
      &.-financeHistory,
      &.-affiliateCreateCompany,
      &.-affiliateEditCompany,
      &.-buyVps {
        width: 360px;

        @media screen and (max-width: 767px) {
          width: 100%;
        }
      }

      @media screen and (max-width: 767px) {
        width: 100%;
      }

      &-modal {
        width: 430px;
        background-color: white;
        margin: auto 0;

        &.-depositRequestCard,
        &.-depositRequestModal,
        &.-withdrawalRequestModal {
          width: 720px;

          @media screen and (max-width: 767px) {
            width: 100%;
          }
        }

        &.-registration,
        &.-registrationPage {
          width: 480px;

          @media screen and (max-width: 767px) {
            width: 100%;
          }
        }

        &.-copyAction,
        &.-financeHistory,
        &.-affiliateCreateCompany,
        &.-affiliateEditCompany {
          width: 360px;

          @media screen and (max-width: 767px) {
            width: 100%;
          }
        }

        @media screen and (max-width: 767px) {
          width: 100%;
          height: 100%;
        }

      }
    }
  }
</style>
