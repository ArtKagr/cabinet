<template>
  <div class="partners-promo">
    <div class="partners-promo-container">
      <div v-for="(item, key) in promoList" :key="key" class="partners-promo-item">
        <span class="partners-promo-item-title" v-text="item[1]" />
        <span class="partners-promo-item-link" @click="openPromoPage(item[0], 'banners')" v-text="$t('Баннеры')" />
        <span class="partners-promo-item-link" @click="openPromoPage(item[0], 'landings')" v-text="$t('Лендинги')" />
        <span class="partners-promo-item-link" @click="openPromoPage(item[0], 'video')" v-text="$t('Видео')" />
        <span class="partners-promo-item-link" @click="openPromoPage(item[0], 'handouts')" v-text="$t('Раздаточные материалы')" />
        <span class="partners-promo-item-link" @click="openPromoPage(item[0], 'avatars')" v-text="$t('Аватарки')" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AffiliateCommonBanners',
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Промо-материалы')}`)
    }
  },
  computed: {
    promoList () {
      return this.$store.getters['partners/getters/handler/getPromoList']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    }
  },
  async created () {
    await this.$store.dispatch('partners/actions/handler/fetchPromoList')
  },
  methods: {
    openPromoPage (chapter, link) {
      localStorage.setItem('promo_type', link)
      this.$router.push(`/${this.routePages.locale}/affiliate-promo/${chapter}/${link}`)
    }
  }
}
</script>
