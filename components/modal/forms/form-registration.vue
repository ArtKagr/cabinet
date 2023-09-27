<template>
  <b-form :id="`form_${id || formTitle}`" class="modal-form" :class="[direction, `-${formTitle}`]" @submit="onSubmit">
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
        :error="!!field.error"
        :is-countries="field.attribute === 'country'"
        :label="field.label"
        @change="setValue($event, field.attribute)"
      />
      <field-text-bubble
        v-if="['text', 'password'].includes(field.type)"
        :id="id"
        v-model="field.value"
        :label="field.label"
        :type="field.type"
        :error="!!field.error"
        @change="setValue($event, field.attribute)"
      />
      <field-checkbox
        v-if="field.type === 'checkbox'"
        :id="field.attribute"
        v-model="field.value"
        :error="!!field.error"
        :label="field.label"
        @change="setValue($event, field.attribute)"
      />
    </b-form-group>
    <span v-if="formTitle === 'registration'" class="text-secondary-14 text-center mb-3" v-text="$t('Финансовые услуги предоставляются {company}', { company: 'LiteFinance Global LLC (ex. LiteForex)' })" />
    <div v-if="isButtonShown" :class="buttonClasses">
      <b-button ref="form-button" type="submit" class="w-100 text-white-16" variant="primary" v-text="$t(buttonText)" />
    </div>
    <div class="authorization-modal-social -modal">
      <span class="authorization-modal-social-text" v-text="$t('или использовать для входа')" />
      <div class="authorization-modal-social-buttons">
        <b-button variant="dark-danger" :class="isRtlMode ? 'ml-3' : 'mr-3'" v-text="'Google'" />
        <b-button variant="dark-primary" v-text="'Facebook'" />
      </div>
    </div>
    <span v-if="formTitle === 'registration'" class="authorization-action mt-4">
      {{ $t('Уже зарегистрированы?') }}
      <span class="text-primary-14 pointer" @click="openLogin" v-text="$t('Вход')" />
    </span>
  </b-form>
</template>

<script>
import form from '~/mixins/form'
import FieldSelectBubble from '~/components/modal/fields/field-select-bubble'
import FieldTextBubble from '~/components/modal/fields/field-text-bubble'
import FieldCheckbox from '~/components/modal/fields/field-checkbox'
export default {
  name: 'FormRegistration',
  components: { FieldCheckbox, FieldTextBubble, FieldSelectBubble },
  mixins: [form],
  methods: {
    openLogin () {
      this.toggleModal(false)
      this.fetchForm('login')
    }
  }
}
</script>
<style lang="scss">
//small {
//  text-align: center;
//}
#form_registration {
  padding: 0 30px 30px;
}

#form_registrationPage {
  padding: 0 30px 30px;
}
</style>
