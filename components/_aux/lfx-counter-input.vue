<template>
  <div class="d-flex flex-column">
    <span v-if="title" class="lfx-forms-input-title" :class="`-${dir}`" v-text="title" />
    <b-input-group class="lfx-forms-input-body -current_instrument-rules" :class="[large ? '-large' : '', disabled ? '-disabled' : '']">
      <b-input-group-prepend v-if="isRtlMode ? countUp : countDown && !disabled" class="mr-1" @click="$event.stopPropagation()">
        <template v-if="isRtlMode">
          <b-icon-caret-up-fill
            v-if="buttonType === 'caret'"
            class="icon-gray pointer"
            @click="clickHandler($event, countUp)"
            @mousedown="mouseDownHandler($event, countUp)"
            @mouseup="mouseUpHandler"
            @mouseleave="mouseLeaveHandler"
          />
          <lfx-icon-plus
            v-else
            class="pointer"
            @click.native="clickHandler($event, countUp)"
            @mousedown.native="mouseDownHandler($event, countUp)"
            @mouseup.native="mouseUpHandler"
            @mouseleave.native="mouseLeaveHandler"
          />
        </template>
        <template v-else>
          <b-icon-caret-down-fill
            v-if="buttonType === 'caret'"
            class="icon-gray pointer"
            @click="clickHandler($event, `-${countDown}`)"
            @mousedown="mouseDownHandler($event, `-${countDown}`)"
            @mouseup="mouseUpHandler"
            @mouseleave="mouseLeaveHandler"
          />
          <lfx-icon-minus
            v-else
            class="pointer"
            @click.native="clickHandler($event, `-${countDown}`)"
            @mousedown.native="mouseDownHandler($event, `-${countDown}`)"
            @mouseup.native="mouseUpHandler"
            @mouseleave.native="mouseLeaveHandler"
          />
        </template>
      </b-input-group-prepend>
      <b-input-group-prepend v-else>
        <template v-if="isRtlMode">
          <b-icon-caret-up-fill v-if="buttonType === 'caret'" class="icon-extra-light-gray" />
          <lfx-icon-plus />
        </template>
        <template v-else>
          <b-icon-caret-down-fill v-if="buttonType === 'caret'" class="icon-extra-light-gray" />
          <lfx-icon-minus />
        </template>
      </b-input-group-prepend>
      <b-form-input
        :key="getRandomNumber"
        v-model="changedValue"
        class="lfx-forms-input-body-field"
        :class="inputClass"
        :type="inputType"
        :disabled="disabled"
        lazy
        @input="inputHandler"
        @change="changeHandler"
        @blur="blurHandler"
      />
      <b-input-group-append v-if="isRtlMode ? countDown : countUp && !disabled" class="ml-1" @click="$event.stopPropagation()">
        <template v-if="isRtlMode">
          <b-icon-caret-down-fill
            v-if="buttonType === 'caret'"
            class="icon-gray pointer"
            @click="clickHandler($event, `-${countDown}`)"
            @mousedown="mouseDownHandler($event, `-${countDown}`)"
            @mouseup="mouseUpHandler"
            @mouseleave="mouseLeaveHandler"
          />
          <lfx-icon-minus
            v-else
            class="pointer"
            @click.native="clickHandler($event, `-${countDown}`)"
            @mousedown.native="mouseDownHandler($event, `-${countDown}`)"
            @mouseup.native="mouseUpHandler"
            @mouseleave.native="mouseLeaveHandler"
          />
        </template>
        <template v-else>
          <b-icon-caret-up-fill
            v-if="buttonType === 'caret'"
            class="icon-gray pointer"
            @click="clickHandler($event, countUp)"
            @mousedown="mouseDownHandler($event, countUp)"
            @mouseup="mouseUpHandler"
            @mouseleave="mouseLeaveHandler"
          />
          <lfx-icon-plus
            v-else
            class="pointer"
            @click.native="clickHandler($event, countUp)"
            @mousedown.native="mouseDownHandler($event, countUp)"
            @mouseup.native="mouseUpHandler"
            @mouseleave.native="mouseLeaveHandler"
          />
        </template>
      </b-input-group-append>
      <b-input-group-append v-else>
        <template v-if="isRtlMode">
          <b-icon-caret-down-fill v-if="buttonType === 'caret'" class="icon-extra-light-gray" />
          <svg v-else width="16" height="3" viewBox="0 0 16 4">
            <path d="M 0 0L 16 0L 16 4L 0 4L 0 0Z" fill="#e9ecef" />
          </svg>
        </template>
        <template v-else>
          <b-icon-caret-up-fill v-if="buttonType === 'caret'" class="icon-extra-light-gray" />
          <lfx-icon-plus v-else class="icon-extra-light-gray" />
        </template>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
