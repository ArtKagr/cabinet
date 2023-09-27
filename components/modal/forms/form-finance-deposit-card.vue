<template>
  <div class="form-finance-deposit-card_container">
    <div class="d-flex">
      <div class="form-finance-deposit-card">
        <div v-if="info.messages && info.messages.length" class="form-finance-deposit-card-messages">
          <div v-for="(message, key) in info.messages" :key="key" class="form-withdrawal-request-messages-message">
            <div class="form-withdrawal-request-messages-message-icon" :class="`-${dir}`">
              <lfx-icon-info />
            </div>
            <div class="form-withdrawal-request-messages-message-text" :class="`-${dir}`" v-html="message" />
          </div>
        </div>
        <div class="form-finance-deposit-card-fields">
          <div v-if="accountField" class="form-finance-deposit-card-fields-field -account">
            <b-form-group
              :label="accountField.label"
              :label-for="accountField.attribute"
              :description="accountField.error"
              :dir="dir"
              :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`]"
            >
              <field-select
                v-model="accountField.value"
                :values="accountField.values"
                :error="!!accountField.error"
                @change="setValue($event, accountField.attribute)"
              />
            </b-form-group>
          </div>
          <div v-if="cardField" class="form-finance-deposit-card-fields-field -card">
            <b-form-group
              :label="cardField.label"
              :label-for="cardField.attribute"
              :description="cardField.error"
              :dir="dir"
              :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`]"
            >
              <field-select
                v-model="cardField.value"
                :values="cardField.values"
                :error="!!cardField.error"
                @change="setValue($event, cardField.attribute)"
              />
            </b-form-group>
          </div>
          <div v-if="cardField && !cardField.value" class="form-finance-deposit-card-fields-field -number">
            <b-form-group
              v-if="numberField"
              :label="numberField.label"
              :label-for="numberField.attribute"
              :description="numberField.error"
              :dir="dir"
              :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`]"
            >
              <field-text
                v-model="numberField.value"
                :values="numberField.values"
                :form-title="formTitle"
                :error="!!numberField.error"
                @change="setValue($event, numberField.attribute)"
              />
            </b-form-group>
          </div>
          <div v-if="cardField && !cardField.value" class="form-finance-deposit-card-fields-field -holder">
            <b-form-group
              v-if="holderField"
              :label="holderField.label"
              :label-for="holderField.attribute"
              :description="holderField.error"
              :dir="dir"
              :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`]"
            >
              <field-text
                v-model="holderField.value"
                :values="holderField.values"
                :form-title="formTitle"
                :error="!!holderField.error"
                @change="setValue($event, holderField.attribute)"
              />
            </b-form-group>
          </div>
          <div class="d-flex">
            <div v-if="cardField && !cardField.value" class="form-finance-deposit-card-fields-field -expired" :class="`-${dir}`">
              <b-form-group
                v-if="expiredField"
                :label="expiredField.label"
                :label-for="expiredField.attribute"
                :description="expiredField.error"
                :dir="dir"
                :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`]"
              >
                <field-text
                  v-model="expiredField.value"
                  :values="expiredField.values"
                  :form-title="formTitle"
                  :error="!!expiredField.error"
                  placeholder="MM/YY"
                  mask="##/##"
                  @change="setValue($event, expiredField.attribute)"
                />
              </b-form-group>
            </div>
            <div v-if="cvvField" class="form-finance-deposit-card-fields-field -cvv">
              <b-form-group
                :label="cvvField.label"
                :label-for="cvvField.attribute"
                :description="cvvField.error"
                :dir="dir"
                :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`]"
              >
                <field-text
                  v-model="cvvField.value"
                  :values="cvvField.values"
                  :form-title="formTitle"
                  :error="!!cvvField.error"
                  type="password"
                  mask="###"
                  @change="setValue($event, cvvField.attribute)"
                />
              </b-form-group>
            </div>
          </div>
          <div v-if="rememberField" class="form-finance-deposit-card-fields-field -remember" :class="`-${dir}`">
            <b-form-group
              :description="rememberField.error"
              :dir="dir"
              :class="['lfx-forms-input-title mb-0', `-${dir}`]"
            >
              <field-checkbox
                v-model="rememberField.value"
                :values="rememberField.values"
                :form-title="formTitle"
                :error="!!rememberField.error"
                type="password"
                mask="###"
                @change="setValue($event, rememberField.attribute)"
              />
            </b-form-group>
            <span v-text="$t('Запомнить карту')" />
          </div>
          <div class="d-flex w-100" :style="{ padding: '20px 0' }">
            <div v-if="amountField && currencyField && currencyField.value" class="form-finance-deposit-card-fields-field -amount" :class="`-${dir}`">
              <b-form-group
                :description="amountField.error"
                :label="amountField.label"
                :label-for="amountField.attribute"
                :dir="dir"
                :class="['lfx-forms-input-title mb-0', `-${dir}`]"
              >
                <field-text
                  v-model="amountField.value"
                  :values="amountField.values"
                  :form-title="formTitle"
                  :error="!!amountField.error"
                  :placeholder="currencyField && currencyField.value"
                  type="number"
                  @change="setValue($event, amountField.attribute)"
                />
              </b-form-group>
              <span class="form-finance-deposit-card-fields-field-hint" v-text="`${$t('Мин. платёж')} ${info.min_amount}`" />
            </div>
            <div class="form-finance-deposit-card-fields-field -currency" :class="`-${dir}`">
              <b-form-group
                v-if="currencyField"
                :description="currencyField.error"
                :label="currencyField.label"
                :label-for="currencyField.attribute"
                :dir="dir"
                :class="['lfx-forms-input-title mb-0', `-${dir}`]"
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
          <div v-if="promoCodeField" class="d-flex align-items-center justify-content-between">
            <div class="form-finance-deposit-card-fields-use_promocode" @click="togglePromoCodeVisible">
              <div class="form-finance-deposit-card-fields-use_promocode-checkbox" :class="`-${dir}`">
                <lfx-icon-checkbox-fill v-if="isPromoCodeVisible" />
                <lfx-icon-checkbox v-else />
              </div>
              <span class="form-finance-deposit-card-fields-use_promocode-text" :class="`-${dir}`" v-text="$t('Использовать промокод')" />
            </div>
            <div class="form-finance-deposit-card-fields-field -promocode">
              <b-form-group
                v-if="isPromoCodeVisible"
                :description="promoCodeField.error"
                :dir="dir"
                :class="['lfx-forms-input-title mb-0', `-${dir}`]"
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
          </div>
        </div>
        <div
          v-if="amountField && amountField.value && depositInfoData && depositInfoData.amount"
          class="finance-depo-hint"
          :style="{ padding: '0 20px', marginTop: '20px' }"
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
      </div>
