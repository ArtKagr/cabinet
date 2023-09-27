<template>
  <b-input-group class="field-numeric" :class="[error ? '-error' : '', isDisabled ? '-disabled' : '']">
    <b-input-group-prepend class="field-numeric-icon" @mousedown="mouseDownHandler(-Math.abs(counter))" @mouseup="stopCounter">
      <template v-if="isMinShown && !disabled">
        <lfx-icon-minus v-if="pointer === 'mathSign'" class="pointer" />
        <b-icon-caret-down-fill v-else class="icon-gray pointer" />
      </template>
    </b-input-group-prepend>
    <b-form-input :id="id" :key="keyRandom" v-model="changedValue" lazy @change="recalculateKey" />
    <b-input-group-append class="field-numeric-icon" @mousedown="mouseDownHandler(counter)" @mouseup="stopCounter">
      <template v-if="isMaxShown && !disabled">
        <lfx-icon-plus v-if="pointer === 'mathSign'" class="pointer" />
        <b-icon-caret-up-fill v-else class="icon-gray pointer" />
      </template>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
import LfxIconPlus from '~/components/icons/lfx-icon-plus'
import LfxIconMinus from '~/components/icons/lfx-icon-minus'
export default {
  name: 'FieldNumeric',
  components: { LfxIconMinus, LfxIconPlus },
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
    pointer: {
      type: String,
      default: 'mathSign'
    },
    prefix: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    digits: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: null
    },
    counter: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isVoidSubst: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      counterId: null,
      keyRandom: null
    }
  },
  computed: {
    changedValue: {
      get () {
        if (this.isVoidSubst) {
          return '-'
        }

        return `${this.prefix}${Number(this.value).toFixed(this.digits)} ${this.label}`
      },
      set (newValue) {
        this.emitValue(this.cleanValue(newValue === '-' ? 0 : newValue))
      }
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    isMinShown () {
      return (this.min || this.min === 0) && this.value !== this.min
    },
    isMaxShown () {
      return (this.max || this.max === 0) && this.value !== this.max
    },
    isDisabled () {
      return (!this.isMinShown && !this.isMaxShown) || this.disabled
    }
  },
  watch: {
    changedValue (newValue) {
      if (this.cleanValue(newValue) <= this.min) {
        this.stopCounter()
        this.emitValue(this.min)
      } else if (this.cleanValue(newValue) >= this.max) {
        this.stopCounter()
        this.emitValue(this.max)
      }
    }
  },
  created () {
    this.recalculateKey()
  },
  destroyed () {
    this.stopCounter()
  },
  methods: {
    mouseDownHandler (value) {
      this.counterId = setInterval(() => {
        this.emitValue(this.cleanValue(this.changedValue === '-' ? 0 : this.changedValue) + Number(value))
        this.emitPointer(Number(value))
      }, 80)
    },
    stopCounter () {
      clearInterval(this.counterId)
    },
    recalculateKey () {
      this.keyRandom = Math.floor(Math.random() * 1000000)
    },
    emitValue (value) {
      this.$emit('change', value)
    },
    emitPointer (value) {
      this.$emit('point', value)
    },
    cleanValue (value) {
      const newValue = `${value}`.replace(/[a-zа-яёA-ZA-z%]/ig, '').trim()
      return Number(newValue)
    }
  }
}
</script>
<style lang="scss">
  .field-numeric {
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-radius: 3px !important;
    color: #3B4B68;
    border: 1px solid #D9DCE1 !important;
    background-color: white;

    &.-disabled {
      background-color: #eaeced;

      input {
        background-color: #eaeced;
      }
    }

    &-icon {
      display: flex;
      align-items: center;
      min-width: 16px;
    }

    &-label {
      font-size: 18px;
    }

    input {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

      &.-error {
        border: 1px solid #FF4B5F !important;
      }

  }
   #trader_commission,
   #partner_commission,
   #min_investment {
     border: none;
     padding: 0;
     text-align: center;
     font-size: 18px;
   }
</style>
