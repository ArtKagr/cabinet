<template>
  <div class="d-flex flex-column">
    <lfx-menu-links v-if="!routePages.second" :menu="menu" :title="$t('Обучение')" source="education" />
    <nuxt-child />
  </div>
</template>

<script>
import LfxMenuLinks from '~/components/_aux/lfx-menu-links'
export default {
  name: 'Education',
  components: { LfxMenuLinks },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Обучение')}`)
    }
  },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    menu () {
      // Меню страницы "Обучение"
      return [
        { title: this.$t('Уроки'), route: 'lessons', flag: 'lessons' },
        { title: this.$t('Вебинары'), route: 'webinars', flag: 'webinars' },
        { title: this.$t('Глоссарий'), route: 'glossary', flag: 'glossary' },
        { title: this.$t('FAQ'), route: 'faq', flag: 'faq' }
      ]
    },
    activeMenuItem () {
      return this.$store.getters['dictionaries/getters/handler/getActiveMenuItem']
    }
  }
}
</script>
