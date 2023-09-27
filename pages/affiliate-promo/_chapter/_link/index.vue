<template>
  <Promo />
</template>

<script>
import Promo from '~/components/partners/promo'
export default {
  name: 'PromoChapter',
  components: { Promo },
  data () {
    return {
      promoType: null
    }
  },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.promoTypes[this.promoType]}`)
    }
  },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    promoTypes () {
      return {
        banners: this.$t('Баннеры'),
        landings: this.$t('Лендинги'),
        video: this.$t('Видео'),
        handouts: this.$t('Раздаточные материалы'),
        avatars: this.$t('Аватарки')
      }
    }
  },
  created () {
    const type = localStorage.getItem('promo_type') || this.routePages.current

    if (type) {
      this.promoType = type

      switch (type) {
        case 'avatars':
          this.$store.dispatch('partners/actions/handler/fetchPartnerAvatars')
          break
        case 'banners':
          this.$store.dispatch('partners/actions/handler/fetchPartnerBanners')
          break
        case 'handouts':
          this.$store.dispatch('partners/actions/handler/fetchPartnerHandouts')
          break
        case 'landings':
          this.$store.dispatch('partners/actions/handler/fetchPartnerLandings')
          break
        case 'video':
          this.$store.dispatch('partners/actions/handler/fetchPartnerVideo')
          break
      }
    }
  },
  destroyed () {
    this.$store.commit('partners/mutations/handler/CLEAR_PARTNER_SORT_FLAGS', {
      rootData: this.$store.state.partners.state.handler
    })
  }
}
</script>
