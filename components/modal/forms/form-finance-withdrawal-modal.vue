<template>
  <div class="form-withdrawal-container">
    <div class="form-withdrawal-container-block">
      <div class="form-withdrawal-container-form">
        <b-form :id="`form_${id || formTitle}`" class="modal-form" :class="direction" @submit="onSubmit">
          <div class="form-withdrawal-modal">
            <div v-if="info.messages && info.messages.length" class="form-withdrawal-modal-messages">
              <div v-for="(message, key) in info.messages" :key="key" class="form-withdrawal-modal-messages-message">
                <div class="form-withdrawal-modal-messages-message-icon" :class="`-${dir}`">
                  <lfx-icon-info />
                </div>
                <div class="form-withdrawal-modal-messages-message-text" :class="`-${dir}`" v-html="message" />
              </div>
            </div>
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
            <div v-if="purseField" class="form-withdrawal-modal-field">
              <div class="form-withdrawal-modal-field-purse" :class="`-${dir}`">
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
                class="form-withdrawal-modal-field-button"
                :class="{ '-error': !!purseField.error, '-ltr': dir === 'ltr', '-rtl': dir === 'rtl' }"
                variant="outline-primary"
                @click="addPaymentMethod"
                v-text="$t('Добавить')"
              />
            </div>
            <b-form-group
              v-if="amountField"
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
                :placeholder="account.currency"
                @change="setValue($event, amountField.attribute)"
              />
            </b-form-group>
            <div v-if="transferField" class="form-withdrawal-modal-field">
              <div class="form-withdrawal-modal-field-transfer" :class="currencyField ? '' : '-no_currency'">
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
              <div v-if="currencyField" class="form-withdrawal-modal-field-currency" :class="`-${dir}`">
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
        </b-form>
      </div>
      <div class="form-withdrawal-container-image">
        <img :src="info.icon" alt>
        <span class="form-withdrawal-container-image-text" :class="`-${dir}`" v-text="`${$t('Мин. платёж')} ${info.min_amount}`" />
        <span class="form-withdrawal-container-image-text" :class="`-${dir}`" v-text="`${$t('Комиссия')}: ${info.commission}`" />
      </div>
    </div>
    <div class="form-withdrawal-modal-divider" />
    <div v-if="isButtonShown" :class="buttonClasses" class="form-withdrawal-modal-button">
      <b-button
        ref="form-button"
        type="submit"
        class="w-100"
        variant="primary"
        @click="onSubmit"
        v-text="$t(buttonText)"
      />
    </div>
  </div>
</template>

<script>
import form from '~/mixins/form'
import LfxIconInfo from '~/components/icons/lfx-icon-info'
import FieldSelect from '~/components/modal/fields/field-select'
import FieldText from '~/components/modal/fields/field-text'
export default {
  name: 'FormFinanceWithdrawalModal',
  components: { FieldText, FieldSelect, LfxIconInfo },
  mixins: [form],
  computed: {
    info () {
      return this.$store.getters['finance/getters/handler/getWithdrawalInfo']
    },
    accountField () {
      return this.getField('account')
    },
    purseField () {
      return this.getField('purse')
    },
    amountField () {
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
      if (newValue) {
        this.checkForm()

        if (this.isFormSuccess) {
          this.$store.dispatch('forms/actions/handler/fetchForm', { formId: this.formId, values: this.formValues, flag: 'no-open-modal' })
        }
      }
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
        default:
          await this.fetchForm('addWallet')
      }
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

#form_withdrawalRequestModal {
  padding: 0;
  max-width: 720px;

  @media screen and (max-width: 767px) {
    max-width: 100%;
  }
}

.form-withdrawal-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;

  &-block {
    display: flex;
    width: 100%;
  }

  &-form {
    width: 70%;
  }

  &-image {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    padding: 0 20px;

    img {
      width: 100px;
      height: 100px;
      margin-bottom: 13px;
    }

    &-text {
      font-size: 13px;
      color: #3B4B68;
      width: 100%;

      &.-rtl {
        text-align: right;
      }
    }
  }
}

.form-withdrawal-modal {
  display: flex;
  flex-direction: column;
  width: 100%;

  &-messages {
    display: flex;
    flex-direction: column;

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

  &-button {
    width: 120px;
    margin-bottom: 20px;
  }
}
</style>
