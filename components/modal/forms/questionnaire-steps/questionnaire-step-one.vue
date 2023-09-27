<template>
  <b-form :id="`form_${id || formTitle}`" :class="direction" @submit="onSubmit">
    <b-form-group
      v-if="nationalityField"
      :label="nationalityField.label"
      :label-for="nationalityField.attribute"
      :description="nationalityField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select
        :id="id"
        v-model="nationalityField.value"
        :values="nationalityField.values"
        :is-countries="true"
        :error="!!nationalityField.error"
        @change="setValue($event, nationalityField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="birthPlaceField"
      :label="birthPlaceField.label"
      :label-for="birthPlaceField.attribute"
      :description="birthPlaceField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-text
        :id="birthPlaceField.attribute"
        v-model="birthPlaceField.value"
        :type="birthPlaceField.type"
        :error="!!birthPlaceField.error"
        @change="setValue($event, birthPlaceField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="reportableField"
      :label="reportableField.label"
      :label-for="reportableField.attribute"
      :description="reportableField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-checkbox-radio
        v-model="reportableField.value"
        @change="setValue($event, reportableField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="taxNumberField"
      :label="taxNumberField.label"
      :label-for="taxNumberField.attribute"
      :description="taxNumberField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-text
        :id="taxNumberField.attribute"
        v-model="taxNumberField.value"
        :type="taxNumberField.type"
        :error="!!taxNumberField.error"
        @change="setValue($event, taxNumberField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="taxCountryField"
      :label="taxCountryField.label"
      :label-for="taxCountryField.attribute"
      :description="taxCountryField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select
        :id="id"
        v-model="taxCountryField.value"
        :values="taxCountryField.values"
        :is-countries="true"
        :error="!!taxCountryField.error"
        @change="setValue($event, taxCountryField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="governmentField"
      :label="governmentField.label"
      :label-for="governmentField.attribute"
      :description="governmentField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-checkbox-radio
        v-model="governmentField.value"
        @change="setValue($event, governmentField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="governmentSpecifyField && governmentField.value === 1"
      :label="governmentSpecifyField.label"
      :label-for="governmentSpecifyField.attribute"
      :description="governmentSpecifyField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-text
        :id="governmentSpecifyField.attribute"
        v-model="governmentSpecifyField.value"
        :type="governmentSpecifyField.type"
        :error="!!governmentSpecifyField.error"
        @change="setValue($event, governmentSpecifyField.attribute)"
      />
    </b-form-group>
    <div v-if="isButtonShown" :class="buttonClasses">
      <b-button ref="form-button" type="submit" class="w-100" variant="primary" v-text="$t(buttonText)" />
    </div>
  </b-form>
</template>

<script>
import form from '~/mixins/form'
import FieldSelect from '~/components/modal/fields/field-select'
import FieldText from '~/components/modal/fields/field-text'
import FieldCheckboxRadio from '~/components/modal/fields/field-checkbox-radio'
export default {
  name: 'QuestionnaireStepOne',
  components: { FieldCheckboxRadio, FieldText, FieldSelect },
  mixins: [form],
  computed: {
    nationalityField () {
      return this.getField('question_nationality')
    },
    birthPlaceField () {
      return this.getField('question_birth_place')
    },
    reportableField () {
      return this.getField('question_reportable')
    },
    taxNumberField () {
      return this.getField('question_tax_number')
    },
    taxCountryField () {
      return this.getField('question_tax_country')
    },
    governmentField () {
      return this.getField('question_government')
    },
    governmentSpecifyField () {
      return this.getField('question_government_specify')
    }
  }
}
</script>
