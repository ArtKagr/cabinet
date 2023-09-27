<template>
  <b-form :id="`form_${id || formTitle}`" class="modal-form" :class="direction" @submit="onSubmit">
    <div class="d-flex flex-column w-100">
      <div class="d-flex w-100 mb-4" :class="[isError ? '' : 'align-items-end', windowWidth === 'sm' ? 'flex-column' : 'justify-content-between']">
        <div class="d-flex" :class="windowWidth === 'sm' ? 'flex-column w-100' : 'w-75'">
          <b-form-group
            v-if="accountField"
            :label="accountField.label"
            :label-for="accountField.attribute"
            :description="accountField.error"
            :dir="dir"
            :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`, windowWidth === 'sm' ? 'pb-3' : isRtlMode ? 'pl-2' : 'pr-2']"
          >
            <field-select
              v-model="accountField.value"
              :values="accountField.values"
              :error="!!accountField.error"
              :select-styles="{ height: '41px' }"
              @change="setValue($event, accountField.attribute)"
            />
          </b-form-group>
          <b-form-group
            v-if="amountField"
            :label="amountField.label"
            :label-for="amountField.attribute"
            :description="amountField.error"
            :dir="dir"
            :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`, windowWidth === 'sm' ? 'pb-3' : 'px-2']"
          >
            <field-text
              v-model="amountField.value"
              :values="amountField.values"
              :form-title="formTitle"
              :error="!!amountField.error"
              @change="setValue($event, amountField.attribute)"
            />
          </b-form-group>
          <b-form-group
            v-if="referralField"
            :label="referralField.label"
            :label-for="referralField.attribute"
            :description="referralField.error"
            :dir="dir"
            :class="['lfx-forms-input-title w-100 mb-0', `-${dir}`, windowWidth === 'sm' ? '' : 'px-2']"
          >
            <field-select
              v-model="referralField.value"
              :values="referralField.values"
              :error="!!referralField.error"
              :select-styles="{ height: '41px' }"
              @change="setValue($event, referralField.attribute)"
            />
          </b-form-group>
        </div>
        <div v-if="windowWidth !== 'sm'" class="w-25" :class="[buttonClasses, isRtlMode ? 'pr-2' : 'pl-2', isError ? 'd-flex align-items-center' : '']">
          <b-button ref="form-button" type="submit" class="w-100" variant="primary" v-text="$t(buttonText)" />
        </div>
      </div>
      <field-checkbox
        v-if="confirmationField"
        :id="confirmationField.attribute"
        v-model="confirmationField.value"
        :form-id="id"
        :error="!!confirmationField.error"
        :label="confirmationField.label"
        :size="20"
        :class="windowWidth === 'sm' ? 'pb-4' : ''"
        @change="setValue($event, confirmationField.attribute)"
      />
      <div v-if="windowWidth === 'sm'">
        <b-button ref="form-button" type="submit" class="w-100" variant="primary" v-text="$t(buttonText)" />
      </div>
    </div>
  </b-form>
</template>

<script>
import FieldSelect from '@/components/modal/fields/field-select'
import FieldText from '@/components/modal/fields/field-text'
import form from '~/mixins/form'
import FieldCheckbox from '~/components/modal/fields/field-checkbox'
export default {
  name: 'FormFinanceAffiliateTransfer',
  components: { FieldCheckbox, FieldText, FieldSelect },
  mixins: [form],
  computed: {
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    accountField () {
      return this.getField('account')
    },
    referralField () {
      return this.getField('referral')
    },
    amountField () {
      return this.getField('amount')
    },
    confirmationField () {
      return this.getField('confirmation')
    },
    isError () {
      if (this.accountField && this.referralField && this.amountField) {
        return this.accountField.error || this.referralField.error || this.amountField.error
      }

      return false
    }
  }
}
</script>
