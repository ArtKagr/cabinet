<template>
  <b-form :id="`form_${id || formTitle}`" class="modal-form" :class="direction" @submit="onSubmit">
    <b-form-group
      v-for="(field, key) in changedForm"
      :key="key"
      :description="field.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-text-bubble
        :id="id"
        v-model="field.value"
        :label="field.label"
        :type="field.type"
        :error="!!field.error"
        @change="setValue($event, field.attribute)"
      />
    </b-form-group>
    <div class="authorization-modal-remember_reset -modal">
      <div class="authorization-modal-remember_reset-remember" @click="toggleValue">
        <b-icon-check-square-fill v-if="checkBoxValue" class="authorization-modal-remember_reset-remember-checkbox -fill" />
        <b-icon-square v-else class="authorization-modal-remember_reset-remember-checkbox" />
        <span class="authorization-modal-remember_reset-remember-title" :class="`-${dir}`" v-text="$t('Запомнить')" />
      </div>
      <nuxt-link class="authorization-modal-remember_reset-reset" :to="`/${routePages.locale}/reset-password`" v-text="$t('Забыли пароль?')" />
    </div>
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
    <span v-if="formTitle === 'login'" class="authorization-action mt-4">
      {{ $t('Еще не зарегистрированы?') }}
      <span class="text-primary-14 pointer" @click="openRegistration" v-text="$t('Регистрация')" />
    </span>
  </b-form>
</template>

<script>
import form from '~/mixins/form'
import FieldTextBubble from '~/components/modal/fields/field-text-bubble'
export default {
  name: 'FormLogin',
  components: { FieldTextBubble },
  mixins: [form],
  data () {
    return {
      checkBoxValue: false
    }
  },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    }
  },
  methods: {
    toggleValue () {
      this.checkBoxValue = !this.checkBoxValue
    },
    openRegistration () {
      this.fetchForm('registration')
    }
  }
}
</script>
<style lang="scss">
  #form_login {
    padding: 0 30px 30px;
  }
  #form_loginPage {
    padding: 0 30px 30px;
    max-width: 480px;

    @media screen and (max-width: 767px) {
      max-width: 100%;
    }
  }
</style>
