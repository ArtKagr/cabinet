<template>
  <div class="finance" :class="{ '-card': activeDepositsTab === 'card' }">
    <lfx-menu-links :menu="menu" source="finance" :title="$t('Финансы')" />
    <nuxt-child />
  </div>
</template>

<script>
import LfxMenuLinks from '~/components/_aux/lfx-menu-links'
export default {
  name: 'Finance',
  components: { LfxMenuLinks },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Финансы')}`)
    }
  },
  computed: {
    activeDepositsTab () {
      return this.$store.getters['finance/getters/handler/getActiveDepositsTab']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    user () {
      return this.$store.getters['dictionaries/getters/user/getUser']
    },
    menu () {
      // Меню страницы Finance
      return [
        { title: this.$t('Пополнение'), route: 'deposit', flag: 'deposit' },
        { title: this.$t('Вывод'), route: 'withdrawal', flag: 'withdrawal' },
        { title: this.$t('Партнерский перевод'), route: 'affiliate-transfer', flag: 'affiliate-transfer' },
        { title: this.$t('Кошелек'), route: 'wallet', flag: 'wallet' },
        { title: this.$t('История переводов'), route: null, flag: 'history' }
      ].filter((item) => {
        if (item.flag === 'affiliate-transfer' && !this.user.is_affiliate_transfer) {
          return false
        }

        return true
      })
    }
  }
}
</script>
