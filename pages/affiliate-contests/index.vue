<template>
  <div class="partners-campaigns">
    <div class="partners-campaigns-head mb-4">
      <span class="partners-campaigns-head-title" v-text="$t('Партнерские конкурсы')" />
    </div>
    <div v-if="contests.length" class="partners-contests">
      <div
        v-for="(contest, key) in contests"
        :key="key"
        class="partners-contests-contest"
        :class="`-${dir}`"
        @click="openCurrentContest(contest[0])"
      >
        <img v-if="contest[0] === 'annual-ib-vietnam'" src="~/assets/images/partners-contests-cover-1.png" alt class="partners-contests-contest-image" :class="`-${dir}`">
        <img v-if="contest[0] === 'lucky-ticket'" src="~/assets/images/partners-contests-cover-2.png" alt class="partners-contests-contest-image" :class="`-${dir}`">
        <img v-if="contest[0] === 'successful-partner'" src="~/assets/images/partners-contests-cover-4.png" alt class="partners-contests-contest-image" :class="`-${dir}`">
        <div class="partners-contests-contest-container">
          <span
            class="partners-contests-contest-container-header"
            :class="isRtlMode ? 'text-right' : ''"
            v-text="contest[1].header"
          />
          <div class="partners-contests-contest-container-data">
            <div class="d-flex flex-column">
              <span
                class="text-secondary-10 text-uppercase"
                :class="isRtlMode ? 'text-right' : ''"
                v-text="$t('Главный приз')"
              />
              <span
                class="text-dark-primary-15 font-weight-500"
                :class="isRtlMode ? 'text-right' : ''"
                v-text="contest[1].prize"
              />
            </div>
            <div class="d-flex flex-column">
              <span
                class="text-secondary-10 text-uppercase"
                :class="isRtlMode ? 'text-right' : ''"
                v-text="$t('Призовых мест')"
              />
              <span
                class="text-dark-primary-15 font-weight-500"
                :class="isRtlMode ? 'text-right' : ''"
                v-text="contest[1].places"
              />
            </div>
            <div v-if="contest[1].start" class="d-flex flex-column">
              <span
                class="text-secondary-10 text-uppercase"
                :class="isRtlMode ? 'text-right' : ''"
                v-text="$t('Старт')"
              />
              <span
                class="text-dark-primary-15 font-weight-500"
                :class="isRtlMode ? 'text-right' : ''"
                v-text="contest[1].start"
              />
            </div>
            <div v-if="contest[1].end" class="d-flex flex-column">
              <span
                class="text-secondary-10 text-uppercase"
                :class="isRtlMode ? 'text-right' : ''"
                v-text="$t('Финиш')"
              />
              <span
                class="text-dark-primary-15 font-weight-500"
                :class="isRtlMode ? 'text-right' : ''"
                v-text="contest[1].end"
              />
            </div>
            <div v-if="contest[1].period" class="d-flex flex-column">
              <span
                class="text-secondary-10 text-uppercase"
                :class="isRtlMode ? 'text-right' : ''"
                v-text="$t('Продолжительность')"
              />
              <span
                class="text-dark-primary-15 font-weight-500"
                :class="isRtlMode ? 'text-right' : ''"
                v-text="contest[1].period"
              />
            </div>
            <span />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AffiliateContests',
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Конкурсы')}`)
    }
  },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    contests () {
      return this.$store.getters['partners/getters/handler/getPartnerContests']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  created () {
    this.$store.dispatch('partners/actions/handler/fetchPartnerContests')
  },
  methods: {
    openCurrentContest (currentContest) {
      this.$router.push(`/${this.routePages.locale}/affiliate-contests/${currentContest}`)
    }
  }
}
</script>