import LfxIconMinus from '~/components/icons/lfx-icon-minus'
import LfxIconPlus from '~/components/icons/lfx-icon-plus'
export default {
  name: 'LfxCounterInput',
  components: { LfxIconMinus, LfxIconPlus },
  props: {
    source: {
      type: String,
      default: null
    },
    value: {
      type: Number,
      default: 0
    },
    minValue: {
      type: Number,
      default: 0
    },
    maxValue: {
      type: Number,
      default: 0
    },
    countDown: {
      type: Number,
      default: 0
    },
    countUp: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: null
    },
    buttonType: {
      type: String,
      default: 'caret'
    },
    inputClass: {
      type: String,
      default: null
    },
    large: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    digits: {
      type: Number,
      default: 0
    },
    isHiddenValue: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      changedData: 0,
      numberPattern: /\d+/g,
      min: 0,
      max: 1000000,
      random: 0
    }
  },
  computed: {
    tradingData () {
      return this.$store.getters['trading/getters/trading/getTrading']
    },
    getRandomNumber () {
      return this.random
    },
    inputType () {
      let result
      if (this.isHiddenValue) {
        result = 'text'
      } else if (this.source) {
        switch (this.source) {
          case 'amount':
          case 'trading-card':
          case 'usd-counter':
          case 'percent-counter':
          case 'points':
            result = 'text'
            break
          default:
            result = 'number'
        }
      } else {
        result = 'number'
      }
      return result
    },
    changedValue: {
      get () {
        if (this.isHiddenValue) {
          return '-'
        } else if (this.source === 'amount') {
          return `${Number(this.value) > 0 ? '+' : ''}${Number(this.value).toFixed(this.digits)} ${this.tradingData.account.currency}`
        } else if (this.source === 'trading-card') {
          return `${Number(this.value).toFixed(this.digits)} лот`
        } else if (this.source === 'usd-counter') {
          return `${Number(this.value).toFixed(this.digits)} ${this.tradingData.account.currency}`
        } else if (this.source === 'percent-counter') {
          return `${Number(this.value)} %`
        } else if (this.source === 'points') {
          return `${Number(this.value) > 0 ? '+' : ''}${Number(this.value).toFixed(this.digits)}`
        } else if (this.digits) {
          return Number(this.value).toFixed(this.digits)
        } else {
          return Number(this.value)
        }
      },
      set (value) {
        const result = value.replace(/[^\d.-]/ig, '')
        this.changedData = Number(result)
      }
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  created () {
    this.random = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
  },
  methods: {
    inputHandler (value) {
      const result = Number(value)
      setTimeout(() => {
        if ((result === this.value) || (result < this.minValue || result > this.maxValue) || (value && this.changedValue === '-')) {
          this.random = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
        }
      }, 500)
    },
    clickHandler (e, value) {
      e.stopPropagation()
      this.$emit('click-handler', Number(value))
    },
    changeHandler (value) {
      const regExpValue = `/[${this.tradingData.account.currency}]/g`
      this.changedData = Number(value.replace(/[^\d.-]/ig, ''))
      if (value.replace(/[^a-zа-яё]/gi, '').replace(regExpValue, '')) {
        this.random = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
      }
    },
    blurHandler () {
      this.$emit('blur-handler', Number(this.changedData))
    },
    mouseDownHandler (e, value) {
      if (e.button === 0) {
        this.$emit('mouse-down-handler', Number(value))
      }
      this.$emit('event', e)
    },
    mouseUpHandler (e) {
      if (e.button === 0) {
        this.$emit('mouse-up-handler')
      }
    },
    mouseLeaveHandler () {
      this.$emit('mouse-leave-handler')
    }
  }
}
</script>
