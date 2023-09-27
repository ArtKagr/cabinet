<template>
  <div class="popup-finance-repeat">
    <div class="popup-finance-repeat-head">
      <span v-if="activeTransaction.description" class="popup-finance-repeat-head-title" v-html="activeTransaction.description" />
      <span v-else-if="activeTransaction.name" class="popup-finance-repeat-head-title" v-html="$t('Пополнение через {method}', { method: activeTransaction.name })" />
    </div>
    <div class="popup-finance-repeat-body">
      <b-form-group
        v-if="accountField"
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
      <div class="d-flex mt-3 w-100">
        <div class="d-flex flex-column w-70">
          <b-form-group
            v-if="amountField"
            :label="amountField.label"
            :label-for="amountField.attribute"
            :description="amountField.error"
            :dir="dir"
            :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`]"
          >
            <field-text
              v-model="amountField.value"
              :form-title="formTitle"
              :error="!!amountField.error"
              @change="setValue($event, amountField.attribute)"
            />
          </b-form-group>
          <span class="form-finance-deposit-card-fields-field-hint" :class="`-${dir}`" v-text="`${$t('Мин. платёж')} ${info.min_amount}`" />
        </div>
        <div class="form-finance-deposit-card-fields-field -currency" :class="[`-${dir}`, isRtlMode ? 'mr-2' : 'ml-2']">
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
      <div v-if="promoCodeField" class="d-flex align-items-center justify-content-between mt-3">
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
      <div class="mt-4 w-100">
        <b-button class="text-white-16 w-100" variant="primary" @click="onSubmit" v-text="$t('Продолжить')" />
      </div>
    </div>
  </div>
</template>

<script>
import form from '~/mixins/form'
import FieldSelect from '~/components/modal/fields/field-select'
import FieldText from '~/components/modal/fields/field-text'
import LfxIconCheckboxFill from '~/components/icons/lfx-icon-checkbox-fill'
import LfxIconCheckbox from '~/components/icons/lfx-icon-checkbox'
export default {
  name: 'PopupFinanceRepeat',
  components: { LfxIconCheckbox, LfxIconCheckboxFill, FieldText, FieldSelect },
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
    activeTransaction () {
      return this.$store.getters['finance/getters/handler/getActiveTransaction']
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
    }
  },
  async created () {
    await this.saveMethod(this.activeTransaction)
    setTimeout(() => {
      this.setValue(this.activeTransaction.amount, 'amount')
    }, 1000)
  },
  methods: {
    saveMethod (card) {
      this.$store.commit('finance/mutations/handler/SAVE_ACTIVE_METHOD', {
        rootData: this.$store.state.finance.state.handler,
        data: card.method
      })
    },
    togglePromoCodeVisible () {
      this.isPromoCodeVisible = !this.isPromoCodeVisible
    }
  }
}
</script>
<style lang="scss">
  .popup-finance-repeat {

    &-head {
      display: flex;
      align-items: center;
      padding: 20px;
      line-height: 1;
      border-bottom: 1px solid #d9dce1;

      &-title {
        font-size: 20px;
        color: #3B4B68;

        &.-rtl {
          text-align: right;
        }
      }
    }

    &-body {
      padding: 20px;
    }
  }
</style>
