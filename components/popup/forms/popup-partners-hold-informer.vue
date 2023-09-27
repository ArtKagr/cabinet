<template>
  <div class="popup-partners-hold-informer">
    <div class="popup-partners-hold-informer-head">
      <span class="popup-partners-hold-informer-head-title" :class="`-${dir}`" v-text="$t('Условия')" />
    </div>
    <div class="popup-partners-hold-informer-body">
      <template v-for="(item, key) in holdInformer">
        <span
          v-if="item.type === 'title'"
          :key="key"
          class="popup-partners-hold-informer-body-title"
          :class="`-${dir}`"
          v-text="item.content"
        />
        <div v-if="item.type === 'list'" :key="key" class="popup-partners-hold-informer-body-list">
          <span
            v-for="(text, elem) in item.content"
            :key="elem"
            class="popup-partners-hold-informer-body-list-item"
            :class="`-${dir}`"
            v-text="text"
          />
        </div>
        <span
          v-if="item.type === 'text'"
          :key="key"
          class="popup-partners-hold-informer-body-text"
          :class="`-${dir}`"
          v-text="item.content"
        />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupPartnersHoldInformer',
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    holdInformer () {
      return this.$store.getters['partners/getters/handler/getPartnerHoldInformer']
    }
  }
}
</script>
<style lang="scss">
  .popup-partners-hold-informer {
    display: flex;
    flex-direction: column;

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
      padding: 0 18px 20px 18px;

      &-title {
        margin-bottom: 10px;
        color: #8e9aac;
        font-weight: 500;

        &.-rtl {
          text-align: right;
        }
      }

      &-list {
        display: flex;
        flex-direction: column;

        &-item {
          font-size: 14px;
          color: #8e9aac;
          margin-bottom: 10px;

          &.-rtl {
            text-align: right;
          }
        }
      }

      &-text {
        font-size: 10px;
        color: #8e9aac;
        margin-bottom: 10px;

        &.-rtl {
          text-align: right;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
