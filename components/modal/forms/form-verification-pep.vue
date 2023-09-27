<template>
  <b-form :id="`form_${id || formTitle}`" class="form-verification-pep" @submit="onSubmit">
    <div
      v-if="pepHintTitle && pepHintLists && pepHintLists.length && pepHintTexts && pepHintTexts.length"
      class="form-verification-pep-hint"
    >
      <span class="form-verification-pep-hint-title" :class="`-${dir}`" v-text="pepHintTitle.content" />
      <div class="form-verification-pep-hint-container">
        <span
          v-for="(item, key) in pepHintLists[0].content"
          :key="key"
          class="form-verification-pep-hint-container-text"
          :class="`-${dir}`"
          v-text="item"
        />
      </div>
      <span class="form-verification-pep-hint-text -info" :class="`-${dir}`" v-text="pepHintTexts[0].content" />
      <span class="form-verification-pep-hint-text" :class="`-${dir}`" v-text="pepHintTexts[1].content" />
      <div class="form-verification-pep-hint-container">
        <span
          v-for="(item, key) in pepHintLists[1].content"
          :key="key"
          class="form-verification-pep-hint-container-text"
          :class="`-${dir}`"
          v-text="item"
        />
      </div>
      <span class="form-verification-pep-hint-text" v-text="pepHintTexts[2].content" />
      <div class="form-verification-pep-hint-container">
        <span
          v-for="(item, key) in pepHintLists[2].content"
          :key="key"
          class="form-verification-pep-hint-container-text"
          :class="`-${dir}`"
          v-text="item"
        />
      </div>
    </div>
    <b-form-group
      v-if="pepField"
      :description="pepField.error"
      :dir="dir"
      :class="['lfx-forms-input-title w-100', fieldClasses, `-${dir}`]"
    >
      <field-checkbox
        :id="pepField.attribute"
        v-model="pepField.value"
        :error="!!pepField.error"
        :label="pepField.label"
        :hint-size="'small'"
        @change="setValue($event, pepField.attribute)"
      />
    </b-form-group>
    <div>
      <b-button ref="form-button" type="submit" class="w-100" variant="primary" v-text="$t(buttonText)" />
    </div>
  </b-form>
</template>

<script>
import form from '~/mixins/form'
import FieldCheckbox from '~/components/modal/fields/field-checkbox'
export default {
  name: 'FormVerificationPep',
  components: { FieldCheckbox },
  mixins: [form],
  computed: {
    pepField () {
      return this.getField('politically_exposed_person')
    },
    pepHint () {
      if (this.pepField) {
        return this.pepField.hint
      }

      return []
    },
    pepHintTitle () {
      return this.pepHint.find(item => item.type === 'title')
    },
    pepHintLists () {
      return this.pepHint.filter((item, key) => [1, 4, 6].includes(key))
    },
    pepHintTexts () {
      return this.pepHint.filter((item, key) => [2, 3, 5].includes(key))
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  }
}
</script>
<style lang="scss">
  .form-verification-pep {
    display: flex;
    flex-direction: column;
    padding: 20px 30px;

    &-hint {
      display: flex;
      flex-direction: column;
      font-size: 13px;
      padding-bottom: 30px;
      color: #8e9aac;

      &-title {
        font-weight: 700;
        margin-bottom: 13px;

        &.-rtl {
          text-align: right;
        }
      }

      &-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;

        &-text {

          &.-rtl {
            text-align: right;
          }
        }
      }

      &-text {
        margin-bottom: 13px;

        &.-rtl {
          text-align: right;
        }

        &.-info {
          padding-bottom: 15px;
          font-style: italic;
        }
      }
    }
  }
</style>
