<template>
  <div class="popup-mt_settings">
    <div class="popup-mt_settings-head">
      <span class="popup-mt_settings-head-title" :class="`-${dir}`" v-text="actualAccount.label" />
      <div v-if="actualAccount.is_trader" class="popup-mt_settings-head-badge">
        <span class="popup-mt_settings-head-badge-text" v-text="$t('Доступен для копирования')" />
      </div>
    </div>
    <div class="popup-mt_settings-body">
      <metatrader-main-account source="popup" />
    </div>
    <div class="popup-mt_settings-buttons">
      <b-button class="popup-mt_settings-buttons-button" variant="primary" :class="`-${dir}`" @click="openDeposit" v-text="$t('Пополнение')" />
      <b-button class="popup-mt_settings-buttons-button" variant="outline-primary" :class="`-${dir}`" @click="openWithdrawal" v-text="$t('Вывод')" />
    </div>
  </div>
</template>

<script>
import MetatraderMainAccount from '~/components/metatrader/metatraderMainAccount'
export default {
  name: 'PopupMtSettings',
  components: { MetatraderMainAccount },
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    actualAccount () {
      return this.$store.getters['metatrader/getters/handler/getActualAccount']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    }
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    openDeposit () {
      this.$router.push(`/${this.routePages.locale}/finance/deposit`)
      this.$store.commit('dictionaries/mutations/handler/SAVE_ACTIVE_MAIN_MENU_BUTTON', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: 'finance'
      })
      this.togglePopup(false)
    },
    openWithdrawal () {
      this.$router.push(`/${this.routePages.locale}/finance/withdrawal`)
      this.$store.commit('dictionaries/mutations/handler/SAVE_ACTIVE_MAIN_MENU_BUTTON', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: 'finance'
      })
      this.togglePopup(false)
    }
  }
}
</script>
<style lang="scss">
  .popup-mt_settings {
    display: flex;
    flex-direction: column;

    &-head {
      display: flex;
      flex-direction: column;
      padding: 18px 20px;

      &-title {
        font-size: 20px;
        color: #3B4B68;
        font-weight: 500;

        &.-rtl {
          text-align: right;
        }
      }

      &-badge {
        display: flex;

        &-text {
          padding: 2px 3px;
          background-color: #47BF6F;
          font-size: 13px;
          color: white;
          border-radius: 2px;
          line-height: 1.2;
        }
      }
    }

    &-body {
      padding: 20px;
    }

    &-buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
      padding: 0 20px 20px 20px;

      &-button {

        &.-ltr {
          //
        }

        &.-rtl {
          &:nth-child(2) {
            //margin-right: 10px;
          }
        }
      }
    }
  }
</style>
