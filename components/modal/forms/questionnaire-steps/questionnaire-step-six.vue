<template>
  <b-form :id="`form_${id || formTitle}`" :class="direction" @submit="onSubmit">
    <b-form-group
      v-if="knowledgeOverTheCounterField"
      :label="knowledgeOverTheCounterField.label"
      :label-for="knowledgeOverTheCounterField.attribute"
      :description="knowledgeOverTheCounterField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="knowledgeOverTheCounterField.value"
        :values="knowledgeOverTheCounterField.values"
        :error="!!knowledgeOverTheCounterField.error"
        @change="setValue($event, knowledgeOverTheCounterField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="knowledgeLeverageField"
      :label="knowledgeLeverageField.label"
      :label-for="knowledgeLeverageField.attribute"
      :description="knowledgeLeverageField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="knowledgeLeverageField.value"
        :values="knowledgeLeverageField.values"
        :error="!!knowledgeLeverageField.error"
        @change="setValue($event, knowledgeLeverageField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="knowledgeStopOutField"
      :label="knowledgeStopOutField.label"
      :label-for="knowledgeStopOutField.attribute"
      :description="knowledgeStopOutField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="knowledgeStopOutField.value"
        :values="knowledgeStopOutField.values"
        :error="!!knowledgeStopOutField.error"
        @change="setValue($event, knowledgeStopOutField.attribute)"
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
  name: 'QuestionnaireStepSix',
  components: {
    FieldSelectRadio
  },
  mixins: [form],
  computed: {
    knowledgeOverTheCounterField () {
      return this.getField('knowledge_over_the_counter')
    },
    knowledgeLeverageField () {
      return this.getField('knowledge_leverage')
    },
    knowledgeStopOutField () {
      return this.getField('knowledge_stop_out')
    }
  }
}
</script>
