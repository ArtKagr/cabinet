<template>
  <div class="popup-finance-withdrawal-info">
    <div class="popup-finance-withdrawal-info-head">
      <span class="popup-finance-withdrawal-info-head-title" :class="`-${dir}`" v-text="$t('Введите проверочный код')" />
    </div>
    <div class="popup-finance-withdrawal-info-rows">
      <div v-for="row in info" :key="row.attribute" class="popup-finance-withdrawal-info-rows-row">
        <div class="popup-finance-withdrawal-info-rows-row-column" :class="`-${dir}`">
          <span class="popup-finance-withdrawal-info-rows-row-column-label" :class="`-${dir}`" v-text="row.label" />
        </div>
        <div class="popup-finance-withdrawal-info-rows-row-column" :class="`-${dir}`">
          <span class="popup-finance-withdrawal-info-rows-row-column-value" :class="`-${dir}`" v-text="row.value" />
        </div>
      </div>
    </div>
    <div v-if="isCode" class="popup-finance-withdrawal-info-body">
      <span
        class="popup-finance-withdrawal-info-body-text"
        :class="`-${dir}`"
        v-text="message"
      />
      <div class="popup-finance-withdrawal-info-body-input">
        <field-text v-model="code" :placeholder="$t('Код подтверждения')" @change="setCode" />
      </div>
      <div v-if="timer > 0" class="popup-finance-withdrawal-info-body-hint">
        <span :class="`-${dir}`" v-text="$t('Запросить код повторно можно через {time}', { time: moment(timer).format('mm:ss') })" />
      </div>
      <div v-else class="popup-finance-withdrawal-info-body-hint -primary">
        <span
          :class="`-${dir}`"
          @click="setWithdrawalConfirmCode"
          v-text="$t('Запросить код повторно')"
        />
      </div>
    </div>
    <b-button
      class="popup-finance-withdrawal-info-body-button"
      variant="primary"
      @click="confirmCode"
      v-text="$t('Подтвердить')"
    />
  </div>
</template>

<script>
import moment from 'moment'
import FieldText from '~/components/modal/fields/field-text'
export default {
  name: 'PopupFinanceWithdrawalInfo',
  components: { FieldText },
  data () {
    return {
      moment,
      timer: 0,
      timerId: null,
      code: null
    }
  },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    withdrawalResponse () {
      return this.$store.getters['finance/getters/handler/getWithdrawalResponse']
    },
    info () {
      return this.withdrawalResponse.data.info
    },
    isCode () {
      return this.withdrawalResponse.data.code
    },
    resendSec () {
      return this.$store.getters['finance/getters/handler/getWithdrawalConfirmResendSec']
    },
    message () {
      return this.$store.getters['finance/getters/handler/getWithdrawalConfirmMessage']
    }
  },
  watch: {
    resendSec (newValue) {
      if (newValue > 0) {
        this.setTimer(newValue)
      }
    }
  },
  created () {
    if (this.isCode) {
      this.setWithdrawalConfirmCode()
    }
  },
  methods: {
    setTimer (time) {
      this.timer = time * 1000
      this.timerId = setInterval(() => {
        if (this.timer > 0) {
          this.timer = this.timer - 100
        }
      }, 100)
    },
    setCode (value) {
      this.code = value
    },
    setWithdrawalConfirmCode () {
      clearInterval(this.timerId)
      this.$store.dispatch('finance/actions/handler/sendWithdrawalConfirmCode')
    },
    confirmCode () {
      this.$store.dispatch('finance/actions/handler/confirmWithdrawal', this.code)
    }
  }
}
</script>
<style lang="scss">
  .popup-finance-withdrawal-info {
    display: flex;
    flex-direction: column;

    &-head {
      display: flex;
      align-items: center;
      padding: 18px 20px;

      &-title {
        font-size: 20px;
        color: #3B4B68;
        line-height: 1;

        &.-rtl {
          text-align: right;
        }
      }
    }

    &-rows {
      display: flex;
      flex-direction: column;
      padding: 0 20px;

      &-row {
        display: flex;
        align-items: center;
        padding: 13px 0;
        width: 100%;
        border-bottom: 1px solid #b8dbf2;

        &:last-child {
          border-bottom: none;
        }

        &-column {
          display: flex;
          width: 50%;

          &.-ltr {
            &:first-child {
              padding-right: 13px;
            }
          }

          &.-rtl {
            &:nth-child(2) {
              padding-right: 13px;
            }
          }

          &-label {
            font-size: 11px;
            color: #424b59;

            &.-rtl {
              text-align: right;
            }
          }

          &-value {
            font-size: 13px;
            color: #424b59;

            &.-rtl {
              text-align: right;
            }
          }
        }
      }
    }

    &-body {
      display: flex;
      flex-direction: column;
      padding: 20px 30px 0;
      border-top: 1px solid #d9dce1;

      &-text {
        font-size: 13px;
        color: #8e9aac;
        line-height: 1.4;

        &.-rtl {
          text-align: right;
        }
      }

      &-input {
        margin-top: 13px;
      }

      &-hint {
        margin-top: 20px;
        font-size: 13px;
        color: #8e9aac;
        text-align: right;

        &.-primary {
          color: #3498db;
          cursor: pointer;
        }

        &.-rtl {
          text-align: left;
        }
      }

      &-button {
        margin: 30px;
        font-size: 16px !important;
      }
    }
  }
</style>
