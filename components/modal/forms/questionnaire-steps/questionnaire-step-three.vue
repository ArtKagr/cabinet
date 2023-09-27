<template>
  <b-form :id="`form_${id || formTitle}`" :class="direction" @submit="onSubmit">
    <b-form-group
      v-if="incomeSourceField"
      :label="incomeSourceField.label"
      :label-for="incomeSourceField.attribute"
      :description="incomeSourceField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="incomeSourceField.value"
        :values="incomeSourceField.values"
        :error="!!incomeSourceField.error"
        @change="setValue($event, incomeSourceField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="employmentIndustryField && ['Salary', 'Entrepreneurship'].includes(incomeSourceField.value)"
      :label="employmentIndustryField.label"
      :label-for="employmentIndustryField.attribute"
      :description="employmentIndustryField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select
        :id="id"
        v-model="employmentIndustryField.value"
        :values="employmentIndustryField.values"
        :error="!!employmentIndustryField.error"
        @change="setValue($event, employmentIndustryField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="employmentProfessionField && incomeSourceField.value && incomeSourceField.value !== 'Entrepreneurship'"
      :label="employmentProfessionField.label"
      :label-for="employmentProfessionField.attribute"
      :description="employmentProfessionField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-text
        :id="employmentProfessionField.attribute"
        v-model="employmentProfessionField.value"
        :type="employmentProfessionField.type"
        :error="!!employmentProfessionField.error"
        @change="setValue($event, employmentProfessionField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="employmentNameEmployerField && incomeSourceField.value === 'Salary'"
      :label="employmentNameEmployerField.label"
      :label-for="employmentNameEmployerField.attribute"
      :description="employmentNameEmployerField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-text
        :id="employmentNameEmployerField.attribute"
        v-model="employmentNameEmployerField.value"
        :type="employmentNameEmployerField.type"
        :error="!!employmentNameEmployerField.error"
        @change="setValue($event, employmentNameEmployerField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="employmentOccupationField && incomeSourceField.value === 'Entrepreneurship'"
      :label="employmentOccupationField.label"
      :label-for="employmentOccupationField.attribute"
      :description="employmentOccupationField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-text
        :id="employmentOccupationField.attribute"
        v-model="employmentOccupationField.value"
        :type="employmentOccupationField.type"
        :error="!!employmentOccupationField.error"
        @change="setValue($event, employmentOccupationField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="employmentInvestmentTypeField && ['Income from investment', 'Dividends, rents, passive income'].includes(incomeSourceField.value)"
      :label="employmentInvestmentTypeField.label"
      :label-for="employmentInvestmentTypeField.attribute"
      :description="employmentInvestmentTypeField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-text
        :id="employmentInvestmentTypeField.attribute"
        v-model="employmentInvestmentTypeField.value"
        :type="employmentInvestmentTypeField.type"
        :error="!!employmentInvestmentTypeField.error"
        @change="setValue($event, employmentInvestmentTypeField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="incomeField"
      :label="incomeField.label"
      :label-for="incomeField.attribute"
      :description="incomeField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="incomeField.value"
        :values="incomeField.values"
        :error="!!incomeField.error"
        @change="setValue($event, incomeField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="incomeSpecifyField && incomeField.value === 'Over 50.000'"
      :label="incomeSpecifyField.label"
      :label-for="incomeSpecifyField.attribute"
      :description="incomeSpecifyField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-text
        :id="incomeSpecifyField.attribute"
        v-model="incomeSpecifyField.value"
        :type="incomeSpecifyField.type"
        :error="!!incomeSpecifyField.error"
        @change="setValue($event, incomeSpecifyField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="financialCommitmentsField"
      :label="financialCommitmentsField.label"
      :label-for="financialCommitmentsField.attribute"
      :description="financialCommitmentsField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-text
        :id="financialCommitmentsField.attribute"
        v-model="financialCommitmentsField.value"
        :type="financialCommitmentsField.type"
        :error="!!financialCommitmentsField.error"
        @change="setValue($event, financialCommitmentsField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="wealthField"
      :label="wealthField.label"
      :label-for="wealthField.attribute"
      :description="wealthField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="wealthField.value"
        :values="wealthField.values"
        :error="!!wealthField.error"
        @change="setValue($event, wealthField.attribute)"
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
import FieldSelect from '~/components/modal/fields/field-select'
export default {
  name: 'QuestionnaireStepThree',
  components: { FieldSelect, FieldText, FieldSelectRadio },
  mixins: [form],
  computed: {
    incomeSourceField () {
      return this.getField('question_income_source')
    },
    employmentIndustryField () {
      return this.getField('question_employment_industry')
    },
    employmentProfessionField () {
      return this.getField('question_employment_profession')
    },
    employmentOccupationField () {
      return this.getField('question_employment_occupation')
    },
    employmentNameEmployerField () {
      return this.getField('question_employment_name_employer')
    },
    employmentInvestmentTypeField () {
      return this.getField('question_employment_investment_type')
    },
    incomeField () {
      return this.getField('question_income')
    },
    incomeSpecifyField () {
      return this.getField('question_income_specify')
    },
    financialCommitmentsField () {
      return this.getField('question_financial_commitments')
    },
    wealthField () {
      return this.getField('question_wealth')
    }
  }
}
</script>
