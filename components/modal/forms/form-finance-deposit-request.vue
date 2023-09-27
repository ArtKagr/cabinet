<template>
  <b-form id="form_depositRequest" class="modal-form" :class="direction" @submit="onSubmit">
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
        <b-form-group
          v-if="phoneNumberField"
          :label="phoneNumberField.label"
          :label-for="phoneNumberField.attribute"
          :description="phoneNumberField.error"
          :dir="dir"
          :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
        >
          <field-text
            v-model="phoneNumberField.value"
            :values="phoneNumberField.values"
            :form-title="formTitle"
            :error="!!phoneNumberField.error"
            @change="setValue($event, phoneNumberField.attribute)"
          />
        </b-form-group>
        <b-form-group
          v-if="rollBackAddressField"
          :label="rollBackAddressField.label"
          :label-for="rollBackAddressField.attribute"
          :description="rollBackAddressField.error"
          :dir="dir"
          :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
        >
          <field-text
            v-model="rollBackAddressField.value"
            :values="rollBackAddressField.values"
            :form-title="formTitle"
            :error="!!rollBackAddressField.error"
            @change="setValue($event, rollBackAddressField.attribute)"
          />
        </b-form-group>
        <b-form-group
          v-if="bankField"
          :label="bankField.label"
          :label-for="bankField.attribute"
          :description="bankField.error"
          :dir="dir"
          :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
        >
          <field-select
            v-model="bankField.value"
            :values="bankField.values"
            :error="!!bankField.error"
            @change="setValue($event, bankField.attribute)"
          />
        </b-form-group>
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
        <b-form-group
          v-if="taxIdMethodField"
          :label="taxIdMethodField.label"
          :label-for="taxIdMethodField.attribute"
          :description="taxIdMethodField.error"
          :dir="dir"
          :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
        >
          <field-text
            v-model="taxIdMethodField.value"
            :values="taxIdMethodField.values"
            :form-title="formTitle"
            :error="!!taxIdMethodField.error"
            @change="setValue($event, taxIdMethodField.attribute)"
          />
        </b-form-group>
        <b-form-group
          v-if="identityField"
          :label="identityField.label"
          :label-for="identityField.attribute"
          :description="identityField.error"
          :dir="dir"
          :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
        >
          <field-text
            v-model="identityField.value"
            :values="identityField.values"
            :form-title="formTitle"
            :error="!!identityField.error"
            @change="setValue($event, identityField.attribute)"
          />
        </b-form-group>
        <b-form-group
          v-if="payMethodField"
          :label="payMethodField.label"
          :label-for="payMethodField.attribute"
          :description="payMethodField.error"
          :dir="dir"
          :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
        >
          <field-select
            v-model="payMethodField.value"
            :values="payMethodField.values"
            :error="!!payMethodField.error"
            @change="setValue($event, payMethodField.attribute)"
          />
        </b-form-group>
        <b-form-group
          v-if="bankIdField"
          :label="bankIdField.label"
          :label-for="bankIdField.attribute"
          :description="bankIdField.error"
          :dir="dir"
          :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
        >
          <field-select
            v-model="bankIdField.value"
            :values="bankIdField.values"
            :error="!!bankIdField.error"
            @change="setValue($event, bankIdField.attribute)"
          />
        </b-form-group>
        <div v-if="bankIdField && isLocal && local.banks && local.banks.length" class="bank-hint">
          <div class="bank-hint-pointer" :class="`-${dir}`" />
          <span class="bank-hint-title" :class="`-${dir}`" v-text="currentBankHint.title" />
          <div class="bank-hint-container">
            <div class="d-flex flex-column mb-2">
              <span class="bank-hint-container-title" :class="`-${dir}`" v-text="currentBankHint.title_bank" />
              <span class="bank-hint-container-text" :class="`-${dir}`" v-text="currentBankHint.bank" />
            </div>
            <div v-if="currentBankHint.name" class="d-flex flex-column mb-2">
              <span class="bank-hint-container-title" :class="`-${dir}`" v-text="currentBankHint.title_name" />
              <span class="bank-hint-container-text" :class="`-${dir}`" v-text="currentBankHint.name" />
            </div>
            <div v-if="currentBankHint.account" class="d-flex flex-column">
              <span class="bank-hint-container-title" :class="`-${dir}`" v-text="currentBankHint.title_account" />
              <span class="bank-hint-container-text" :class="`-${dir}`" v-text="currentBankHint.account" />
            </div>
          </div>
        </div>
        <b-form-group
          v-if="userDateField"
          :label="userDateField.label"
          :label-for="userDateField.attribute"
          :description="userDateField.error"
          :dir="dir"
          :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
        >
          <field-text
            v-model="userDateField.value"
            :values="userDateField.values"
            :form-title="formTitle"
            :error="!!userDateField.error"
            @change="setValue($event, userDateField.attribute)"
          />
        </b-form-group>
        <b-form-group
          v-if="userTimeField"
          :label="userTimeField.label"
          :label-for="userTimeField.attribute"
          :description="userTimeField.error"
          :dir="dir"
          :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
        >
          <field-text
            v-model="userTimeField.value"
            :values="userTimeField.values"
            :form-title="formTitle"
            :error="!!userTimeField.error"
            @change="setValue($event, userTimeField.attribute)"
          />
        </b-form-group>
        <b-form-group
          v-if="confirmationField"
          :label="confirmationField.label"
          :label-for="confirmationField.attribute"
          :description="confirmationField.error"
          :dir="dir"
          :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
        >
          <field-text
            v-model="confirmationField.value"
            :values="confirmationField.values"
            :form-title="formTitle"
            :error="!!confirmationField.error"
            @change="setValue($event, confirmationField.attribute)"
          />
        </b-form-group>
        <b-form-group
          v-if="fileField"
          :label="fileField.label"
          :label-for="fileField.attribute"
          :description="fileField.error"
          :dir="dir"
          :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
        >
          <field-file @change="setValue($event, fileField.attribute)" />
        </b-form-group>
        <div v-if="currencyField" class="form-withdrawal-request-field align-items-baseline">
          <div class="form-withdrawal-request-field-amount">
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
                :placeholder="currencyField.value"
                @change="setValue($event, amountField.attribute)"
              />
              <span class="form-withdrawal-request-field-amount-hint" v-text="`${$t('Мин. платёж')}: ${info.min_amount}`" />
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
        <div>
          <div v-if="promoCodeField" class="form-deposit-request-use_promocode" @click="togglePromoCodeVisible">
            <lfx-icon-checkbox-fill v-if="isPromoCodeVisible" class="form-deposit-request-use_promocode-icon" />
            <lfx-icon-checkbox v-else class="form-deposit-request-use_promocode-icon" />
            <span class="form-deposit-request-use_promocode-text" :class="`-${dir}`" v-text="$t('Использовать промокод')" />
          </div>
          <b-form-group
            v-if="promoCodeField && isPromoCodeVisible"
            :description="promoCodeField.error"
            :dir="dir"
            :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
          >
            <field-text
              v-model="promoCodeField.value"
              :values="promoCodeField.values"
              :form-title="formTitle"
              :error="!!promoCodeField.error"
              @change="setValue($event, promoCodeField.attribute)"
            />
          </b-form-group>
        </div>
        <div v-if="depoAmountField" class="form-deposit-request-depo_amount">
          <span class="form-deposit-request-depo_amount-title" v-text="depoAmountField.label" />
          <span class="form-deposit-request-depo_amount-value" v-text="depoAmountField.value" />
        </div>
      </div>
    </div>
    <div
      v-if="amountField && amountField.value && depositInfoData && depositInfoData.amount"
      class="finance-depo-hint"
    >
      <span class="finance-depo-hint-title" :class="`-${dir}`" v-text="$t('Вы получите')" />
      <span class="finance-depo-hint-value" :class="`-${dir}`" v-text="depositInfoData.amount" />
      <span
        v-if="depositInfoData.promo_code_url"
        class="finance-depo-hint-promo_link"
        :class="`-${dir}`"
        v-html="$t('Я согласен с {link}условиями использования бонуса{/link}', { link: '<a class=finance-depo-hint-promo_link-link>', '/link': '</a>' })"
      />
    </div>
    <div class="form-withdrawal-request-divider" />
    <div class="d-flex align-items-center justify-content-between w-100">
      <div v-if="isButtonShown" :class="buttonClasses" class="form-withdrawal-request-button m-0">
        <b-button ref="form-button" type="submit" class="w-100" variant="primary" v-text="$t(buttonText)" />
      </div>
      <div class="form-withdrawal-request-secure">
        <div class="form-withdrawal-request-secure-icon" :class="`-${dir}`">
          <lfx-icon-lock />
        </div>
        <span class="form-withdrawal-request-secure-text" v-text="'HTTP and SSL secure'" />
      </div>
    </div>
  </b-form>
