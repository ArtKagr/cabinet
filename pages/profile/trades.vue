<template>
  <div class="profile-page-trades">
    <table-profile-trades :items="portfolio" :fields="tableFields" />
<!--    <lfx-table-trades :items="portfolio" />-->
  </div>
</template>

<script>
import TableProfileTrades from '~/components/tables/profile-trades/table-profile-trades'
export default {
  name: 'Trades',
  components: { TableProfileTrades },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Профиль трейдера')} / ${this.$t('Открытые сделки')}`)
    }
  },
  computed: {
    trades () {
      return this.$store.getters['trading/getters/calculations/getTradesInvestments']
    },
    portfolio () {
      return this.$store.getters['trading/getters/trading/getAccountPortfolio']
    },
    tableFields () {
      return {
        symbol: `${this.$t('Инструмент')}|${this.$t('Трейдер')}`,
        cmd: this.$t('Тип'),
        volume: this.$t('Объем сделки'),
        open_time: this.$t('Дата и время открытия'),
        open_price: this.$t('Точка входа'),
        current_level: this.$t('Текущий уровень'),
        sl: this.$t('Stop loss'),
        tp: this.$t('Take profit'),
        changedProfit: this.$t('Прибыль'),
        buttons: null,
        horizontal_dots: null
      }
    }
  }
}
</script>
