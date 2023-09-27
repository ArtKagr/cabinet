<template>
  <div class="popup-finance-data">
    <div class="popup-finance-data-head">
      <span class="popup-finance-data-head-title" v-text="$t('Пополнение через {method}', { method: info.name })" />
    </div>
    <div class="popup-finance-data-container">
      <div class="popup-finance-data-payload">
        <span class="popup-finance-data-payload-text" :class="`-${dir}`" v-html="$t('<strong>{currency}</strong> адрес для депозита <strong>{address}</strong>', { currency: info.name, address: depositData.address })" />
        <span class="popup-finance-data-payload-text" :class="`-${dir}`" v-html="$t('Сумма для отрпавки <strong>{amount}</strong>', { amount: depositData.amount })" />
      </div>
      <img class="popup-finance-data-qr_code" :src="depositData.qr_code" alt>
    </div>
    <div class="popup-finance-data-info">
      <div class="popup-finance-data-info-warning">
        <div class="popup-finance-data-info-warning-icon" :class="`-${dir}`">
          <lfx-icon-info />
        </div>
        <span
          class="popup-finance-data-info-warning-text"
          :class="`-${dir}`"
          v-text="$t('Данный адрес сформирован только для этого депозита. Не совершайте повторные депозиты на этот же адрес. Получите новый через данную форму.')"
        />
      </div>
      <div class="popup-finance-data-info-hints">
        <span class="popup-finance-data-info-hints-hint" :class="`-${dir}`" v-text="$t('Транзакция должна получить как минимум 6 подтверждений в сети.')" />
        <span class="popup-finance-data-info-hints-hint" :class="`-${dir}`" v-text="$t('Депозит будет сконвертирован по курсу на момент его зачисления.')" />
        <span class="popup-finance-data-info-hints-hint" :class="`-${dir}`" v-html="$t('Отправляйте только <strong>{currency}</strong> на указанный адрес, другая валюта отправленная на этот адрес будет утеряна.', { currency: 'USD' })" />
      </div>
    </div>
    <div class="popup-finance-data-content">
      <div class="popup-finance-data-content-buttons">
        <b-button class="popup-finance-data-content-buttons-button" :class="`-${dir}`" variant="outline-primary" @click="editDeposit" v-text="$t('Редактировать')" />
        <b-button class="popup-finance-data-content-buttons-button" :class="`-${dir}`" variant="primary" @click="confirmDeposit" v-text="$t('Подтвердить')" />
      </div>
      <div class="popup-finance-data-content-secure">
        <div class="popup-finance-data-content-secure-icon" :class="`-${dir}`">
          <lfx-icon-lock />
        </div>
        <span class="popup-finance-data-content-secure-text" v-text="'HTTP and SSL secure'" />
      </div>
    </div>
  </div>
</template>

<script>
import LfxIconLock from '~/components/icons/lfx-icon-lock'
import LfxIconInfo from '~/components/icons/lfx-icon-info'
export default {
  name: 'PopupFinanceDepositCrypto',
  components: { LfxIconInfo, LfxIconLock },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    depositRequest () {
      return this.$store.getters['finance/getters/handler/getDepositRequest']
    },
    info () {
      return this.$store.getters['finance/getters/handler/getDepositInfo']
    },
    infoResponse () {
      return this.$store.getters['finance/getters/handler/getDepositInfoResponse']
    },
    depositData () {
      return this.$store.getters['finance/getters/handler/getDepositDataResponse']
    }
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    toggleModal (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_MODAL', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: !!value
      })
    },
    editDeposit () {
      if (['depositRequest', 'depositRequestModal'].includes(this.formTitle)) {
        this.togglePopup(false)
      }
    },
    confirmDeposit () {
      if (['depositRequest', 'depositRequestModal'].includes(this.formTitle)) {
        this.togglePopup(false)
        this.toggleModal(false)
      }
    }
  }
}
</script>
<style lang="scss">
  .popup-finance-data {
    display: flex;
    flex-direction: column;

    &-head {
      display: flex;
      align-items: center;
      padding: 18px 20px;

      &-title {
        font-size: 20px;
        color: #3B4B68;
      }
    }

    &-container {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;

      &-bank {
        display: flex;
        width: 100%;

        &-container {
          display: flex;
          flex-direction: column;

          &-column {
            display: flex;
            flex-direction: column;

            &-title {
              font-size: 14px;
              color: #8e9aac;

              &.-rtl {
                text-align: right;
              }
            }

            &-row {
              display: flex;
              color: #424b59;
              border-bottom: 1px solid #b8dbf2;

              &:last-child {
                border-bottom: none;
              }

              &-title {
                width: 50%;
                padding: 13px 13px 13px 0;
                font-size: 11px;

                &.-rtl {
                  text-align: right;
                  padding: 13px 0 13px 13px;
                }
              }

              &-value {
                width: 50%;
                padding: 13px;
                font-size: 13px;

                &.-rtl {
                  text-align: right;
                }
              }
            }
          }
        }
      }
    }

    &-payload {
      display: flex;
      flex-direction: column;

      &-text {
        font-size: 12px;
        color: black;

        &.-rtl {
          text-align: right;
        }

        &:nth-child(2) {
          margin-bottom: 20px;
        }
      }
    }

    &-qr_code {
      width: 100px;
      height: 100px;
    }

    &-info {
      display: flex;
      flex-direction: column;

      &-warning {
        display: flex;
        padding: 0 20px;
        margin-top: 20px;

        &-icon {

          &.-ltr {
            margin-right: 10px;
          }

          &.-rtl {
            margin-left: 10px;
          }

          svg {
            width: 19px;
            height: 19px;
            fill: #fbbc05;
          }
        }

        &-text {
          font-size: 14px;
          color: #3B4B68;
          line-height: 1.2;

          &.-rtl {
            text-align: right;
          }
        }
      }

      &-hints {
        display: flex;
        flex-direction: column;
        padding: 20px 20px 0;

        &-hint {
          margin-bottom: 10px;
          font-size: 12px;
          color: #3B4B68;
          line-height: 1.2;

          &.-rtl {
            text-align: right;
          }

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    &-content {
      display: flex;
      flex-direction: column;
      padding: 20px 0;
      margin: 20px 20px 0;
      border-top: 1px solid #b8dbf2;

      &.-no_border {
        border-top: none;
      }

      &.-message {
        border-top: none;
        margin: 0 20px;
      }

      &-buttons {
        display: flex;
        align-items: center;
        justify-content: center;

        &-button {
          width: 140px;

          &.-ltr {
            &:nth-child(1) {
              margin-right: 20px;
            }
          }

          &.-rtl {
            &:nth-child(2) {
              margin-right: 20px;
            }
          }
        }
      }

      &-secure {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;

        &-icon {

          &.-ltr {
            margin-right: 5px;
          }

          &.-rtl {
            margin-left: 5px;
          }
        }

        &-text {
          line-height: 1;
          font-size: 9px;
          color: #00000099;
        }
      }
    }
  }
</style>
