<template>
  <div class="search-container" :class="`-${dir}`" @click="closeSearchPopup()">
    <div class="search-popup" :class="`-${dir}`">
      <span class="search-popup-title" :class="`-${dir}`" v-text="searchResult.length === 0 ? $t('Ничего не найдено') : $t('Результаты поиска')" />
      <div v-if="searchResult.length" class="search-popup-container">
        <template v-for="(item, key) in searchResult">
          <div v-if="item.symbol" :key="key" class="search-popup-container-item" @click="openInstrument(item.symbol, item.symbol_original)">
            <div class="search-popup-container-item-head" :class="`-${dir}`">
              <lfx-symbol :symbol="item.symbol_original" />
              <span class="search-popup-container-item-head-name" :class="`-${dir}`" v-text="item.symbol_original" />
            </div>
            <span class="search-popup-container-item-description" :class="`-${dir}`" v-text="item.text" />
            <span class="search-popup-container-item-type" :class="`-${dir}`" v-text="item.type" />
          </div>
          <div v-else-if="item.user_id" :key="key" class="search-popup-container-item" @click="openTrader(item.user_id)">
            <div class="search-popup-container-item-head" :class="`-${dir}`">
              <img v-if="item.avatar_url" :src="item.avatar_url" alt class="search-popup-container-item-head-avatar">
              <div v-else class="search-popup-container-item-head-avatar_empty">
                <span class="search-popup-container-item-head-avatar_empty-name" v-text="item.avatar_name" />
              </div>
              <span class="search-popup-container-item-head-name" :class="`-${dir}`" v-text="item.username" />
            </div>
            <span class="search-popup-container-item-description" :class="`-${dir}`" v-text="item.full_name" />
            <span class="search-popup-container-item-type" :class="`-${dir}`" v-text="$t('Трейдер')" />
          </div>
          <div v-else-if="item.client_uid" :key="key" class="search-popup-container-item" @click="openReferral(item.client_uid)">
            <div class="search-popup-container-item-head" :class="`-${dir}`">
              <img v-if="item.avatar_url" :src="item.avatar_url" alt class="search-popup-container-item-head-avatar">
              <div v-else class="search-popup-container-item-head-avatar_empty">
                <span class="search-popup-container-item-head-avatar_empty-name" v-text="item.avatar_name" />
              </div>
              <span class="search-popup-container-item-head-name" :class="`-${dir}`" v-text="item.full_name || item.client_uid" />
            </div>
            <span class="search-popup-container-item-description" :class="`-${dir}`" v-text="item.full_name" />
            <span class="search-popup-container-item-type" :class="`-${dir}`" v-text="$t('Реферал')" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import modal from '~/mixins/modal'
import LfxSymbol from '~/components/_aux/lfx-symbol'
export default {
  name: 'SearchPopup',
  components: {
    LfxSymbol
  },
  mixins: [modal],
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    searchResult () {
      return this.$store.getters['dictionaries/getters/handler/getCabinetSearch']
    },
    activeInstruments () {
      return this.$store.getters['trading/getters/trading/getActiveInstruments']
    }
  },
  methods: {
    fetchCurrentTrader (userId) {
      this.$store.dispatch('traders/actions/handler/fetchCurrentTrader', userId)
    },
    openInstrument (symbol, symbolOriginal) {
      const category = this.$trading.getCategoryName(this.activeInstruments[symbol].category)

      this.$router.push(`/${this.routePages.locale}/trading/${category}/${symbolOriginal.replace(/#/gi, '')}`)
      this.closeSearchPopup()
    },
    openTrader (userId) {
      this.fetchCurrentTrader(userId)
      this.$router.push(`/${this.routePages.locale}/traders/${userId}`)
      this.closeSearchPopup()
    },
    openReferral (referral) {
      this.$store.commit('partners/mutations/handler/SAVE_CURRENT_REFERRAL', {
        rootData: this.$store.state.partners.state.handler,
        data: referral
      })
      this.$store.dispatch('dictionaries/actions/handler/showPopup', 'partners-current-referral')
    }
  }
}
</script>
<style lang="scss">
  .search-container {
    width: 100%;
    height: calc(100% - 71px);
    position: absolute;
    z-index: 9999;
    top: 71px;
    background-color: rgba(59,75,104,.25);

    @media screen and (max-width: 767px) {
      top: 60px;
    }
  }
  .search-popup {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 570px;
    max-height: 60vh;
    background-color: white;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0;
    }

    &.-ltr {
      left: 90px;
    }

    &.-rtl {
      right: 90px;
    }

    @media screen and (max-width: 767px) {
      width: 100%;

      &.-ltr {
        left: 0;
      }

      &.-rtl {
        right: 0;
      }
    }

    &-title {
      background: #eaeced;
      color: #8e9aac;
      text-transform: uppercase;
      font-size: 10px;
      line-height: 1;
      padding: 10px 20px 9px;
      border-bottom: 1px solid #d9dce1;

      &.-rtl {
        text-align: right;
      }
    }

    &-container {
      display: flex;
      flex-direction: column;

      &-item {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        border-bottom: 1px solid #d9dce1;
        cursor: pointer;

        &-head {
          display: flex;
          align-items: center;
          width: 40%;

          &-avatar {
            width: 30px;
            height: 30px;
            border-radius: 100px;
            margin: 0 10px;
          }

          &-avatar_empty {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border-radius: 100px;
            background-color: #eaeced;
            margin: 0 10px;

            &-name {
              font-size: 10px;
              color: #3B4B68;
              text-transform: uppercase;
            }
          }

          &-name {
            font-size: 13px;
            color: #3498db;
            margin-left: 10px;

            &.-rtl {
              margin-right: 10px;
            }
          }
        }
        &-description {
          font-size: 11px;
          color: #8e9aac;
          line-height: 1;
          width: 40%;

          &.-rtl {
            text-align: right;
          }
        }

        &-type {
          font-size: 11px;
          color: #8e9aac;
          line-height: 1;
          width: 20%;

          &.-rtl {
            text-align: right;
          }
        }
      }
    }
  }
</style>
