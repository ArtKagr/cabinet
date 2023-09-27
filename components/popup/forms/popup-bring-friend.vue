<template>
  <div class="popup-bring_friend">
    <div class="popup-bring_friend-header">
      <div class="popup-bring_friend-header-image">
        <icon-bring-friend />
      </div>
      <span class="popup-bring_friend-header-title" v-text="conditions.header.title_one" />
      <span class="popup-bring_friend-header-subtitle" v-text="conditions.header.title_two" />
      <span class="popup-bring_friend-header-text" v-text="conditions.header.label" />
    </div>
    <div class="popup-bring_friend-body">
      <div v-for="(item, key) in conditions.body" :key="key" class="popup-bring_friend-body-item">
        <span class="popup-bring_friend-body-item-title" :class="`-${dir}`" v-text="item.label" />
        <bdi v-if="key === 0" class="popup-bring_friend-body-item-value" v-text="`${item.value} ${account.currency}`" />
        <bdi v-else class="popup-bring_friend-body-item-value" v-text="`+ ${item.value}%`" />
        <span class="popup-bring_friend-body-item-description" :class="`-${dir}`" v-text="item.description" />
      </div>
    </div>
    <div class="popup-bring_friend-footer">
      <div class="popup-bring_friend-footer-head">
        <span
          class="popup-bring_friend-footer-head-title"
          v-text="conditions.footer.invite_text.label"
        />
        <a
          class="popup-bring_friend-footer-head-link"
          :href="conditions.footer.invite_text.url"
          target="_blank"
          v-text="conditions.footer.invite_text.url"
        />
      </div>
      <div
        class="popup-bring_friend-footer-links"
      >
        <template v-for="(link, key) in conditions.footer.invite_buttons">
          <a
            v-if="key === 0"
            :key="key"
            class="popup-bring_friend-footer-links-button"
            @click="copyLink(link.url)"
            v-text="link.label"
          />
          <span
            v-else-if="key === 1"
            :key="key"
            class="popup-bring_friend-footer-links-text"
            @click="goToBringFriend"
            v-text="link.label"
          />
          <a
            v-else-if="key === 2"
            :key="key"
            class="popup-bring_friend-footer-links-text"
            :href="link.url"
            target="_blank"
            v-text="link.label"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import IconBringFriend from '~/components/icons/icon-bring-friend'
export default {
  name: 'PopupBringFriend',
  components: { IconBringFriend },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    conditions () {
      return this.$store.getters['profile/getters/handler/getBringFriendConditions']
    }
  },
  methods: {
    togglePopup (value) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: value
      })
    },
    copyLink (url) {
      navigator.clipboard.writeText(url)
      this.$store.dispatch('dictionaries/actions/handler/openSuccessToast', { description: this.$t('Ссылка успешно скопирована') })
    },
    goToBringFriend () {
      this.$router.push(`/${this.routePages.locale}/profile/bringafriend`)
      this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_ITEM', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: 'bringafriend'
      })
      this.togglePopup(false)
    }
  }
}
</script>
<style lang="scss">
  .popup-bring_friend {
    color: white;
    border-radius: 10px;

    &-header {
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      text-align: center;
      background-color: #3b4b68;

      &-image {
        padding: 10px 0 20px;
      }

      &-title {
        font-size: 10px;
        text-transform: uppercase;
        color: #bddbff;
      }

      &-subtitle {
        font-size: 24px;
        line-height: 1.2;
        padding-bottom: 43px;
      }

      &-text {
        font-size: 15px;
      }
    }

    &-body {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #28354e;
      padding: 25px 45px;

      &-item {
        display: flex;
        flex-direction: column;

        &-title {
          font-size: 10px;
          text-transform: uppercase;
          color: #bddbff;

          &.-rtl {
            text-align: right;
          }
        }

        &-value {
          font-size: 40px;
          line-height: 1;
          font-weight: 700;
        }

        &-description {
          font-size: 12px;
          color: #bddbff;

          &.-rtl {
            text-align: right;
          }
        }
      }
    }

    &-footer {
      background-color: #3b4b68;
      padding: 20px 25px 25px;

      &-head {
        display: flex;
        flex-direction: column;
        align-items: center;

        &-title {
          font-size: 13px;
          margin-bottom: 8px;
        }

        &-link {
          text-align: center;
          font-size: 14px;
          color: #bddbff;

          &:hover {
            color: #bddbff;
          }
        }
      }

      &-links {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 25px;

        &-button {
          padding: 13px 15px 11px;
          border-radius: 3px;
          background-color: #3498db;
          font-size: 16px;
          color: white;
          text-transform: uppercase;
          cursor: pointer;
          margin-bottom: 16px;

          &:hover {
            text-decoration: none;
            color: white;
          }
        }

        &-text {
          line-height: 1;
          margin-bottom: 16px;
          text-align: center;
          font-size: 14px;
          color: #bddbff;
          cursor: pointer;

          &:hover {
            color: #bddbff;
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
