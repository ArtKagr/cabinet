<template>
  <div class="main">
    <div class="header">
      <header-languages v-if="isRtlMode" />
      <div :class="isRtlMode ? 'pr-4' : 'pl-4'">
        <lfx-icon-logo-full v-if="isEuAccount" class="main-sidebar-logo" />
        <lfx-icon-logo-litefinance-full v-else class="main-sidebar-logo" />
      </div>
      <header-languages v-if="!isRtlMode" />
    </div>
    <div v-if="windowWidth === 'sm'" class="main-page">
      <Nuxt />
    </div>
    <div v-else class="main-page d-flex flex-column" :style="{ paddingTop: '40px' }">
      <Nuxt />
      <div class="empty-layout-description">
        <div class="empty-layout-description-links">
          <a
            v-for="(link, key) in links"
            :key="key"
            class="empty-layout-description-links-link"
            :href="link.link"
            target="_blank"
            v-text="link.title"
          />
        </div>
        <span class="empty-layout-description-text" v-text="emptyLayoutText.provider" />
        <span class="empty-layout-description-text" v-text="emptyLayoutText.copyright" />
        <span class="empty-layout-description-text" v-text="emptyLayoutText.description" />
        <a class="empty-layout-description-link" :href="`mailto:${emptyLayoutText.email}`" v-text="emptyLayoutText.email" />
      </div>
    </div>
    <popup v-if="isPopupShown" type="popup" />
  </div>
</template>

<script>
import HeaderLanguages from '~/components/header/headerLanguages'
import LfxIconLogoFull from '~/components/header/icons/lfx-icon-logo-full'
import LfxIconLogoLitefinanceFull from '~/components/header/icons/lfx-icon-logo-litefinance-full'
import Popup from '~/components/popup/popup'
export default {
  name: 'Empty',
  components: { Popup, LfxIconLogoLitefinanceFull, HeaderLanguages, LfxIconLogoFull },
  data () {
    return {
      defaultWindowWidth: null,
      currentFormCopy: [],
      modalTradeSuccessSource: 'close'
    }
  },
  computed: {
    isPopupShown () {
      return this.$store.getters['dictionaries/getters/handler/getIsPopupShown']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    isEuAccount () {
      return this.$store.getters['forms/getters/handler/getIsEuCountry']
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    bottomSidebarIsVisible () {
      return this.$store.getters['dictionaries/getters/handler/getBottomSidebarIsVisible']
    },
    emptyLayoutText () {
      return this.$store.getters['dictionaries/getters/handler/getEmptyLayoutText']
    },
    links () {
      const result = [
        { title: this.$t('Условия использования'), link: `https://www.litefinance.org/${this.routePages.locale}/termsofuse/` },
        { title: this.$t('Конфиденциальность'), link: `https://www.litefinance.org/${this.routePages.locale}/privacy/` },
        { title: this.$t('Политика AML'), link: `https://www.litefinance.org/${this.routePages.locale}/amlpolicy/` },
        { title: this.$t('Предупреждение о рисках'), link: `https://www.litefinance.org/${this.routePages.locale}/riskdisclosure/` },
        { title: this.$t('Оставить отзывы'), link: `https://www.litefinance.org/${this.routePages.locale}/feedback/` }
      ]
      return this.isRtlMode ? result.reverse() : result
    }
  },
  watch: {
    defaultWindowWidth (newValue) {
      this.$store.commit('dictionaries/mutations/handler/SET_CURRENT_WINDOW_WIDTH', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: newValue
      })
    },
    $route: {
      handler (newValue) {
        this.$store.commit('dictionaries/mutations/handler/SAVE_ROUTE', {
          rootData: this.$store.state.dictionaries.state.handler,
          data: {
            path: newValue.path,
            query: newValue.query
          }
        })
      },
      deep: true
    }
  },
  created () {
    this.$store.commit('dictionaries/mutations/handler/SAVE_ROUTE', {
      rootData: this.$store.state.dictionaries.state.handler,
      data: {
        path: this.$route.path,
        query: this.$route.query
      }
    })
    this.$axios.$get(`https://api.liteforex.com/js/locales/cabinet-${this.routePages.locale}.json`)
      .then((response) => {
        this.$i18n.setLocaleMessage(this.routePages.locale, response)
      })
    this.$store.dispatch('dictionaries/actions/handler/fetchEmptyLayoutText')
  },
  mounted () {
    this.$store.commit('dictionaries/mutations/handler/SET_CURRENT_WINDOW_WIDTH', {
      rootData: this.$store.state.dictionaries.state.handler,
      data: window.innerWidth
    })
    window.onresize = () => {
      this.defaultWindowWidth = window.innerWidth
    }
  }
}
</script>
<style lang="scss">
  .empty-layout-description {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: auto;

    &-links {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      margin-top: 10px;

      &-link {
        font-size: 14px;
        color: #3498db;
        cursor: pointer;
        margin: 0 15px;

        &:hover {
          color: #3498db;
        }
      }
    }

    &-text {
      margin-bottom: 7px;
      font-size: 14px;
      color: #8e9aac;
      text-align: center;
    }

    &-link {
      margin-bottom: 7px;
      font-size: 14px;
      color: #3498db;
      cursor: pointer;
      text-align: center;

      &:hover {
        color: #3498db;
      }
    }
  }
</style>
