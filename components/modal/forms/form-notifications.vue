<template>
  <b-form :id="`form_${id || formTitle}`" class="modal-form" :class="direction" @submit="onSubmit">
    <div class="form-notifications-body">
      <div class="form-notifications-body-block">
        <span class="form-notifications-body-block-title" :class="`-${dir}`" v-text="$t('Уведомления о низком уровне маржи')" />
        <b-form-group
          v-for="(field, key) in firstBlock"
          :key="key"
          :description="field.error"
          :dir="dir"
          :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
        >
          <field-slider
            v-if="field.attribute === 'low_margin_level'"
            v-model="field.value"
            :min="1"
            :max="500"
            @change="setValue($event, field.attribute)"
          />
          <field-checkbox
            v-if="['email_low_margin', 'sms_low_margin'].includes(field.attribute)"
            :id="field.attribute"
            v-model="field.value"
            :form-id="id"
            :error="!!field.error"
            :label="field.label"
            :size="20"
            @change="setValue($event, field.attribute)"
          />
        </b-form-group>
      </div>
      <div class="form-notifications-body-block">
        <span class="form-notifications-body-block-title" :class="`-${dir}`" v-text="$t('Подписки на email-рассылки')" />
        <b-form-group
          v-for="(field, key) in secondBlock"
          :key="key"
          :description="field.error"
          :dir="dir"
          :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
        >
          <field-checkbox
            :id="field.attribute"
            v-model="field.value"
            :form-id="id"
            :error="!!field.error"
            :label="field.label"
            :info="field.attribute === 'email_trading' ? $t('Отключение рассылки по изменениям торговых условий может  негативно повлиять на торговлю') : null"
            :size="20"
            :height="field.attribute === 'email_trading' && !field.value ? 70 : null"
            @change="setValue($event, field.attribute)"
          />
        </b-form-group>
      </div>
      <div v-if="isButtonShown" :class="buttonClasses">
        <b-button ref="form-button" type="submit" class="w-30 mt-4" variant="outline-primary" v-text="$t(buttonText)" />
      </div>
    </div>
  </b-form>
</template>

<script>
import form from '~/mixins/form'
import FieldCheckbox from '~/components/modal/fields/field-checkbox'
import FieldSlider from '~/components/modal/fields/field-slider'
export default {
  name: 'FormNotifications',
  components: {
    FieldSlider,
    FieldCheckbox
  },
  mixins: [form],
  computed: {
    firstBlock () {
      return this.changedForm.filter(field => ['low_margin_level', 'email_low_margin', 'sms_low_margin'].includes(field.attribute))
    },
    secondBlock () {
      return this.changedForm.filter(field => ['email_trading', 'email_company', 'email_analytics', 'email_offers', 'email_blog', 'email_mt'].includes(field.attribute))
    }
  }
}
</script>
<style lang="scss">
  #form_notifications {
    background-color: white;
    width: 450px;
    max-width: 450px;
    padding: 30px 20px;
    border: 1px solid #d9dce1;
    border-radius: 3px;
  }

  .form-notifications-body {
    display: flex;
    flex-direction: column;

    &-block {
      display: flex;
      flex-direction: column;

      &-title {
        font-size: 20px;
        color: #3B4B68;
        margin-bottom: 20px;

        &.-rtl {
          text-align: right;
        }
      }
    }
  }
</style>
