<template>
  <b-form :id="`form_${id || formTitle}`" class="modal-form" :class="direction" @submit="onSubmit">
    <span
      class="text-secondary-13"
      :class="isRtlMode ? 'text-right' : ''"
      :style="{ marginBottom: '13px' }"
      v-text="$t('Прежде необходимо установить никнейм, который будет отображаться в мониторинге трейдеров и чатах')"
    />
    <b-form-group
      v-if="usernameField"
      :label="usernameField.label"
      :label-for="usernameField.attribute"
      :description="usernameField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-text
        :id="usernameField.attribute"
        v-model="usernameField.value"
        :type="usernameField.type"
        :error="!!usernameField.error"
        @change="setValue($event, usernameField.attribute)"
      />
    </b-form-group>
    <div v-if="isButtonShown" :class="buttonClasses">
      <b-button ref="form-button" type="submit" class="w-100" variant="primary" v-text="$t(buttonText)" />
    </div>
  </b-form>
</template>

<script>
import form from '~/mixins/form'
import FieldText from '~/components/modal/fields/field-text'
export default {
  name: 'FormProfileUsername',
  components: { FieldText },
  mixins: [form],
  computed: {
    usernameField () {
      return this.getField('username')
    }
  }
}
</script>
