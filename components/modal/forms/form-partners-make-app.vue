<template>
  <b-form :id="`form_${id || formTitle}`" class="modal-form" :class="direction" @submit="onSubmit">
    <div class="form-partners-make-app-container">
      <img
        class="form-partners-make-app-container-image"
        :src="imageData.url"
        alt
      >
      <div class="form-partners-make-app-container-desc">
        <span class="form-partners-make-app-container-desc-title" :class="{ 'text-right': dir === 'rtl' }" v-text="$t('Выбрано')" />
        <span class="form-partners-make-app-container-desc-text" v-text="imageData.fileName" />
      </div>
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
    <div v-if="isButtonShown" :class="buttonClasses">
      <b-button ref="form-button" type="submit" class="w-100 text-white-16" variant="primary" v-text="$t(buttonText)" />
    </div>
  </b-form>
</template>

<script>
import form from '~/mixins/form'
import FieldText from '~/components/modal/fields/field-text'
export default {
  name: 'FormPartnersMakeApp',
  components: { FieldText },
  mixins: [form],
  computed: {
    imageData () {
      return this.$store.getters['partners/getters/handler/getPromoFormImageData']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  }
}
</script>
<style lang="scss">
  .form-partners-make-app-container {
    display: flex;
    margin-bottom: 20px;

    &-image {
      max-width: 180px;
      padding: 0 5px;
    }

    &-desc {
      display: flex;
      flex-direction: column;
      padding: 0 5px;

      &-title {
        font-size: 10px;
        color: #8e9aac;
        text-transform: uppercase;
      }

      &-text {
        font-size: 15px;
        color: #3B4B68;
        line-height: 1;
      }
    }
  }
</style>
