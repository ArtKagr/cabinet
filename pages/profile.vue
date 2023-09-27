<template>
  <div class="profile">
    <lfx-menu-links
      :title="$t('Мой профиль')"
      :menu="menu"
      source="profile"
    />
    <nuxt-child class="profile-page" />
  </div>
</template>

<script>
import LfxMenuLinks from '~/components/_aux/lfx-menu-links'
export default {
  name: 'Profile',
  components: { LfxMenuLinks },
  middleware: ['auth'],
  data () {
    return {
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false,
        imagesLoaded: true,
        contain: true,
        cellAlign: this.isRtlMode ? 'right' : 'left',
        rightToLeft: this.isRtlMode
      }
    }
  },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Обо мне')}`)
    }
  },
  computed: {
    menu () {
      // Меню в профиле
      return [
        { title: this.$t('Обо мне'), route: null, flag: 'about' },
        { title: this.$t('Портфель'), route: 'trades', flag: 'trades' },
        { title: this.$t('История торговли'), route: 'trades-history', flag: 'trades-history' },
        { title: this.$t('График доходности'), route: 'chart', flag: 'chart' },
        { title: this.$t('Копируют меня'), route: 'copiers', flag: 'copiers' },
        { title: this.$t('Копировали меня'), route: 'copiers-history', flag: 'copiers-history' },
        { title: this.$t('Партнеры копирующих'), route: 'copiers-partner', flag: 'copiers-partner' },
        { title: this.$t('Приведи друга'), route: 'bringafriend', flag: 'bringafriend' },
        { title: this.$t('Уведомления'), route: 'notifications', flag: 'notifications' },
        { title: this.$t('Безопасность'), route: 'security', flag: 'security' },
        { title: this.$t('Верификация'), route: 'verification', flag: 'verification' }
      ].filter((item) => {
        if (this.user.is_trader) {
          return true
        } else {
          return !['copiers', 'copiers-history', 'copiers-partner'].includes(item.flag)
        }
      })
    },
    activeMenuItem () {
      return this.$store.getters['dictionaries/getters/handler/getActiveMenuItem']
    },
    activeMainMenuButton () {
      return this.$store.getters['dictionaries/getters/handler/getActiveMainMenuButton']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    user () {
      return this.$store.getters['dictionaries/getters/user/getUser']
    }
  },
  async created () {
    await this.$store.dispatch('metatrader/actions/handler/fetchMetatraderData')
    this.$store.commit('dictionaries/mutations/handler/CLEAR_ACTIVE_FORM', { rootData: this.$store.state.dictionaries.state.handler })
    this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_LINKS_ITEM', {
      rootData: this.$store.state.dictionaries.state.handler,
      data: this.routePages.parent ? this.routePages.current : 'about'
    })
    if (this.routePages.parent) {
      await this.$router.push(`/${this.routePages.locale}/profile/${this.routePages.current}`)
    } else {
      await this.$router.push(`/${this.routePages.locale}/profile`)
    }
  }
}
</script>
