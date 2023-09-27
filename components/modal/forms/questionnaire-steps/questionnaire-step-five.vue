<template>
  <b-form :id="`form_${id || formTitle}`" :class="direction" @submit="onSubmit">
    <b-form-group
      v-if="knowledgeDerivativeField"
      :label="knowledgeDerivativeField.label"
      :label-for="knowledgeDerivativeField.attribute"
      :description="knowledgeDerivativeField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="knowledgeDerivativeField.value"
        :values="knowledgeDerivativeField.values"
        :error="!!knowledgeDerivativeField.error"
        @change="setValue($event, knowledgeDerivativeField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="knowledgeInterestRateField"
      :label="knowledgeInterestRateField.label"
      :label-for="knowledgeInterestRateField.attribute"
      :description="knowledgeInterestRateField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="knowledgeInterestRateField.value"
        :values="knowledgeInterestRateField.values"
        :error="!!knowledgeInterestRateField.error"
        @change="setValue($event, knowledgeInterestRateField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="knowledgeCreditRiskField"
      :label="knowledgeCreditRiskField.label"
      :label-for="knowledgeCreditRiskField.attribute"
      :description="knowledgeCreditRiskField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="knowledgeCreditRiskField.value"
        :values="knowledgeCreditRiskField.values"
        :error="!!knowledgeCreditRiskField.error"
        @change="setValue($event, knowledgeCreditRiskField.attribute)"
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
export default {
  name: 'QuestionnaireStepFive',
  components: {
    FieldSelectRadio
  },
  mixins: [form],
  computed: {
    knowledgeDerivativeField () {
      return this.getField('knowledge_derivative')
    },
    knowledgeInterestRateField () {
      return this.getField('knowledge_interest_rate')
    },
    knowledgeCreditRiskField () {
      return this.getField('knowledge_credit_risk')
    }
  }
}
</script>
