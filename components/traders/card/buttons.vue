<template>
  <div class="trading-page-card-buttons" :class="`-${source}`">
    <div class="d-flex justify-content-between w-100">
      <field-numeric
        class="popup-trades-change-body-amount-input -trader_card"
        :value="cardVolume"
        :label="account.currency"
        :counter="10"
        :min="10"
        :max="Number.MAX_SAFE_INTEGER"
        :digits="0"
        @change="setValue"
      />
      <b-button :class="[isRtlMode ? 'mr-2' : 'ml-2', source === 'table' ? 'w-50' : 'w-40']" variant="primary" @click="copyAction" v-text="$t('Копировать')" />
    </div>
  </div>
</template>

<script>
import FieldNumeric from '~/components/modal/fields/field-numeric'
export default {
  name: 'Buttons',
  components: {
    FieldNumeric
  },
  props: {
    source: {
      type: String,
      default: null
    },
    card: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      cardVolume: 100,
      counterId: null
    }
  },
  computed: {
    isGuest () {
      return this.$store.getters['dictionaries/getters/user/getIsGuest']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    traderCardSettings () {
      return this.$store.getters['traders/getters/handler/getTraderCardSettings']
    }
  },
  methods: {
    setValue (value) {
      this.cardVolume = value
    },
    copyAction () {
      if (this.isGuest) {
        this.$store.dispatch('dictionaries/actions/handler/showPopup', 'demo-real')
      } else {
        this.$store.dispatch('trading/actions/handler/copyAction', {
          id: this.card.user_id,
          amount: this.cardVolume
        })
      }
    }
  }
}
</script>
