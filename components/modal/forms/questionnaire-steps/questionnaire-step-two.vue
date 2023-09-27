<template>
  <b-form :id="`form_${id || formTitle}`" :class="direction" @submit="onSubmit">
    <b-form-group
      v-if="regReasonField"
      :label="regReasonField.label"
      :label-for="regReasonField.attribute"
      :description="regReasonField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="regReasonField.value"
        :values="regReasonField.values"
        :error="!!regReasonField.error"
        @change="setValue($event, regReasonField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="regReasonSpecifyField && regReasonField.value === 'Other'"
      :label="regReasonSpecifyField.label"
      :label-for="regReasonSpecifyField.attribute"
      :description="regReasonSpecifyField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-text
        :id="regReasonSpecifyField.attribute"
        v-model="regReasonSpecifyField.value"
        :type="regReasonSpecifyField.type"
        :error="!!regReasonSpecifyField.error"
        @change="setValue($event, regReasonSpecifyField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="natureTransactionsField"
      :label="natureTransactionsField.label"
      :label-for="natureTransactionsField.attribute"
      :description="natureTransactionsField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="natureTransactionsField.value"
        :values="natureTransactionsField.values"
        :error="!!natureTransactionsField.error"
        @change="setValue($event, natureTransactionsField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="investedField"
      :label="investedField.label"
      :label-for="investedField.attribute"
      :description="investedField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="investedField.value"
        :values="investedField.values"
        :error="!!investedField.error"
        @change="setValue($event, investedField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="investedSpecifyField && investedField.value === 'More than 50.000'"
      :label="investedSpecifyField.label"
      :label-for="investedSpecifyField.attribute"
      :description="investedSpecifyField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-text
        :id="investedSpecifyField.attribute"
        v-model="investedSpecifyField.value"
        :type="investedSpecifyField.type"
        :error="!!investedSpecifyField.error"
        @change="setValue($event, investedSpecifyField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="depositMethodField"
      :label="depositMethodField.label"
      :label-for="depositMethodField.attribute"
      :description="depositMethodField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="depositMethodField.value"
        :values="depositMethodField.values"
        :error="!!depositMethodField.error"
        @change="setValue($event, depositMethodField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="depositMethodSpecifyField && depositMethodField.value === 'Other'"
      :label="depositMethodSpecifyField.label"
      :label-for="depositMethodSpecifyField.attribute"
      :description="depositMethodSpecifyField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-text
        :id="depositMethodSpecifyField.attribute"
        v-model="depositMethodSpecifyField.value"
        :type="depositMethodSpecifyField.type"
        :error="!!depositMethodSpecifyField.error"
        @change="setValue($event, depositMethodSpecifyField.attribute)"
      />
    </b-form-group>
    <div v-if="isButtonShown" :class="buttonClasses">
      <b-button ref="form-button" type="submit" class="w-100" variant="primary" v-text="$t(buttonText)" />
    </div>
  </b-form>
</template>

<script>
import form from '~/mixins/form'
import FieldSelectRadio from '~/components/modal/fields/field-select-radio'
import FieldText from '~/components/modal/fields/field-text'
export default {
  name: 'QuestionnaireStepTwo',
  components: { FieldText, FieldSelectRadio },
  mixins: [form],
  computed: {
    regReasonField () {
      return this.getField('question_registration_reason')
    },
    regReasonSpecifyField () {
      return this.getField('question_registration_reason_specify')
    },
    natureTransactionsField () {
      return this.getField('question_nature_transactions')
    },
    investedField () {
      return this.getField('question_invested')
    },
    investedSpecifyField () {
      return this.getField('question_invested_specify')
    },
    depositMethodField () {
      return this.getField('question_deposit_method')
    },
    depositMethodSpecifyField () {
      return this.getField('question_deposit_method_specify')
    }
  }
}
</script>
