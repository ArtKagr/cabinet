<template>
  <div class="popup-reg_war">
    <span class="popup-reg_war-title" :class="`-${dir}`" v-text="currentCountry" />
    <div class="popup-reg_war-container">
      <span
        v-if="isEuCountry"
        class="popup-reg_war-container-description"
        :class="`-${dir}`"
        v-text="$t('В вашей стране брокерские услуги оказывает компания Liteforex (Europe) Limited Company (регулируется лицензией CySEC №093/08).')"
      />
      <span
        v-else
        class="popup-reg_war-container-description"
        :class="`-${dir}`"
        v-text="$t('В вашей стране брокерские услуги оказывает компания LiteFinance Global LLC (зарегистрирована в государстве Сент-Винсент и Гренадины как общество с ограниченной ответственностью под номером 931 LLC 2021).')"
      />
      <b-button class="popup-reg_war-container-button" variant="primary" @click="closePopup" v-text="$t('Продолжить регистрацию')" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupRegistrationWarning',
  computed: {
    form () {
      return this.$store.getters['forms/getters/handler/getForm']
    },
    isEuCountry () {
      return this.$store.getters['forms/getters/handler/getIsEuCountry']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    countryValue () {
      const result = this.form.find(field => field.attribute === 'country')
      return result ? result.value : null
    },
    countryValues () {
      const result = this.form.find(field => field.attribute === 'country')
      return result ? result.values : null
    },
    currentCountry () {
      const result = this.countryValue && this.countryValues ? this.countryValues.find(item => item.value === this.countryValue) : null

      return result && result.text ? result.text : 'Country'
    }
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    closePopup () {
      this.togglePopup(false)
    }
  }
}
</script>
<style lang="scss">
  .popup-reg_war {
    display: flex;
    flex-direction: column;

    &-title {
      padding: 28px 30px;
      font-size: 20px;
      color: #3B4B68;
      line-height: 1;

      &.-rtl {
        text-align: right;
      }
    }

    &-container {
      display: flex;
      flex-direction: column;
      padding: 0 30px 30px 30px;

      &-description {
        font-size: 13px;
        color: #8e9aac;
        margin-bottom: 43px;

        &.-rtl {
          text-align: right;
        }
      }

      &-button {
        font-size: 16px !important;
        text-transform: uppercase !important;
      }
    }
  }
</style>
