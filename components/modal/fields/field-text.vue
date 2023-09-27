<template>
  <b-form-input
    :id="id"
    v-model="changedValue"
    v-mask="mask"
    :type="type"
    class="field-text"
    :class="error ? '-error' : ''"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  name: 'FieldText',
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: null
    },
    id: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    error: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    mask: {
      type: String,
      default: null
    }
  },
  computed: {
    changedValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('change', newValue)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .field-text.form-control {
    height: 41px !important;
    padding: 9px 10px !important;
    border-radius: 3px !important;
    color: #3B4B68 !important;
    border: 1px solid #D9DCE1 !important;

    &.-error {
      border: 1px solid #FF4B5F !important;
    }
  }

  label {
    margin: 0 0 5px !important;
  }
</style>
