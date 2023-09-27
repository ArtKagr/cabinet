<template>
  <b-form :id="`form_${formTitle}`" class="modal-form" :class="direction" @submit="onSubmit">
    <div class="d-flex flex-column">
      <div class="email" :class="`-${dir}`">
        <span class="email-title" v-text="$t('Текущий email')" />
        <div class="email-value" v-text="user.email" />
      </div>
      <b-form-group
        v-for="(field, key) in changedForm"
        :key="key"
        :label="field.label"
        :label-for="field.attribute"
        :description="field.error"
        :dir="dir"
        :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
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
export default {
  name: 'FormEditEmail',
  components: {
    FieldText
  },
  mixins: [form]
}
</script>
<style lang="scss" scoped>
.email {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  &.-rtl {
    text-align: right;
  }

  &-title {
    font-size: 12px;
    color: #8e9aac;
    margin-bottom: 5px;
  }

  &-value {
    padding: 9px 10px;
    border-radius: 3px;
    width: 100%;
    border: 1px solid #d9dce1;
    background-color: #eaeced;
    font-size: 14px;
    color: #3B4B68;
  }
}
</style>
