<template>
  <b-form :id="`form_${id || formTitle}`" class="modal-form" :class="direction" @submit="onSubmit">
    <b-form-group
      v-if="accountField"
      :label="accountField.label"
      :label-for="accountField.attribute"
      :description="accountField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select
        :id="id"
        v-model="accountField.value"
        :values="accountField.values"
        :error="!!accountField.error"
        @change="setValue($event, accountField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="agreementField"
      :description="agreementField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-checkbox
        :id="agreementField.attribute"
        v-model="agreementField.value"
        :error="!!agreementField.error"
        :label="agreementField.label"
        :size="20"
        hint-size="small"
        @change="setValue($event, agreementField.attribute)"
      />
    </b-form-group>
    <div v-if="isButtonShown" :class="buttonClasses">
      <b-button ref="form-button" type="submit" class="w-100" variant="primary" v-text="$t(buttonText, { amount: 5, currency: account.currency })" />
    </div>
  </b-form>
</template>

<script>
import form from '~/mixins/form'
import FieldSelect from '@/components/modal/fields/field-select'
import FieldCheckbox from '~/components/modal/fields/field-checkbox'
export default {
  name: 'FormTwitterWatcher',
  components: {
    FieldCheckbox,
    FieldSelect
  },
  mixins: [form],
  computed: {
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    accountField () {
      return this.getField('account')
    },
    agreementField () {
      return this.getField('agreement')
    }
  }
}
</script>
