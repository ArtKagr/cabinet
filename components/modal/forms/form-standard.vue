<template>
  <b-form :id="`form_${id || formTitle}`" class="modal-form" :class="direction" @submit="onSubmit">
    <b-form-group
      v-for="(field, key) in changedForm"
      :key="key"
      :label="field.label"
      :label-for="field.attribute"
      :description="field.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select
        v-if="field.type === 'select'"
        :id="id"
        v-model="field.value"
        :values="field.values"
        :error="!!field.error"
        :select-styles="{ height: '41px' }"
        @change="setValue($event, field.attribute)"
      />
      <field-password
        v-else-if="field.type === 'password'"
        :id="field.attribute"
        v-model="field.value"
        :error="!!field.error"
        @change="setValue($event, field.attribute)"
      />
      <field-text
        v-else-if="field.type === 'text'"
        :id="field.attribute"
        v-model="field.value"
        :type="field.type"
        :error="!!field.error"
        @change="setValue($event, field.attribute)"
      />
    </b-form-group>
    <div v-if="isButtonShown" :class="buttonClasses">
      <b-button ref="form-button" type="submit" class="w-100" variant="primary" v-text="$t(buttonText)" />
    </div>
  </b-form>
</template>

<script>
import FieldSelect from '@/components/modal/fields/field-select'
import FieldPassword from '@/components/modal/fields/field-password'
import FieldText from '@/components/modal/fields/field-text'
import form from '~/mixins/form'
export default {
  name: 'FormStandard',
  components: { FieldText, FieldPassword, FieldSelect },
  mixins: [form]
}
</script>
<style lang="scss">
  #form_internalTransfer {
    max-width: 100% !important;
    padding: 0 !important;
  }

  #form_editEmail,
  #form_editPhone,
  #form_editIdentity,
  #form_editAddress {
    padding: 20px 30px 30px 30px;
  }
</style>
