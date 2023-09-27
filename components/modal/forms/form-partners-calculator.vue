<template>
  <b-form :id="`form_${id || formTitle}`" :class="direction" @submit="onSubmit">
    <b-form-group
      v-if="typeField && typeFieldValues.length"
      :label="typeField.label"
      :label-for="typeField.attribute"
      :description="typeField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select
        :id="id"
        v-model="typeField.value"
        :values="typeFieldValues"
        :error="!!typeField.error"
        @change="setValue($event, typeField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="symbolField && symbolFieldValues.length"
      :label="symbolField.label"
      :label-for="symbolField.attribute"
      :description="symbolField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select
        :id="id"
        v-model="symbolField.value"
        :values="symbolFieldValues"
        :error="!!symbolField.error"
        @change="setValue($event, symbolField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="volumeField"
      :label="volumeField.label"
      :label-for="volumeField.attribute"
      :description="volumeField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-text
        :id="volumeField.attribute"
        v-model="volumeField.value"
        :type="volumeField.type"
        :error="!!volumeField.error"
        @change="setValue($event, volumeField.attribute)"
      />
    </b-form-group>
    <div v-if="isButtonShown" :class="buttonClasses">
      <b-button ref="form-button" type="submit" class="w-100" variant="primary" v-text="$t(buttonText)" />
    </div>
  </b-form>
</template>

<script>
import FieldSelect from '@/components/modal/fields/field-select'
import FieldText from '@/components/modal/fields/field-text'
import form from '~/mixins/form'
export default {
  name: 'FormPartnersCalculator',
  components: {
    FieldText,
    FieldSelect
  },
  mixins: [form],
  computed: {
    typeField () {
      return this.getField('type')
    },
    typeFieldValues () {
      if (this.typeField && this.typeField.in && this.typeField.in.range) {
        return this.typeField.in.range.map(value => ({ text: value, value }))
      }

      return []
    },
    symbolField () {
      return this.getField('symbol')
    },
    symbolFieldValues () {
      if (this.symbolField && this.symbolField.in && this.symbolField.in.range) {
        return this.symbolField.in.range.map(value => ({ text: value, value }))
      }

      return []
    },
    volumeField () {
      return this.getField('volume')
    }
  }
}
</script>
