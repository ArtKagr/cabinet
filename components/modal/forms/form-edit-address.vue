<template>
  <b-form :id="`form_${formTitle}`" class="modal-form" :class="direction" @submit="onSubmit">
    <b-form-group
      v-for="(field, key) in firstRows"
      :key="key"
      :label="field.label"
      :label-for="field.attribute"
      :description="field.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select
        v-if="field.type === 'select'"
        :id="field.attribute"
        v-model="field.value"
        :values="field.values"
        :is-countries="true"
        :error="!!field.error"
        @change="setValue($event, field.attribute)"
      />
      <field-text
        v-else
        :id="field.attribute"
        v-model="field.value"
        :type="field.type"
        :error="!!field.error"
        @change="setValue($event, field.attribute)"
      />
    </b-form-group>
    <div class="d-flex justify-content-between">
      <b-form-group
        v-for="(field, key) in secondRows"
        :key="key"
        :label="field.label"
        :label-for="field.attribute"
        :description="field.error"
        :dir="dir"
        :class="['lfx-forms-input-title', fieldClasses, `-${dir}`, key === 0 ? `${isRtlMode ? 'w-40' : 'w-70'} mr-2` : isRtlMode ? 'w-70' : 'w-40']"
      >
        <field-text
          :id="field.attribute"
          v-model="field.value"
          :type="field.type"
          :error="!!field.error"
          @change="setValue($event, field.attribute)"
        />
      </b-form-group>
    </div>
    <div v-if="isButtonShown" :class="buttonClasses">
      <b-button ref="form-button" type="submit" class="w-100" variant="primary" v-text="$t(buttonText)" />
    </div>
  </b-form>
</template>

<script>
import form from '~/mixins/form'
import FieldText from '~/components/modal/fields/field-text'
import FieldSelect from '~/components/modal/fields/field-select'
export default {
  name: 'FormEditAddress',
  components: {
    FieldSelect,
    FieldText
  },
  mixins: [form],
  data () {
    return {
      rows: {
        first: ['country', 'region', 'city'],
        second: ['address', 'postcode']
      }
    }
  },
  computed: {
    firstRows () {
      return this.changedForm.filter(field => this.rows.first.includes(field.attribute))
    },
    secondRows () {
      if (this.isRtlMode) {
        return this.changedForm.filter(field => this.rows.second.includes(field.attribute)).reverse()
      } else {
        return this.changedForm.filter(field => this.rows.second.includes(field.attribute))
      }
    }
  }
}
</script>
