<template>
  <div class="popup-demo_real">
    <div class="popup-demo_real-block -real">
      <div class="d-flex flex-column">
        <span class="popup-demo_real-block-title" :class="`-${dir}`" v-text="$t('Реальная торговля')" />
        <span class="popup-demo_real-block-description" :class="`-${dir}`" v-text="$t('Хотите начать торговать на реальном счете?')" />
      </div>
      <b-button type="submit" class="popup-demo_real-block-button" variant="dark-primary" @click="openRegistration" v-text="$t('Регистрация')" />
    </div>
    <div class="popup-demo_real-block -demo">
      <div class="d-flex flex-column">
        <span class="popup-demo_real-block-title" :class="`-${dir}`" v-text="$t('Демо-режим')" />
        <span v-if="isAuthUserDemo || isDemoTour" class="popup-demo_real-block-description" :class="`-${dir}`" v-text="$t('Продолжить работу в демо-режиме с виртуальными средствами')" />
        <span v-else class="popup-demo_real-block-description" :class="`-${dir}`" v-text="$t('На Ваш демо-счет будет зачислено 10 000.00 USD')" />
      </div>
      <div class="d-flex flex-column w-100">
        <div v-if="isAuthUserDemo || isDemoTour" class="d-flex flex-column mb-3">
          <span class="text-secondary-12 mb-1" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Сумма')" />
          <field-numeric
            class="popup-demo_real-block-numeric"
            :value="amount"
            :label="account.currency || 'USD'"
            :counter="100"
            :max="1000000"
            :digits="2"
            @change="setAmount"
          />
        </div>
        <b-button class="popup-demo_real-block-button" variant="primary" @click="demoModeAction" v-text="$t('Продолжить')" />
      </div>
    </div>
  </div>
</template>

<script>
import FieldNumeric from '~/components/modal/fields/field-numeric'
export default {
  name: 'PopupDemoReal',
  components: { FieldNumeric },
  computed: {
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    isDemoTour () {
      return this.$store.getters['dictionaries/getters/user/isDemoTour']
    },
    isAuthUserDemo () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUserDemo']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    amount () {
      return this.$store.getters['forms/getters/handler/getDemoDepositAmount']
    }
  },
  created () {
    this.setAmount(10000)
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    demoCreate () {
      this.$store.dispatch('dictionaries/actions/auth/demoCreate')
    },
    fetchForm (formTitle) {
      this.$store.dispatch('forms/actions/handler/fetchForm', formTitle)
    },
    openRegistration () {
      this.togglePopup(false)
      this.fetchForm('registration')
    },
    demoModeAction () {
      this.togglePopup(false)
      this.isDemoTour || this.isAuthUserDemo ? this.fetchForm('demoDeposit') : this.demoCreate()
    },
    setAmount (value) {
      this.$store.commit('forms/mutations/handler/SAVE_DEMO_DEPOSIT_AMOUNT', {
        rootData: this.$store.state.forms.state.handler,
        data: value
      })
    }
  }
}
</script>
<style lang="scss">
  .popup-demo_real {
    display: flex;
    align-items: center;
    width: 100%;

    @media screen and (max-width: 767px) {
      flex-direction: column;
      height: 100%;
    }

    &-block {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 50%;
      height: 265px;
      padding: 20px;

      @media screen and (max-width: 767px) {
        width: 100%;
        height: 50%;
      }

      &.-demo {
        background-color: #d9dce1;
      }

      &-title {
        font-size: 20px;
        color: #3B4B68;
        line-height: 1;
        margin-bottom: 15px;

        &.-rtl {
          text-align: right;
        }
      }

      &-description {
        font-size: 13px;
        color: #8e9aac;

        &.-rtl {
          text-align: right;
        }
      }

      &-numeric {

        input {
          border: none;
          font-size: 18px;
          padding: 9px 14px;
          text-align: right;
        }
      }

      &-button {
        font-size: 16px !important;
        text-transform: uppercase !important;
        color: white !important;
        font-weight: 500 !important;
        width: 100% !important;
      }
    }
  }
</style>
