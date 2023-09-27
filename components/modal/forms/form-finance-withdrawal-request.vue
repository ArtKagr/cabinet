<template>
  <b-form
    id="form_withdrawalRequest"
    ref="withdrawal-form"
    :key="formKey"
    class="modal-form"
    :class="direction"
    @submit="onSubmit"
  >
    <div class="form-withdrawal-request">
      <div v-if="info.messages && info.messages.length" class="form-withdrawal-request-messages">
        <div v-for="(message, key) in info.messages" :key="key" class="form-withdrawal-request-messages-message">
          <div class="form-withdrawal-request-messages-message-icon" :class="`-${dir}`">
            <lfx-icon-info />
          </div>
          <div class="form-withdrawal-request-messages-message-text" v-html="message" />
        </div>
      </div>
      <div class="form-withdrawal-request-fields" :class="info.messages && info.messages.length ? '' : '-no_message'">
        <b-form-group
          v-if="accountField"
          :label="accountField.label"
          :label-for="accountField.attribute"
          :description="accountField.error"
          :dir="dir"
          :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
        >
          <field-select
            v-model="accountField.value"
            :values="accountField.values"
            :error="!!accountField.error"
            @change="setValue($event, accountField.attribute)"
          />
        </b-form-group>
        <div v-if="purseField" class="form-withdrawal-request-field">
          <div class="form-withdrawal-request-field-purse" :class="`-${dir}`">
            <b-form-group
              :label="purseField.label"
              :label-for="purseField.attribute"
              :description="purseField.error"
              :dir="dir"
              :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
            >
              <field-select
                v-model="purseField.value"
                :values="purseField.values"
                :error="!!purseField.error"
                @change="setValue($event, purseField.attribute)"
              />
            </b-form-group>
          </div>
          <b-button
            class="form-withdrawal-request-field-button"
            :class="{ '-error': !!purseField.error, '-ltr': dir === 'ltr', '-rtl': dir === 'rtl' }"
            variant="outline-primary"
            @click="addPaymentMethod"
            v-text="$t('Добавить')"
          />
        </div>
        <b-form-group
          v-if="amountField && currencyField && currencyField.value"
          :label="amountField.label"
          :label-for="amountField.attribute"
          :description="amountField.error"
          :dir="dir"
          :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
        >
          <field-text
            v-model="amountField.value"
            :values="amountField.values"
            :form-title="formTitle"
            :error="!!amountField.error"
            :placeholder="currencyField.value"
            @change="setValue($event, amountField.attribute)"
          />
        </b-form-group>
        <div v-if="transferField" class="form-withdrawal-request-field">
          <div class="form-withdrawal-request-field-transfer" :class="currencyField ? '' : '-no_currency'">
            <b-form-group
              :label="transferField.label"
              :label-for="transferField.attribute"
              :description="transferField.error"
              :dir="dir"
              :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
            >
              <field-text
                v-model="transferField.value"
                :values="transferField.values"
                :form-title="formTitle"
                :error="!!transferField.error"
                @change="setValue($event, transferField.attribute)"
              />
            </b-form-group>
          </div>
          <div v-if="currencyField" class="form-withdrawal-request-field-currency" :class="`-${dir}`">
            <b-form-group
              :label="currencyField.label"
              :label-for="currencyField.attribute"
              :description="currencyField.error"
              :dir="dir"
              :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
            >
              <field-select
                v-model="currencyField.value"
                :values="currencyField.values"
                :error="!!currencyField.error"
                @change="setValue($event, currencyField.attribute)"
              />
            </b-form-group>
          </div>
        </div>
        <b-form-group
          v-if="paymentMethodField"
          :label="paymentMethodField.label"
          :label-for="paymentMethodField.attribute"
          :description="paymentMethodField.error"
          :dir="dir"
          :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
        >
          <field-select
            v-model="paymentMethodField.value"
            :values="paymentMethodField.values"
            :error="!!paymentMethodField.error"
            @change="setValue($event, paymentMethodField.attribute)"
          />
        </b-form-group>
      </div>
    </div>
    <div class="form-withdrawal-request-divider" />
    <div v-if="isButtonShown" :class="buttonClasses" class="form-withdrawal-request-button">
      <b-button ref="form-button" type="submit" class="w-100" variant="primary" v-text="$t(buttonText)" />
    </div>
  </b-form>
</template>

