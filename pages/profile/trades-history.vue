<template>
  <div class="profile-page-trades -history">
    <lfx-table-trades-history :items="tradesHistory" />
  </div>
</template>

<script>
import LfxTableTradesHistory from '~/components/tables/lfx-table-trades-history'
export default {
  name: 'TradesHistory',
  components: { LfxTableTradesHistory },
  data () {
    return {
      page: null
    }
  },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('История торговли')}`)
    }
  },
  computed: {
    tradesHistory () {
      return this.$store.getters['profile/getters/handler/getTradesHistory']
    },
    tradesHistoryPage () {
      return this.$store.getters['profile/getters/handler/getTradesHistoryPage']
    },
    scrollBottom () {
      return this.$store.getters['dictionaries/getters/handler/getScrollBottom']
    }
  },
  watch: {
    async scrollBottom (newValue) {
      if (newValue === 0) {
        await this.$store.dispatch('profile/actions/handler/fetchProfileTradesHistory', this.tradesHistoryPage + 1)
      }
    }
  },
  mounted () {
    this.$store.dispatch('profile/actions/handler/fetchProfileTradesHistory')
    this.page = document.getElementById('main-page')
  }
}
</script>
