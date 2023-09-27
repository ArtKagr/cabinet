<template>
  <div class="popup-custom">
    <div class="popup-custom-container" :class="`-${currentPopup}`">
      <div class="popup-custom-container-modal" :class="`-${currentPopup}`">
        <!-- head -->
        <div
          v-if="['chat-image', 'education-webinar', 'education-webinar-registration'].includes(currentPopup) && windowWidth !== 'sm'"
          class="popup-custom-container-modal-close_chat_image"
          :class="`-${dir}`"
        >
          <lfx-icon-close @click.native="closePopup()" />
        </div>
        <lfx-icon-close v-else class="popup-custom-container-modal-close" :class="[`-${dir}`, `-${currentPopup}`]" @click.native="closePopup()" />
        <!-- form -->
        <main-popup />
      </div>
    </div>
  </div>
</template>

<script>
import modal from '~/mixins/modal'
import LfxIconClose from '~/components/icons/lfx-icon-close'
import MainPopup from '~/components/popup/forms/main-popup'
export default {
  name: 'Popup',
  components: { MainPopup, LfxIconClose },
  mixins: [modal],
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    currentPopup () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentPopup']
    }
  }
}
</script>
<style lang="scss">
.popup-custom {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9999;
  transition: all .4s;
  background: rgba(59,75,104,.25);
  padding-top: 30px;
  overflow: auto;

  @media screen and (max-width: 767px) {
    padding: 0;
    height: calc(100% - 60px);
    transform: translateY(60px);
    z-index: 2999;
    border-top: 1px solid #eaeced;
  }

  &-container {
    display: flex;
    align-items: baseline;
    width: 430px;
    height: 100%;
    margin: 0 auto;

    @media screen and (max-width: 767px) {
      width: 100%;
    }

    &.-chat-image {
      width: auto;
      justify-content: center;

      @media screen and (max-width: 767px) {
        width: 100%;
      }
    }

    &.-education-webinar,
    &.-education-webinar-registration {
      width: 768px;

      @media screen and (max-width: 767px) {
        width: 100%;
      }
    }

    &.-finance-deposit-crypto,
    &.-finance-deposit-form,
    &.-finance-deposit-message,
    &.-finance-deposit-bank,
    &.-finance-repeat,
    &.-successful-partner-conditions,
    &.-bring-friend,
    &.-partners-hold-informer  {
      width: 480px;

      @media screen and (max-width: 767px) {
        width: 100%;
      }
    }

    &.-demo-real,
    &.-traders-ranges,
    &.-analytics-filter,
    &.-analytics-signals-filter,
    &.-analytics-calendar-filter {
      width: 720px;

      @media screen and (max-width: 767px) {
        width: 100%;
      }
    }

    &.-trades-history-trade,
    &.-trades-history-investment,
    &.-trades-trade,
    &.-trades-trade-change,
    &.-trades-investment,
    &.-trades-investment-change,
    &.-copiers,
    &.-copiers-history,
    &.-copiers-partner,
    &.-trading-card-display,
    &.-traders-card-display,
    &.-trading-card-warning,
    &.-traders-card-warning,
    &.-trading-sorting,
    &.-traders-sorting,
    &.-trading-periods,
    &.-traders-periods,
    &.-trading-open-trade,
    &.-traders-open-trade,
    &.-mt-settings,
    &.-trader-trade,
    &.-trader-investment,
    &.-trader-history-trade,
    &.-trader-history-investment,
    &.-finance-delete-wallet,
    &.-finance-cancel,
    &.-partners-table-settings,
    &.-partners-ref-table-settings,
    &.-partners-campaigns-list,
    &.-partners-promo-campaigns-list,
    &.-partners-current-referral,
    &.-partners-lucky-ticket-contest-algorithm,
    &.-successful-partner-participate {
      width: 360px;

      @media screen and (max-width: 767px) {
        width: 100%;
      }
    }

    &-modal {
      width: 430px;
      background-color: white;
      margin: auto 0;
      position: relative;

      @media screen and (max-width: 767px) {
        width: 100%;
        height: 100%;
      }

      &.-bring-friend {
        background-color: #3b4b68;
      }

      &.-chat-image {
        width: auto;

        @media screen and (max-width: 767px) {
          width: 100%;
        }
      }

      &.-education-webinar,
      &.-education-webinar-registration  {
        width: 768px;

        @media screen and (max-width: 767px) {
          width: 100%;
        }
      }

      &.-demo-real,
      &.-traders-ranges,
      &.-analytics-filter,
      &.-analytics-signals-filter,
      &.-analytics-calendar-filter {
        width: 720px;

        @media screen and (max-width: 767px) {
          width: 100%;
        }
      }

      &.-finance-deposit-crypto,
      &.-finance-deposit-form,
      &.-finance-deposit-message,
      &.-finance-deposit-bank,
      &.-finance-repeat,
      &.-successful-partner-conditions,
      &.-bring-friend,
      &.-partners-hold-informer {
        width: 480px;

        @media screen and (max-width: 767px) {
          width: 100%;
        }
      }

      &.-trades-history-trade,
      &.-trades-history-investment,
      &.-trades-trade,
      &.-trades-trade-change,
      &.-trades-investment,
      &.-trades-investment-change,
      &.-copiers,
      &.-copiers-history,
      &.-copiers-partner,
      &.-trading-card-display,
      &.-traders-card-display,
      &.-trading-card-warning,
      &.-traders-card-warning,
      &.-trading-sorting,
      &.-traders-sorting,
      &.-trading-periods,
      &.-traders-periods,
      &.-trading-open-trade,
      &.-traders-open-trade,
      &.-mt-settings,
      &.-trader-trade,
      &.-trader-investment,
      &.-trader-history-trade,
      &.-trader-history-investment,
      &.-finance-delete-wallet,
      &.-finance-cancel,
      &.-partners-table-settings,
      &.-partners-ref-table-settings,
      &.-partners-campaigns-list,
      &.-partners-promo-campaigns-list,
      &.-partners-current-referral,
      &.-partners-lucky-ticket-contest-algorithm,
      &.-successful-partner-participate {
        width: 360px;

        @media screen and (max-width: 767px) {
          width: 100%;
        }
      }

      &-close_chat_image {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 100px;
        background-color: #c4c4c4;
        position: absolute;
        cursor: pointer;
        top: -18px;

        &.-ltr {
          right: -18px;
        }

        &.-rtl {
          left: -18px;
        }

        @media screen and (max-width: 767px) {
          display: none;
        }

        svg {
          width: 20px;
          height: 20px;
          fill: white
        }
      }

      &-close {
        position: absolute;
        width: 20px;
        height: 20px;
        cursor: pointer;
        fill: #8e9aac;
        top: 20px;
        z-index: 1000;

        &.-bring-friend {
          fill: white;

          &:hover {
            path {
              fill: #bddbff;
            }
          }
        }

        &.-registration-warning,
        &.-register-yet,
        &.-copiers-partner-edit,
        &.-google-auth,
        &.-email-auth,
        &.-verification-bank-card,
        &.-verification-change-email,
        &.-verification-change-phone,
        &.-verification-edit-identity,
        &.-verification-edit-address,
        &.-verification-islamic,
        &.-verification-risk-acceptance {
          top: 28px;

          &.-ltr {
            right: 28px;
          }

          &.-rtl {
            left: 28px;
          }
        }

        &.-ltr {
          right: 20px;
        }

        &.-rtl {
          left: 20px;
        }

        &:hover {
          path {
            fill: #3b4b68;
          }
        }
      }
    }
  }
}
</style>
