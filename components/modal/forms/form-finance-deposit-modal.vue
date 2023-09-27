<template>
  <b-form id="form_depositRequestModal" class="modal-form" :class="direction" @submit="onSubmit">
    <div class="d-flex w-100 justify-content-between">
      <div class="form-withdrawal-request">
        <div v-if="info.messages && info.messages.length" class="form-withdrawal-request-messages mt-0">
          <div v-for="(message, key) in info.messages" :key="key" class="form-withdrawal-request-messages-message">
            <div class="form-withdrawal-request-messages-message-icon" :class="`-${dir}`">
              <lfx-icon-info />
            </div>
            <div class="form-withdrawal-request-messages-message-text" v-html="message" />
          </div>
        </div>
        <div v-if="accountField" class="form-withdrawal-request-fields">
          <b-form-group
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
                  :placeholder="account.currency"
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
          <div v-if="promoCodeField">
            <div class="form-deposit-request-use_promocode" :class="`-${dir}`" @click="togglePromoCodeVisible">
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
          <div v-if="depoAmount" class="form-deposit-request-depo_amount">
            <span class="form-deposit-request-depo_amount-title" :class="`-${dir}`" v-text="depoAmount.label" />
            <span class="form-deposit-request-depo_amount-value" :class="`-${dir}`" v-text="depoAmount.value" />
            <span
              v-if="depositInfoData.promo_code_url"
              class="finance-depo-hint-promo_link"
              :class="`-${dir}`"
              v-html="$t('Я согласен с {link}условиями использования бонуса{/link}', { link: '<a class=finance-depo-hint-promo_link-link>', '/link': '</a>' })"
            />
          </div>
        </div>
      </div>
      <div class="form-deposit-modal-image" :class="`-${dir}`">
        <img :src="info.icon" alt>
        <span class="form-deposit-modal-image-text" :class="`-${dir}`" v-text="`${$t('Мин. платёж')} ${info.min_amount}`" />
        <span class="form-deposit-modal-image-text" :class="`-${dir}`" v-text="`${$t('Комиссия')} ${info.commission}`" />
      </div>
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
import LfxIconCheckboxFill from '~/components/icons/lfx-icon-checkbox-fill'
import LfxIconCheckbox from '~/components/icons/lfx-icon-checkbox'
import LfxIconLock from '~/components/icons/lfx-icon-lock'
export default {
  name: 'FormFinanceDepositModal',
  components: { LfxIconLock, LfxIconCheckbox, LfxIconCheckboxFill, FieldText, FieldSelect, LfxIconInfo },
  mixins: [form],
  data () {
    return {
      isPromoCodeVisible: false
    }
  },
  computed: {
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    info () {
      return this.$store.getters['finance/getters/handler/getDepositInfo']
    },
    infoResponse () {
      return this.$store.getters['finance/getters/handler/getDepositInfoResponse']
    },
    depositInfoData () {
      return this.$store.getters['finance/getters/handler/getDepositInfoData']
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
    holderField () {
      return this.getField('holder')
    },
    expiredField () {
      return this.getField('expire')
    },
    cvvField () {
      return this.getField('cvv')
    },
    rememberField () {
      return this.getField('remember')
    },
    cardField () {
      return this.getField('card')
    },
    rollBackAddressField () {
      return this.getField('rollback_address')
    },
    bankField () {
      return this.getField('bank')
    },
    paymentMethodField () {
      return this.getField('payment_method')
    },
    taxIdMethodField () {
      return this.getField('tax_id')
    },
    identityField () {
      return this.getField('identity')
    },
    phoneNumberField () {
      return this.getField('phone_number')
    },
    depoAmount () {
      return this.getField('depo_amount')
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
  #form_depositRequestModal {
    max-width: 720px;
  }

  .form-deposit-modal-image {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 30%;

    &.-ltr {
      margin-left: 20px;
    }

    &.-rtl {
      margin-right: 20px;
    }

    img {
      width: 100px;
      height: 100px;
      margin-bottom: 15px;
    }

    &-text {
      width: 100%;
      font-size: 13px;
      color: #3B4B68;

      &.-rtl {
        text-align: right;
      }
    }
  }
</style>