<script>
import form from '~/mixins/form'
import LfxIconInfo from '~/components/icons/lfx-icon-info'
import FieldSelect from '~/components/modal/fields/field-select'
import FieldText from '~/components/modal/fields/field-text'
export default {
  name: 'FormFinanceWithdrawalRequest',
  components: { FieldText, FieldSelect, LfxIconInfo },
  mixins: [form],
  data () {
    return {
      formKey: null
    }
  },
  computed: {
    info () {
      return this.$store.getters['finance/getters/handler/getWithdrawalInfo']
    },
    withdrawalInfoData () {
      return this.$store.getters['finance/getters/handler/getWithdrawalInfoData']
    },
    accountField () {
      return this.getField('account')
    },
    purseField () {
      return this.getField('purse')
    },
    amountField () {
      const result = this.getField('amount')
      if (result && result.required && this.transferField && this.transferField.value) {
        result.required = null
        return result
      }

      return this.getField('amount')
    },
    transferField () {
      return this.getField('transfer')
    },
    currencyField () {
      return this.getField('currency')
    },
    paymentMethodField () {
      return this.getField('payment_method')
    }
  },
  watch: {
    'amountField.value' (newValue) {
      if (newValue && this.isFetchInfo) {
        this.checkForm()

        if (this.isFormSuccess) {
          if (this.formTitle !== 'withdrawalRequest') {
            this.$store.dispatch('forms/actions/handler/fetchForm', 'withdrawalRequest')
          }
          this.$store.dispatch('forms/actions/handler/fetchWithdrawalResult', { formId: this.formId, values: { ...this.formValues, inPaymentCurrency: 0 } })
        }
      }
      if (!newValue) {
        this.changedForm = this.changedForm.map((field) => {
          if (field.attribute === 'transfer') {
            field.value = null
          }
          return field
        })
      }
    },
    'transferField.value' (newValue) {
      if (newValue && this.isFetchInfo) {
        this.checkForm()

        if (this.isFormSuccess) {
          if (this.formTitle !== 'withdrawalRequest') {
            this.$store.dispatch('forms/actions/handler/fetchForm', 'withdrawalRequest')
          }
          this.$store.dispatch('forms/actions/handler/fetchWithdrawalResult', { formId: this.formId, values: { ...this.formValues, inPaymentCurrency: 1 } })
        }
      }
      if (!newValue) {
        this.changedForm = this.changedForm.map((field) => {
          if (field.attribute === 'transfer') {
            field.value = null
          }
          return field
        })
      }
    },
    'withdrawalInfoData.amount' (newValue) {
      this.isFetchInfo = false
      if (newValue) {
        this.changedForm = this.changedForm.map((field) => {
          if (field.attribute === 'amount') {
            field.value = newValue
          }
          return field
        })
      }
    },
    'withdrawalInfoData.transfer' (newValue) {
      this.isFetchInfo = false
      this.changedForm = this.changedForm.map((field) => {
        if (field.attribute === 'transfer') {
          field.value = newValue
        }
        return field
      })
    }
  },
  methods: {
    async addPaymentMethod () {
      switch (this.info.type) {
        case 'card':
          await this.fetchForm('addCard')
          break
        case 'bank':
          await this.fetchForm('addBank')
          break
        case 'electronic':
        case 'crypto':
        case 'local_withdrawal':
          await this.fetchForm('addWallet')
          break
      }
    },
    recalculateKey () {
      this.formKey = Math.floor(Math.random() * 1000000)
    }
  }
}
</script>
<style lang="scss">
  #form_withdrawalRequest {
    padding: 0;
    max-width: 540px;

    @media screen and (max-width: 767px) {
      max-width: 100%;
    }
  }

  .form-withdrawal-request {
    display: flex;
    flex-direction: column;
    width: 100%;

    &-messages {
      display: flex;
      flex-direction: column;
      margin: 20px 0 0 0;

      &-message {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        &-icon {

          &.-ltr {
            margin-right: 10px;
          }

          &.-rtl {
            margin-left: 10px;
          }

          svg {
            width: 19px;
            height: 19px;
            fill: #fbbc05;
          }
        }

        &-text {
          font-size: 14px;
          color: #3B4B68;

          &.-rtl {
            text-align: right;
          }
        }
      }
    }

    &-field {
      display: flex;
      align-items: center;
      width: 100%;

      &-button {
        width: 150px;
        height: 38px;

        &.-ltr {
          margin-left: 10px;
        }

        &.-rtl {
          margin-right: 10px;
        }

        &.-error {
          margin-bottom: 19px;
        }
      }

      &-purse {
        width: calc(100% - 150px);
      }

      &-transfer {
        width: calc(100% - 150px);

        &.-no_currency {
          width: 100%;
        }
      }

      &-amount {
        width: 90%;

        &-hint {
          font-size: 10px;
          color: #6d788a;
          padding-top: 5px;
        }
      }

      &-currency {
        width: 150px;

        &.-ltr {
          margin-left: 10px;
        }

        &.-rtl {
          margin-right: 10px;
        }

        div {
          div {
            height: 41px;
          }
        }
      }
    }

    &-divider {
      margin-bottom: 20px;
      height: 1px;
      width: 100%;
      background-color: #d9dce1;
    }

    &-secure {
      display: flex;
      align-items: center;

      &-icon {

        &.-ltr {
          margin-right: 5px;
        }

        &.-rtl {
          margin-left: 5px;
        }
      }

      &-text {
        font-size: 9px;
        color: #00000099;
        line-height: 1;
      }
    }

    &-fields {
      display: flex;
      flex-direction: column;
      width: 100%;

      &.-no_message {
        margin-top: 20px;
      }
    }

    &-button {
      width: 120px;
      margin-bottom: 20px;
    }
  }
</style>
