<template>
  <b-form :id="`form_${id || formTitle}`" class="modal-form" :class="direction" @submit="onSubmit">
    <span v-if="formTitle === 'confirmEmail'" class="confirm_email_hint" :class="`-${dir}`" v-text="$t('Пожалуйста, введите код подтверждения из письма и задайте новый пароль')" />
    <b-form-group
      v-for="(field, key) in changedForm"
      :key="key"
      :description="field.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-select-bubble
        v-if="field.type === 'select'"
        :id="id"
        v-model="field.value"
        :values="field.values"
        :form-title="formTitle"
        :error="!!field.error"
        :label="field.label"
        @change="setValue($event, field.attribute)"
      />
      <field-text-bubble
        v-else-if="field.type === 'text'"
        :id="field.attribute"
        v-model="field.value"
        :type="field.type"
        :error="!!field.error"
        :label="field.label"
        @change="setValue($event, field.attribute)"
      />
      <field-text-bubble
        v-else-if="field.type === 'password'"
        :id="field.attribute"
        v-model="field.value"
        :type="field.type"
        :error="!!field.error"
        :label="field.label"
        @change="setValue($event, field.attribute)"
      />
    </b-form-group>
    <div v-if="isButtonShown" :class="buttonClasses">
      <b-button ref="form-button" type="submit" class="w-100 text-white-16" variant="primary" v-text="$t(buttonText)" />
    </div>
  </b-form>
</template>

<script>
import form from '~/mixins/form'
import FieldSelectBubble from '~/components/modal/fields/field-select-bubble'
import FieldTextBubble from '~/components/modal/fields/field-text-bubble'
export default {
  name: 'FormBubble',
  components: { FieldTextBubble, FieldSelectBubble },
  mixins: [form]
}
</script>
<style lang="scss">
  .confirm_email_hint {
    font-size: 14px;
    color: #8e9aac;
    padding-bottom: 30px;

    &.-rtl {
      text-align: right;
    }
  }

  #form_resetPassword,
  #form_confirmEmail {
    padding: 0 30px 30px 30px;
    max-width: 480px;

    @media screen and (max-width: 767px) {
      max-width: 100%;
    }
  }
</style>
