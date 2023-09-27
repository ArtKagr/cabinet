<template>
  <b-form :id="`form_${id || formTitle}`" :class="direction" @submit="onSubmit">
    <b-form-group
      v-if="knowledgePreventLossField"
      :label="knowledgePreventLossField.label"
      :label-for="knowledgePreventLossField.attribute"
      :description="knowledgePreventLossField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="knowledgePreventLossField.value"
        :values="knowledgePreventLossField.values"
        :error="!!knowledgePreventLossField.error"
        @change="setValue($event, knowledgePreventLossField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="knowledgeStopLossField"
      :label="knowledgeStopLossField.label"
      :label-for="knowledgeStopLossField.attribute"
      :description="knowledgeStopLossField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="knowledgeStopLossField.value"
        :values="knowledgeStopLossField.values"
        :error="!!knowledgeStopLossField.error"
        @change="setValue($event, knowledgeStopLossField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="knowledgeGoldField"
      :label="knowledgeGoldField.label"
      :label-for="knowledgeGoldField.attribute"
      :description="knowledgeGoldField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="knowledgeGoldField.value"
        :values="knowledgeGoldField.values"
        :error="!!knowledgeGoldField.error"
        @change="setValue($event, knowledgeGoldField.attribute)"
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
  name: 'QuestionnaireStepSeven',
  components: {
    FieldSelectRadio
  },
  mixins: [form],
  computed: {
    knowledgePreventLossField () {
      return this.getField('knowledge_prevent_loss')
    },
    knowledgeStopLossField () {
      return this.getField('knowledge_stop_loss')
    },
    knowledgeGoldField () {
      return this.getField('knowledge_gold')
    }
  }
}
</script>
