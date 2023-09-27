<template>
  <b-form :id="`form_${formTitle}`" class="modal-form" :class="direction" @submit="onSubmit">
    <div class="d-flex flex-column">
      <div class="name" :class="`-${dir}`">
        <span class="name-title" v-text="$t('Полное имя')" />
        <div class="name-value" v-text="user.full_name" />
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
        <div v-if="field.attribute === 'politically_exposed_person'" class="position-relative">
          <lfx-icon-help v-b-toggle:pep_hint class="pep_hint-icon pointer" :class="`-${dir}`" />
          <b-collapse id="pep_hint">
            <div class="pep_hint-container">
              <template v-for="(data, index) in field.hint">
                <span v-if="data.type === 'title'" :key="index" class="pep_hint-container-title" v-text="data.content" />
                <div v-else-if="data.type === 'list'" :key="index" class="pep_hint-container-points">
                  <span v-for="(text, i) in data.content" :key="i" class="pep_hint-container-points-point" v-text="text" />
                </div>
                <span
                  v-else-if="data.type === 'text'"
                  :key="index"
                  class="pep_hint-container-text"
                  :class="index === 2 ? '-italics' : ''"
                  v-text="data.content"
                />
              </template>
            </div>
          </b-collapse>
          <field-select
            :id="field.attribute"
            v-model="field.value"
            :values="field.values"
            :error="!!field.error"
            @change="setValue($event, field.attribute)"
          />
        </div>
        <field-select
          v-if="field.type === 'select'"
          :id="field.attribute"
          v-model="field.value"
          :values="field.values"
          :error="!!field.error"
          @change="setValue($event, field.attribute)"
        />
        <field-text
          v-else-if="['text', 'date'].includes(field.type)"
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
import FieldSelect from '~/components/modal/fields/field-select'
import LfxIconHelp from '~/components/icons/lfx-icon-help'
import FieldText from '~/components/modal/fields/field-text.vue'
export default {
  name: 'FormEditIdentity',
  components: {
    FieldText,
    LfxIconHelp,
    FieldSelect
  },
  mixins: [form]
}
</script>
<style lang="scss" scoped>
 .name {
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

 .pep_hint {

   &-icon {
     position: absolute;
     top: -25px;

     &:focus {
       outline: none;
     }

     &.-ltr {
       right: 0;
     }

     &.-rtl {
       left: 0;
     }
   }

   &-container {
     display: flex;
     flex-direction: column;
     font-size: 12px;
     color: #6d788a;
     padding: 16px 0;
     width: 370px;

     @media screen and (max-width: 767px) {
       width: 100%;
     }

     &-title {
      font-weight: 700;
       margin-bottom: 12px;
     }

     &-points {
       display: flex;
       flex-direction: column;
       margin-bottom: 15px;

       &-point {

       }
     }

     &-text {
       margin-bottom: 12px;

       &.-italics {
         font-style: italic;
       }

     }
   }

 }
</style>
