<template>
  <div :class="`d-flex flex-column bg-white px-3 pt-3 pb-4 border-light-secondary add_container-${dir}`">
    <span class="text-dark-primary-15 mb-3" :class="isRtlMode ? 'text-right mr-2' : 'ml-2'" v-text="$t('Дополнительная информация')" />
    <div class="d-flex flex-column mb-3 ml-2">
      <span class="item-title" :class="`-${dir}`" v-text="instrument.description" />
      <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Полное название')" />
    </div>
    <div class="add_info-columns">
      <div class="d-flex flex-column" :class="isRtlMode ? 'ml-4 mr-2' : 'mr-4 ml-2'">
        <span class="item-title" :class="`-${dir}`" v-text="currentCategory" />
        <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Категория')" />
      </div>
      <div class="d-flex flex-column" :class="isRtlMode ? 'ml-4 mr-2' : 'mr-4 ml-2'">
        <span class="item-title" :class="`-${dir}`" v-text="instrument.currency_profit" />
        <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Валюта котировки')" />
      </div>
      <div class="d-flex flex-column" :class="isRtlMode ? 'ml-4 mr-2' : 'mr-4 ml-2'">
        <span class="item-title" :class="`-${dir}`" v-text="`1:${currentLeverage}`" />
        <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Плечо инструмента')" />
      </div>
      <div v-if="instrument.margin_mode !== 0 && instrument.margin_mode !== 4" class="d-flex flex-column" :class="isRtlMode ? 'ml-4 mr-2' : 'mr-4 ml-2'">
        <span class="item-title" :class="`-${dir}`" v-text="`${instrument.margin_rate * 100}%`" />
        <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Процент маржи')" />
      </div>
      <div class="d-flex flex-column" :class="isRtlMode ? 'ml-4 mr-2' : 'mr-4 ml-2'">
        <span class="item-title" :class="`-${dir}`" v-text="`${instrument.contract_size} ${originalSymbolName}`" />
        <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Размер 1 лота')" />
      </div>
      <div class="d-flex flex-column" :class="isRtlMode ? 'ml-4 mr-2' : 'mr-4 ml-2'">
        <span class="item-title" :class="`-${dir}`" v-text="$t('{amount} (лоты)', { amount: instrument.lot_min || 0 })" />
        <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Мин. объем')" />
      </div>
      <div class="d-flex flex-column" :class="isRtlMode ? 'ml-4 mr-2' : 'mr-4 ml-2'">
        <span class="item-title" :class="`-${dir}`" v-text="$t('{amount} (лоты)', { amount: instrument.lot_max || 0 })" />
        <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Макс. объем')" />
      </div>
      <div class="d-flex flex-column" :class="isRtlMode ? 'ml-4 mr-2' : 'mr-4 ml-2'">
        <span class="item-title" :class="`-${dir}`" v-text="$t('{amount} (лоты)', { amount: instrument.lot_step || 0 })" />
        <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Шаг объема')" />
      </div>
      <div class="d-flex flex-column" :class="isRtlMode ? 'ml-4 mr-2' : 'mr-4 ml-2'">
        <span class="item-title" :class="`-${dir}`" v-text="`${pointCost} ${account.currency}`" />
        <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Цена пункта')" />
      </div>
      <div class="d-flex flex-column" :class="isRtlMode ? 'ml-4 mr-2' : 'mr-4 ml-2'">
        <span class="item-title" :class="`-${dir}`" v-text="`${instrument.swap_long} ${swapType}`" />
        <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Своп на покупку')" />
      </div>
      <div class="d-flex flex-column" :class="isRtlMode ? 'ml-4 mr-2' : 'mr-4 ml-2'">
        <span class="item-title" :class="`-${dir}`" v-text="`${instrument.swap_short} ${swapType}`" />
        <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('Своп на продажу')" />
      </div>
      <div v-if="routePages.second !== 'crypto'" class="d-flex flex-column" :class="isRtlMode ? 'ml-4 mr-2' : 'mr-4 ml-2'">
        <span class="item-title" :class="`-${dir}`" v-text="getSwap3Day" />
        <span class="text-secondary-10 text-uppercase" :class="isRtlMode ? 'text-right' : ''" v-text="$t('День тройного свопа')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Additional',
  computed: {
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    currentCategory () {
      if (this.instrument && this.instrument.category) {
        return this.categories.find(item => item.category === this.instrument.category).title
      } else {
        return null
      }
    },
    instrument () {
      return this.$store.getters['trading/getters/trading/getInstrumentFull']
    },
    categories () {
      return [
        { title: this.$t('Валюты'), route: 'currency', flag: 'CATEGORY_CURRENCY', category: 1 },
        { title: this.$t('Криптовалюты'), route: 'crypto', flag: 'CATEGORY_CRYPTO', category: 2 },
        { title: this.$t('Сырье'), route: 'commodities', flag: 'CATEGORY_COMMODITIES', category: 3 },
        { title: this.$t('Акции {exchange_name}', { exchange_name: 'NYSE' }), route: 'cfd-nyse', flag: 'CATEGORY_CFD_NYSE', category: 5 },
        { title: this.$t('Акции {exchange_name}', { exchange_name: 'NASDAQ' }), route: 'cfd-nasdaq', flag: 'CATEGORY_CFD_NASDAQ', category: 6 },
        { title: this.$t('Акции {exchange_name}', { exchange_name: 'EU' }), route: 'cfd-epa', flag: 'cfd-epa', category: 8 },
        { title: this.$t('Биржевые индексы'), route: 'stock-index', flag: 'CATEGORY_INDEX', category: 7 }
      ]
    },
    week () {
      return [
        { day: 1, title: this.$t('Понедельник'), index: 1 },
        { day: 2, title: this.$t('Вторник'), index: 2 },
        { day: 3, title: this.$t('Среда'), index: 3 },
        { day: 4, title: this.$t('Четверг'), index: 4 },
        { day: 5, title: this.$t('Пятница'), index: 5 },
        { day: 6, title: this.$t('Суббота'), index: 6 },
        { day: 7, title: this.$t('Воскресенье'), index: 0 }
      ]
    },
    currentLeverage () {
      if (this.instrument) {
        if (this.instrument.margin_mode === 0 || this.instrument.margin_mode === 4) {
          return this.account.leverage
        } else {
          return 1 / this.instrument.margin_rate
        }
      } else {
        return 0
      }
    },
    originalSymbolName () {
      switch (this.instrument.category) {
        case 1:
        case 2:
        case 3:
          return this.instrument.symbol_original.split('').filter((item, index) => [0, 1, 2].includes(index)).join('')
        default:
          return this.instrument.symbol_original
      }
    },
    pointCost () {
      return this.$instrument.getOnePointCost(this.account.server, this.instrument, 1, this.account.currency)
    },
    swapType () {
      switch (this.instrument.swap_mode) {
        case 1:
          return this.$t('пункта')
        case 2:
          return this.instrument.currency_profit
        case 3:
          return this.instrument.currency_margin
        case 5:
          return '%'
        default:
          return ''
      }
    },
    getSwap3Day () {
      if (this.instrument && this.instrument.swap_3day) {
        return this.week.find(day => day.index === this.instrument.swap_3day).title
      } else {
        return ''
      }
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  watch: {
    'instrument.symbol_original' (newValue) {
      if (newValue) {
        this.$store.dispatch('trading/actions/handler/fetchTradingInstrument', {
          server: this.account.server,
          group: this.account.group,
          symbol: this.instrument.symbol_original
        })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
  .add_container {

    @media screen and (max-width: 1600px) {

      //&-ltr {
      //  margin-right: 10px;
      //}
      //
      //&-rtl {
      //  margin-left: 10px;
      //}
    }

    @media screen and (max-width: 768px) {
      margin-bottom: 50px;
    }
  }

  .item {

    &-title {
      color: #8e9aac;
      font-size: 18px;

      &.-rtl {
        text-align: right;
      }

      @media screen and (max-width: 1600px) {
        font-size: 16px;
      }
    }
  }
</style>
