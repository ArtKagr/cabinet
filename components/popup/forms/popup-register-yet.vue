<template>
  <div class="popup-register_yet">
    <span class="popup-register_yet-title" :class="`-${dir}`" v-text="$t('Уже зарегистрированы?')" />
    <div class="popup-register_yet-container">
      <b-button class="popup-register_yet-container-button" :class="`-${dir}`" variant="dark-primary" @click="openLogin" v-text="$t('Войти')" />
      <b-button class="popup-register_yet-container-button" :class="`-${dir}`" variant="primary" @click="createDemo" v-text="$t('Демо-режим')" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupRegisterYet',
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    fetchForm (formTitle) {
      this.$store.dispatch('forms/actions/handler/fetchForm', formTitle)
    },
    demoCreate () {
      this.$store.dispatch('dictionaries/actions/auth/demoCreate')
    },
    openLogin () {
      this.togglePopup(false)
      this.fetchForm('login')
    },
    createDemo () {
      this.togglePopup(false)
      this.demoCreate()
    }
  }
}
</script>
<style lang="scss">
  .popup-register_yet {
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
      align-items: center;
      padding: 0 30px 30px;
      width: 100%;

      &-button {
        width: 50%;
        font-size: 16px !important;

        &.-ltr {
          &:nth-child(1) {
            margin-right: 10px;
          }
        }

        &.-rtl {
          &:nth-child(2) {
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
