<template>
  <div class="bring-friend">
    <div class="bring-friend-container">
      <span class="bring-friend-container-title" :class="`-${dir}`" v-text="$t('Общая сводка')" />
      <div class="bring-friend-container-columns">
        <div class="bring-friend-container-columns-column">
          <span
            class="bring-friend-container-columns-column-value"
            :class="`-${dir}`"
            v-text="statistics.activations"
          />
          <span class="bring-friend-container-columns-column-title" :class="`-${dir}`" v-text="$t('Количество активаций')" />
        </div>
        <div class="bring-friend-container-columns-column">
          <bdi
            class="bring-friend-container-columns-column-value"
            :class="`-${dir}`"
            v-text="`${Number(statistics.amountReceived || 0).toFixed(2)} ${account.currency}`"
          />
          <span class="bring-friend-container-columns-column-title" :class="`-${dir}`" v-text="$t('Начислено')" />
        </div>
        <div class="bring-friend-container-columns-column">
          <a
            class="bring-friend-container-columns-column-value -link"
            :class="`-${dir}`"
            :href="statistics.copy_link"
            target="_blank"
            v-text="statistics.copy_link"
          />
          <span class="bring-friend-container-columns-column-title" :class="`-${dir}`" v-text="$t('Реферальная ссылка')" />
        </div>
        <div class="bring-friend-container-columns-column -buttons">
          <b-button
            variant="outline-light-secondary"
            class="bring-friend-container-columns-column-button"
            :class="`-${dir}`"
            @click="copyLink(statistics.copy_link)"
            v-text="$t('Копировать')"
          />
          <a
            :href="statistics.conditions_link"
            class="bring-friend-container-columns-column-button -link"
            :class="`-${dir}`"
            target="_blank"
            v-text="$t('Условия участия')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bringafriend',
  computed: {
    account () {
      return this.$store.getters['trading/getters/trading/getAccount']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    bringFriend () {
      return this.$store.getters['profile/getters/handler/getBringFriend']
    },
    statistics () {
      return this.bringFriend.statistics
    }
  },
  created () {
    this.$store.dispatch('profile/actions/handler/fetchBringFriend')
  },
  methods: {
    copyLink (url) {
      navigator.clipboard.writeText(url)
      this.$store.dispatch('dictionaries/actions/handler/openSuccessToast', { description: this.$t('Ссылка успешно скопирована') })
    }
  }
}
</script>
<style lang="scss">
  .bring-friend {
    padding: 0 30px;

    @media screen and (max-width: 767px) {
      padding: 0 10px;
    }

    &-container {
      display: flex;
      flex-direction: column;
      background-color: white;
      padding: 10px 10px 25px;
      border-radius: 3px;
      border: 1px solid #d9dce1;

      @media screen and (max-width: 767px) {
        margin-top: 20px;
      }

      &-title {
        padding: 20px 20px 0;
        font-size: 17px;
        color: #2d3540;

        &.-rtl {
          text-align: right;
        }
      }

      &-columns {
        display: flex;
        align-items: center;

        @media screen and (max-width: 1000px) {
          flex-direction: column;
          align-items: flex-start;
        }

        &-column {
          padding: 20px 20px 0;
          display: flex;
          flex-direction: column;

          &.-buttons {
            align-items: center;
            flex-direction: row;
          }

          &-value {
            font-size: 18px;
            color: #3B4B68;

            &.-rtl {
              text-align: right;
            }

            &.-link {
              font-size: 14px;
              color: #3498db;
              cursor: pointer;

              &:hover {
                text-decoration: none;
              }
            }
          }

          &-title {
            font-size: 10px;
            color: #8e9aac;
            text-transform: uppercase;

            &.-rtl {
              text-align: right;
            }
          }

          &-button {

            &.-link {
              padding: 10px 15px;
              background-color: #3498db;
              color: white;
              border-radius: 3px;
              font-size: 12px;
              text-transform: uppercase;

              &:hover {
                text-decoration: none;
              }
            }

            &:nth-child(1) {
              color: #3498db !important;
            }

            &.-ltr {
              &:nth-child(1) {
                margin-right: 16px;
              }
            }

            &.-rtl {
              &:nth-child(2) {
                margin-right: 16px;
              }
            }
          }
        }
      }
    }
  }
</style>
