<template>
  <div class="popup-finance-cancel">
    <div class="popup-finance-cancel-head">
      <span class="popup-finance-cancel-head-title" :class="`-${dir}`" v-text="$t('Отмена вывода')" />
    </div>
    <div class="popup-finance-cancel-body">
      <span class="popup-finance-cancel-body-text" :class="`-${dir}`" v-text="$t('Вы действительно хотите отменить вывод?')" />
      <div class="popup-finance-cancel-body-buttons">
        <b-button class="popup-finance-cancel-body-buttons-button" :class="`-${dir}`" variant="outline-primary" @click="togglePopup(false)" v-text="$t('Нет')" />
        <b-button class="popup-finance-cancel-body-buttons-button" :class="`-${dir}`" variant="primary" @click="cancelWithdrawal" v-text="$t('Да')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupFinanceCancel',
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
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
    cancelWithdrawal () {
      this.$store.dispatch('finance/actions/handler/cancelWithdrawal')
      this.togglePopup(false)
    }
  }
}
</script>
<style lang="scss">
  .popup-finance-cancel {

    &-head {
      display: flex;
      align-items: center;
      padding: 18px 20px;

      &-title {
        font-size: 20px;
        color: #3B4B68;
        line-height: 1;

        &.-rtl {
          text-align: right;
        }
      }
    }

    &-body {
      display: flex;
      flex-direction: column;
      padding: 0 20px 20px 20px;

      &-text {
        font-size: 13px;
        color: #8e9aac;
        padding-bottom: 18px;

        &.-rtl {
          text-align: right;
        }
      }

      &-buttons {
        display: flex;
        align-items: center;
        width: 100%;

        &-button {
          width: 50%;

          &.-ltr {
            &:first-child {
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
  }
</style>
