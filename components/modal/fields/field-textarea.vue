<template>
  <div class="field-textarea" :class="{ '-error': error }">
    <span class="field-textarea-characters" :class="`-${dir}`" v-text="characterCounter" />
    <b-form-textarea
      :id="id"
      :key="keyRandom"
      v-model="changedValue"
      :dir="dir"
      :placeholder="placeholder"
      rows="6"
    />
    <div v-if="isSeparator" class="field-textarea-separator" :class="`-${dir}`" />
  </div>
</template>

<script>
export default {
  name: 'FieldTextarea',
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: null
    },
    id: {
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
    isSeparator: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      keyRandom: null
    }
  },
  computed: {
    characterCounter () {
      return `${this.stringLength}/${this.max}`
    },
    stringLength () {
      return this.value ? this.value.length : 0
    },
    changedValue: {
      get () {
        return this.value
      },
      set (newValue) {
        if (newValue.length > this.max) {
          this.emitValue(newValue.slice(0, this.max))
          this.recalculateKey()
        } else {
          this.emitValue(newValue)
        }
      }
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  created () {
    this.recalculateKey()
  },
  methods: {
    emitValue (value) {
      this.$emit('change', value)
    },
    recalculateKey () {
      this.keyRandom = Math.floor(Math.random() * 1000000)
    }
  }
}
</script>
<style lang="scss">
  .field-textarea {
    display: flex;
    flex-direction: column;
    position: relative;

    textarea {
      padding: 9px 10px;
      border-radius: 3px !important;
    }

    &.-error {

      textarea {
        padding: 9px 10px;
        border-radius: 3px !important;
        border: 1px solid #ff4b5f;
      }
    }

    &-characters {
      position: absolute;
      top: -23px;

      &.-ltr {
        right: 0;
      }

      &.-rtl {
        left: 0;
      }
    }

    &-separator {
      width: calc(100% + 60px);
      height: 20px;
      border-bottom: 1px solid #d9dce1;

      &.-ltr {
        transform: translateX(-30px);
      }

      &.-rtl {
        transform: translateX(30px);
      }
    }
  }
</style>
