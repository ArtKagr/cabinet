<template>
  <b-form :id="`form_${id || formTitle}`" :class="direction" @submit="onSubmit">
    <b-form-group
      v-if="educationLevelField"
      :label="educationLevelField.label"
      :label-for="educationLevelField.attribute"
      :description="educationLevelField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="educationLevelField.value"
        :values="educationLevelField.values"
        :error="!!educationLevelField.error"
        @change="setValue($event, educationLevelField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="educationFinanceField"
      :label="educationFinanceField.label"
      :label-for="educationFinanceField.attribute"
      :description="educationFinanceField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="educationFinanceField.value"
        :values="educationFinanceField.values"
        :error="!!educationFinanceField.error"
        @change="setValue($event, educationFinanceField.attribute)"
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
  name: 'QuestionnaireStepEight',
  components: {
    FieldSelectRadio
  },
  mixins: [form],
  computed: {
    educationLevelField () {
      return this.getField('question_education_level')
    },
    educationFinanceField () {
      return this.getField('question_education_finance')
    }
  }
}
</script>