<!--      <div v-if="windowWidthNumber > 1100" class="form-finance-deposit-images" :class="`-${dir}`">-->
<!--        <lfx-icon-finance-card-front class="form-finance-deposit-images-front" />-->
<!--        <lfx-icon-finance-card-back class="form-finance-deposit-images-back" />-->
<!--      </div>-->
    </div>
    <div class="form-finance-deposit-card-buttons" :style="{ padding: '20px 0', borderTop: '1px solid #d9dce1', margin: '20px 20px 0' }">
      <b-button class="form-finance-deposit-card-buttons-button" variant="primary" @click="onSubmit" v-text="$t('Продолжить')" />
      <div class="form-withdrawal-request-secure">
        <div class="form-withdrawal-request-secure-icon" :class="`-${dir}`">
          <lfx-icon-lock />
        </div>
        <span class="form-withdrawal-request-secure-text" v-text="'HTTP and SSL secure'" />
      </div>
    </div>
  </div>
</template>

<script>
import form from '~/mixins/form'
import LfxIconInfo from '~/components/icons/lfx-icon-info'
import FieldSelect from '~/components/modal/fields/field-select'
import FieldText from '~/components/modal/fields/field-text'
import FieldCheckbox from '~/components/modal/fields/field-checkbox'
import LfxIconCheckboxFill from '~/components/icons/lfx-icon-checkbox-fill'
import LfxIconCheckbox from '~/components/icons/lfx-icon-checkbox'
import LfxIconLock from '~/components/icons/lfx-icon-lock'
// import LfxIconFinanceCardFront from '~/components/icons/lfx-icon-finance-card-front'
// import LfxIconFinanceCardBack from '~/components/icons/lfx-icon-finance-card-back'
export default {
  name: 'FormFinanceDepositCard',
  components: {
    // LfxIconFinanceCardBack,
    // LfxIconFinanceCardFront,
    LfxIconLock,
    LfxIconCheckbox,
    LfxIconCheckboxFill,
    FieldCheckbox,
    FieldText,
    FieldSelect,
    LfxIconInfo
  },
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
    bankField () {
      return this.getField('bank')
    },
    identityField () {
      return this.getField('identity')
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
  .form-finance-deposit-card_container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .form-finance-deposit-card {
    display: flex;
    flex-direction: column;
    width: 100%;

    &-messages {
      padding: 0 20px;
    }

    &-fields {
      padding: 0 20px;

      &-field {

        &.-account {
          border-bottom: 1px solid #d9dce1;
          padding-bottom: 20px;
        }

        &.-card,
        &.-holder {
          padding: 20px 0;
        }

        &.-expired.-ltr {
          margin-right: 10px;
        }

        &.-expired.-rtl {
          margin-left: 10px;
        }

        &.-remember {
          display: flex;
          align-items: center;
          padding: 20px 0 20px;
          border-bottom: 1px solid #d9dce1;

          .checkbox {
            width: 20px !important;
            height: 20px !important;

            svg {
              width: 20px !important;
              height: 20px !important;
            }
          }

          span {
            font-size: 12px;
            color: #6d788a;
          }
        }

        &.-remember.-ltr {
          margin-right: 10px;
        }

        &.-remember.-rtl {
          margin-left: 10px;
        }

        &.-amount {
          width: 70%;
        }

        &.-amount.-ltr {
          margin-right: 10px;
        }

        &.-amount.-rtl {
          margin-left: 10px;
        }

        &.-currency {
          width: 30%;

          div {
            div {
              height: 41px;
            }
          }
        }

        &.-promocode {
          width: 50%;
        }

        &-hint {
          font-size: 10px;
          color: #6d788a;

          &.-rtl {
            text-align: right;
          }
        }
      }

      &-use_promocode {
        display: flex;
        align-items: center;
        cursor: pointer;

        &-checkbox {

          &.-ltr {
            margin-right: 10px;
          }

          &.-rtl {
            margin-left: 10px;
          }

          svg {
            width: 20px;
            height: 20px;
          }
        }

        &-text {
          font-size: 12px;
          color: #6d788a;
        }
      }
    }

    &-buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30px 0 25px;
    }
  }

  .form-finance-deposit-images {

    &.-rtl {
      padding-left: 20px;
    }

    &-front {
     margin-bottom: 20px;
    }

    &-back {

    }
  }
</style>
