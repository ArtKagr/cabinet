<template>
  <b-form :id="`form_${id || formTitle}`" :class="direction">
    <b-form-group
      v-if="tradingNewsField"
      :label="tradingNewsField.label"
      :label-for="tradingNewsField.attribute"
      :description="tradingNewsField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="tradingNewsField.value"
        :values="tradingNewsField.values"
        :error="!!tradingNewsField.error"
        @change="setValue($event, tradingNewsField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="tradesTypesField"
      :label="tradesTypesField.label"
      :label-for="tradesTypesField.attribute"
      :description="tradesTypesField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="tradesTypesField.value"
        :values="tradesTypesField.values"
        :error="!!tradesTypesField.error"
        @change="setValue($event, tradesTypesField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="tradingStrategiesField"
      :label="tradingStrategiesField.label"
      :label-for="tradingStrategiesField.attribute"
      :description="tradingStrategiesField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="tradingStrategiesField.value"
        :values="tradingStrategiesField.values"
        :error="!!tradingStrategiesField.error"
        @change="setValue($event, tradingStrategiesField.attribute)"
      />
    </b-form-group>
    <b-form-group
      v-if="instrumentsTypesField"
      :label="instrumentsTypesField.label"
      :label-for="instrumentsTypesField.attribute"
      :description="instrumentsTypesField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-radio
        v-model="instrumentsTypesField.value"
        :values="instrumentsTypesField.values"
        :error="!!instrumentsTypesField.error"
        @change="setValue($event, instrumentsTypesField.attribute)"
      />
    </b-form-group>
    <div v-if="isButtonShown" :class="buttonClasses">
      <b-button
        ref="form-button"
        type="submit"
        class="w-100"
        variant="primary"
        @click="onSubmit"
        v-text="$t('Завершить')"
      />
    </div>
  </b-form>
</template>

<script>
import form from '~/mixins/form'
import FieldSelectRadio from '~/components/modal/fields/field-select-radio'

export default {
  name: 'QuestionnaireTraderStepTwo',
  components: { FieldSelectRadio },
  mixins: [form],
  computed: {
    tradingNewsField () {
      return this.getField('trading_news')
    },
    tradesTypesField () {
      return this.getField('trades_types')
    },
    tradingStrategiesField () {
      return this.getField('trading_strategies')
    },
    instrumentsTypesField () {
      return this.getField('instruments_types')
    }
  }
}
</script>