</template>

<script>
import form from '~/mixins/form'
import LfxIconInfo from '~/components/icons/lfx-icon-info'
import FieldSelect from '~/components/modal/fields/field-select'
import FieldText from '~/components/modal/fields/field-text'
import LfxIconCheckbox from '~/components/icons/lfx-icon-checkbox'
import LfxIconCheckboxFill from '~/components/icons/lfx-icon-checkbox-fill'
import LfxIconLock from '~/components/icons/lfx-icon-lock'
import FieldFile from '~/components/modal/fields/field-file'
export default {
  name: 'FormFinanceDepositRequest',
  components: { FieldFile, LfxIconLock, LfxIconCheckboxFill, LfxIconCheckbox, FieldText, FieldSelect, LfxIconInfo },
  mixins: [form],
  data () {
    return {
      isPromoCodeVisible: false
    }
  },
  computed: {
    info () {
      return this.$store.getters['finance/getters/handler/getDepositInfo']
    },
    local () {
      return this.$store.getters['finance/getters/handler/getDepositLocalData']
    },
    isLocal () {
      return Object.keys(this.local).length
    },
    depositInfoData () {
      return this.$store.getters['finance/getters/handler/getDepositInfoData']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    currentBankHint () {
      if (this.bankIdField && this.isLocal && this.local.banks && this.local.banks.length) {
        return this.local.banks.find(bank => bank.bank_id === this.bankIdField.value)
      }

      return {}
    },
    infoResponse () {
      return this.$store.getters['finance/getters/handler/getDepositInfoResponse']
    },
    accountField () {
      return this.getField('account')
    },
    amountField () {
      return this.getField('amount')
    },
    currencyField () {
      return this.getField('currency')
    },
    promoCodeField () {
      return this.getField('promo_code')
    },
    numberField () {
      return this.getField('number')
    },
    rollBackAddressField () {
      return this.getField('rollback_address')
    },
    bankField () {
      return this.getField('bank')
    },
    bankIdField () {
      return this.getField('bank_id')
    },
    paymentMethodField () {
      return this.getField('payment_method')
    },
    payMethodField () {
      return this.getField('pay_method')
    },
    taxIdMethodField () {
      return this.getField('tax_id')
    },
    identityField () {
      return this.getField('identity')
    },
    depoAmountField () {
      return this.getField('depo_amount')
    },
    userDateField () {
      return this.getField('user_date')
    },
    userTimeField () {
      return this.getField('user_time')
    },
    phoneNumberField () {
      return this.getField('phone_number')
    },
    depoAmount () {
      return this.getField('depo_amount')
    },
    confirmationField () {
      return this.getField('confirmation')
    },
    fileField () {
      return this.getField('file')
    }
  },
  watch: {
    'amountField.value' (newValue) {
      if (newValue) {
        this.checkForm()

        if (this.isFormSuccess) {
          this.$store.dispatch('forms/actions/handler/fetchDepositResult', { formId: this.formId, values: this.formValues })
        }
      }
    },
    'promoCodeField.value' (newValue) {
      if (newValue) {
        this.checkForm()

        if (this.isFormSuccess) {
          this.$store.dispatch('forms/actions/handler/fetchDepositResult', { formId: this.formId, values: this.formValues })
        }
      }
    }
  },
  async destroyed () {
    await this.$store.dispatch('forms/actions/handler/saveDepositInfoData')
  },
  methods: {
    togglePromoCodeVisible () {
      this.isPromoCodeVisible = !this.isPromoCodeVisible
    }
  }
}
</script>
<style lang="scss">
  #form_depositRequest {
    padding: 0;
    max-width: 540px;

    @media screen and (max-width: 767px) {
      max-width: 100%;
    }
  }

  .bank-hint {
    display: flex;
    flex-direction: column;
    background: #f0f6fa;
    margin-bottom: 20px;
    position: relative;

    &-pointer {
      position: absolute;
      width: 15px;
      height: 15px;
      transform: rotate(45deg);
      background: #f0f6fa;
      top: -7px;

      &.-ltr {
        left: 30px;
      }

      &.-rtl {
        right: 30px;
      }
    }

    &-title {
      padding: 20px 20px 13px 20px;
      font-size: 13px;
      color: #3B4B68;
      border-bottom: 1px solid #d9dce1;

      &.-rtl {
        text-align: right;
      }
    }

    &-container {
      display: flex;
      flex-direction: column;
      padding: 20px;

      &-title {
        font-size: 11px;
        color: rgba(93,104,120,.8);

        &.-rtl {
          text-align: right;
        }
      }

      &-text {
        color: #2c3542;

        &.-rtl {
          text-align: right;
        }
      }
    }
  }

  .form-deposit-request {

    &-use_promocode {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      cursor: pointer;

      &.-rtl {

      }

      &-icon {
        width: 20px;
        height: 20px;
      }

      &-text {
        font-size: 12px;
        color: #6d788a;

        &.-ltr {
          margin-left: 10px;
        }

        &.-rtl {
          margin-right: 10px;
        }
      }
    }

    &-depo_amount {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;

      &-title {
        font-size: 12px;
        color: #3b4b68;
        margin-bottom: 5px;

        &.-rtl {
          text-align: right;
        }
      }

      &-value {
        padding: 10px;
        font-size: 16px;
        color: #3B4B68;
        background-color: #f0f6fa;
        line-height: 1.2;
        height: 40px;

        &.-rtl {
          text-align: right;
        }
      }
    }
  }

</style>
