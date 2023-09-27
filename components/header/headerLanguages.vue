<template>
  <div
    :class="fieldType === 'dropdown' ? 'authorization-modal-container' : `header-languages -${dir}${isEmptyLayout ? '-empty_layout' : ''}`"
    @click="toggleDropdown"
  >
    <b-dd
      ref="languages"
      :lazy="true"
      :toggle-class="fieldType === 'dropdown' ? 'lfx-forms-dropdown-container' : 'header-languages-dropdown'"
      variant="link"
      boundary="viewport"
      :offset="isRtlMode ? '-27' : '-180'"
      @shown="isLanguagesListOpened = true"
      @hidden="isLanguagesListOpened = false"
    >
      <template #button-content :class="fieldType === 'dropdown' ? '' : 'header-languages-dropdown-head'">
        <div :class="fieldType === 'dropdown' ? 'authorization-modal-container-dropdown-items-item-logo -popup' : `header-languages-dropdown-head-logo -${dir}${isEmptyLayout ? '-empty_layout_logo' : ''}`">
          <header-languages-logo :current-logo="routePages.locale" />
        </div>
        <div class="d-flex align-items-center justify-content-between w-100">
          <span
            v-if="routePages.locale"
            :class="fieldType === 'dropdown' ? `lfx-forms-dropdown-container-title-text w-100 text-left ${isRtlMode ? 'mr-2' : 'ml-2'}` : 'header-languages-dropdown-head-title text-transform-none'"
            v-text="currentLanguage && currentLanguage.title ? currentLanguage.title : routePages.locale"
          />
          <i class="header-languages-dropdown-head-chevron">
            <lfx-icon-chevron-down :class="{ 'rotate_180': isLanguagesListOpened }" />
          </i>
        </div>
      </template>
      <div class="header-languages-dropdown-items">
        <b-dd-item-btn
          v-for="language in languagesList"
          :key="language.flag"
          :active="language.flag === routePages.locale"
          :button-class="`header-languages-dropdown-items-item -${dir}${isEmptyLayout ? '-empty_layout' : ''}`"
          @click="setCurrentLanguage(language)"
        >
          <nuxt-link class="header-languages-dropdown-items-item-container" :to="switchLocalePath(language.flag)">
            <div class="header-languages-dropdown-items-item-container-logo">
              <header-languages-logo :current-logo="language.flag" />
            </div>
            <span
              class="header-languages-dropdown-items-item-container-title"
              :class="`-${dir}${isEmptyLayout ? '-empty_layout' : ''}`"
              v-text="language.title"
            />
          </nuxt-link>
        </b-dd-item-btn>
      </div>
    </b-dd>
  </div>
</template>
<script>
import HeaderLanguagesLogo from '~/components/header/headerLanguagesLogo'
import LfxIconChevronDown from '~/components/icons/lfx-icon-chevron-down'
export default {
  name: 'HeaderLanguages',
  components: { LfxIconChevronDown, HeaderLanguagesLogo },
  props: {
    fieldType: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isLanguagesListOpened: false
    }
  },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isEmptyLayout () {
      return ['registration', 'login', 'reset-password', 'confirm-email'].includes(this.routePages.current)
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    languagesList () {
      return this.$store.getters['dictionaries/getters/handler/getLanguages']
    },
    currentLanguage () {
      return this.languagesList.find(language => language.flag === this.$store.getters['dictionaries/getters/handler/getRoutePages'].locale)
    }
  },
  methods: {
    toggleDropdown () {
      const dropdown = this.$refs.languages
      this.isLanguagesListOpened = !this.isLanguagesListOpened
      this.isLanguagesListOpened ? dropdown.show() : dropdown.hide()
    },
    setCurrentLanguage (language) {
      this.$store.commit('dictionaries/mutations/handler/SET_CURRENT_LANGUAGE', {
        rootData: this.$store.state.dictionaries.state.language,
        data: language
      })

      this.fetchTranslates(language.flag)

      if (this.isEmptyLayout) {
        this.$store.dispatch('dictionaries/actions/handler/fetchEmptyLayoutText')
      }
    },
    fetchTranslates (locale) {
      if (locale !== 'en') {
        this.$axios.$get(`https://api.liteforex.com/js/locales/cabinet-${locale}.json`)
          .then((response) => {
            this.$i18n.setLocaleMessage(locale, response)
          })
      }
    }
  }
}
</script>
