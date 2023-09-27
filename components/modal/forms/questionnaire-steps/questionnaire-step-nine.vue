<template>
  <b-form :id="`form_${id || formTitle}`" :class="direction" @submit="onSubmit">
    <b-form-group
      v-if="syncTestOneField"
      :label="syncTestOneField.label"
      :label-for="syncTestOneField.attribute"
      :description="syncTestOneField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="syncTestOneField.value"
        :values="syncTestOneField.values"
        :error="!!syncTestOneField.error"
        @change="setValue($event, syncTestOneField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="syncTestTwoField"
      :label="syncTestTwoField.label"
      :label-for="syncTestTwoField.attribute"
      :description="syncTestTwoField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="syncTestTwoField.value"
        :values="syncTestTwoField.values"
        :error="!!syncTestTwoField.error"
        @change="setValue($event, syncTestTwoField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="syncTestThreeField"
      :label="syncTestThreeField.label"
      :label-for="syncTestThreeField.attribute"
      :description="syncTestThreeField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="syncTestThreeField.value"
        :values="syncTestThreeField.values"
        :error="!!syncTestThreeField.error"
        @change="setValue($event, syncTestThreeField.attribute)"
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
  name: 'QuestionnaireStepNine',
  components: {
    FieldSelectRadio
  },
  mixins: [form],
  computed: {
    syncTestOneField () {
      return this.getField('sync_test1')
    },
    syncTestTwoField () {
      return this.getField('sync_test2')
    },
    syncTestThreeField () {
      return this.getField('sync_test3')
    }
  }
}
</script>
