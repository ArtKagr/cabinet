<template>
  <div class="popup-language">
    <div class="popup-language-head">
      <span class="popup-language-head-title" v-text="$t('Язык')" />
    </div>
    <div class="popup-language-body">
      <field-select
        v-model="language"
        :is-countries="true"
        :is-search-hidden="true"
        :is-lang-countries="true"
        :values="changedLanguages"
        @change="setLanguage"
      />
      <b-button class="popup-language-body-button" variant="primary" @click="setCurrentLanguage" v-text="$t('Сохранить')" />
    </div>
  </div>
</template>

<script>
import FieldSelect from '~/components/modal/fields/field-select'
export default {
  name: 'PopupLanguage',
  components: { FieldSelect },
  data () {
    return {
      language: null
    }
  },
  computed: {
    languages () {
      return this.$store.getters['dictionaries/getters/handler/getLanguages']
    },
    changedLanguages () {
      return this.languages.map(item => ({ value: item.flag, text: item.title }))
    }
  },
  created () {
    this.language = this.routePages.locale
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    setLanguage (flag) {
      this.language = flag
    },
    setCurrentLanguage () {
      const language = this.languages.find(item => item.flag === this.language)

      this.$store.commit('dictionaries/mutations/handler/SET_CURRENT_LANGUAGE', {
        rootData: this.$store.state.dictionaries.state.language,
        data: language
      })

      this.fetchTranslates(language.flag)

      this.$router.push(`/${language.flag}/profile/verification`)
      this.togglePopup(false)
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
<style lang="scss">
  .popup-language {
    display: flex;
    flex-direction: column;

    &-head {
      display: flex;
      align-items: center;
      padding: 18px 20px;
      border-bottom: 1px solid #d9dce1;

      &-title {
        font-size: 20px;
        color: #3B4B68;
      }
    }

    &-body {
      padding: 20px 30px 30px;

      &-button {
        width: 100%;
        margin-top: 40px;
      }
    }
  }
</style>
