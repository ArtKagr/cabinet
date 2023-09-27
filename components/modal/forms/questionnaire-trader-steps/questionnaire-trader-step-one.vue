<template>
  <b-form :id="`form_${id || formTitle}`" :class="direction" @submit="onSubmit">
    <b-form-group
      v-if="instrumentsCountField"
      :label="instrumentsCountField.label"
      :label-for="instrumentsCountField.attribute"
      :description="instrumentsCountField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="instrumentsCountField.value"
        :values="instrumentsCountField.values"
        :error="!!instrumentsCountField.error"
        @change="setValue($event, instrumentsCountField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="tradesAvgField"
      :label="tradesAvgField.label"
      :label-for="tradesAvgField.attribute"
      :description="tradesAvgField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="tradesAvgField.value"
        :values="tradesAvgField.values"
        :error="!!tradesAvgField.error"
        @change="setValue($event, tradesAvgField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="tradesCountField"
      :label="tradesCountField.label"
      :label-for="tradesCountField.attribute"
      :description="tradesCountField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="tradesCountField.value"
        :values="tradesCountField.values"
        :error="!!tradesCountField.error"
        @change="setValue($event, tradesCountField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="tradesTimeField"
      :label="tradesTimeField.label"
      :label-for="tradesTimeField.attribute"
      :description="tradesTimeField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="tradesTimeField.value"
        :values="tradesTimeField.values"
        :error="!!tradesTimeField.error"
        @change="setValue($event, tradesTimeField.attribute)"
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
  name: 'QuestionnaireTraderStepOne',
  components: { FieldSelectRadio },
  mixins: [form],
  computed: {
    instrumentsCountField () {
      return this.getField('instruments_count')
    },
    tradesAvgField () {
      return this.getField('trades_avg_volume')
    },
    tradesCountField () {
      return this.getField('trades_count')
    },
    tradesTimeField () {
      return this.getField('trades_time')
    }
  }
}
</script>
