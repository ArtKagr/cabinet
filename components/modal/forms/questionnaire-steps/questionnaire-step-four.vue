<template>
  <b-form :id="`form_${id || formTitle}`" :class="direction" @submit="onSubmit">
    <b-form-group
      v-if="expInstrField"
      :label="expInstrField.label"
      :label-for="expInstrField.attribute"
      :description="expInstrField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-checkbox
        v-model="expInstrField.value"
        :values="expInstrField.values"
        :error="!!expInstrField.error"
        @change="setValue($event, expInstrField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="
        expYearsField &&
          expInstrField &&
          expInstrField.value &&
          expInstrField.value.length &&
          (expInstrField.value.includes(1) || expInstrField.value.includes('1'))
      "
      :label="expYearsField.label"
      :label-for="expYearsField.attribute"
      :description="expYearsField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="expYearsField.value"
        :values="expYearsField.values"
        :error="!!expYearsField.error"
        @change="setValue($event, expYearsField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="expTransactions && (
        expInstrField.value.includes(1) ||
        expInstrField.value.includes(2) ||
        expInstrField.value.includes(3) ||
        expInstrField.value.includes('1') ||
        expInstrField.value.includes('2') ||
        expInstrField.value.includes('3')
      )"
      :label="expTransactions.label"
      :label-for="expTransactions.attribute"
      :description="expTransactions.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="expTransactions.value"
        :values="expTransactions.values"
        :error="!!expTransactions.error"
        @change="setValue($event, expTransactions.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="
        expLeverage &&
          expInstrField &&
          expInstrField.value &&
          expInstrField.value.length &&
          (expInstrField.value.includes(1) || expInstrField.value.includes('1'))
      "
      :label="expLeverage.label"
      :label-for="expLeverage.attribute"
      :description="expLeverage.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-text
        :id="expLeverage.attribute"
        v-model="expLeverage.value"
        :type="expLeverage.type"
        :error="!!expLeverage.error"
        @change="setValue($event, expLeverage.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="expLeveragedVolume && expInstrField.value && expInstrField.value.length && (expInstrField.value.includes(1) || expInstrField.value.includes('1'))"
      :label="expLeveragedVolume.label"
      :label-for="expLeveragedVolume.attribute"
      :description="expLeveragedVolume.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-text
        :id="expLeveragedVolume.attribute"
        v-model="expLeveragedVolume.value"
        :type="expLeveragedVolume.type"
        :error="!!expLeveragedVolume.error"
        @change="setValue($event, expLeveragedVolume.attribute)"
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
import FieldSelectCheckbox from '~/components/modal/fields/field-select-checkbox'
export default {
  name: 'QuestionnaireStepFour',
  components: {
    FieldSelectCheckbox,
    FieldText,
    FieldSelectRadio
  },
  mixins: [form],
  computed: {
    expInstrField () {
      return this.getField('experience_instruments')
    },
    expYearsField () {
      return this.getField('experience_years')
    },
    expTransactions () {
      return this.getField('experience_transactions')
    },
    expLeverage () {
      return this.getField('experience_leverage')
    },
    expLeveragedVolume () {
      return this.getField('experience_leveraged_volume')
    }
  }
}
</script>
