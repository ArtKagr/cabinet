<template>
  <div class="partners-campaigns">
    <span
      class="partners-campaigns-head-title mb-3"
      :class="isRtlMode ? 'text-right' : ''"
      v-text="$t('Калькулятор для расчета партнерской комиссии')"
    />
    <div class="partners-campaigns-calculator">
      <div class="partners-campaigns-calculator-head">
        <span class="partners-campaigns-calculator-head-title" v-text="'REV.SHARE'" />
      </div>
      <div class="partners-campaigns-calculator-body">
        <form-partners-calculator :class="windowWidth === 'sm' ? 'w-100' : 'w-50'" />
        <div
          class="d-flex flex-column"
          :class="windowWidth === 'sm' ? 'w-100' : 'w-50'"
          :style="hintStyle"
        >
          <div class="partners-campaigns-calculator-body-item">
            <bdi class="text-dark-primary-32 font-weight-700" :class="isRtlMode ? 'text-right' : ''" v-text="`${calculatorData.commission}%`" />
            <span class="text-secondary-12" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Комиссия')" />
          </div>
          <div class="partners-campaigns-calculator-body-item">
            <bdi class="text-dark-primary-32 font-weight-700" :class="isRtlMode ? 'text-right' : ''" v-text="calculatorData.award" />
            <span class="text-secondary-12" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Вознаграждение')" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import form from '~/mixins/form'
import FormPartnersCalculator from '~/components/modal/forms/form-partners-calculator'
export default {
  name: 'AffiliateCalculator',
  components: { FormPartnersCalculator },
  mixins: [form],
  data () {
    return {
      activeType: null,
      types: [],
      activeSymbol: null,
      symbols: [],
      activeVolume: null,
      dropdownTypesOpened: false,
      dropdownSymbolsOpened: false
    }
  },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Калькулятор для расчета партнерской комиссии')}`)
    }
  },
  computed: {
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    calculatorData () {
      return this.$store.getters['partners/getters/handler/getAffiliateCalculator']
    },
    hintStyle () {
      if (this.windowWidth === 'sm') {
        return {
          marginTop: '30px'
        }
      }

      if (this.isRtlMode) {
        return {
          marginRight: '8.3%'
        }
      }

      return {
        marginLeft: '8.3%'
      }
    }
  },
  created () {
    this.fetchForm()
  },
  methods: {
    fetchForm () {
      this.$store.dispatch('forms/actions/handler/fetchForm', 'affiliateCalculator')
    },
    setActiveType (item) {
      this.activeType = item
    },
    setActiveSymbol (item) {
      this.activeSymbol = item
    },
    calculate () {
      this.$store.dispatch('partners/actions/handler/updatePartnerCalculator', {
        type: this.activeType,
        symbol: this.activeSymbol,
        volume: Number(this.activeVolume)
      })
    }
  }
}
</script>
