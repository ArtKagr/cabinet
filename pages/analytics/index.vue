<template>
  <div class="analytics-newsline">
    <div class="d-flex flex-column">
      <div
        v-for="(news, key) in analyticsData"
        :key="key"
        class="d-flex flex-column"
      >
        <div class="d-flex align-items-center justify-content-between w-100">
          <span class="analytics-newsline-date" v-text="key" />
          <div v-if="isFirstDate(key)" class="mr-2">
            <b-button variant="outline-secondary" @click="showPopup('analytics-filter')">
              <lfx-icon-filter class="icon-secondary" :class="isRtlMode ? 'ml-2' : 'mr-2'" />
              <span v-text="$t('Фильтр')" />
            </b-button>
          </div>
        </div>
        <div class="analytics-newsline-news mt-2">
          <div v-for="item in news" :key="item.id" class="d-flex flex-column mb-1">
            <div v-if="windowWidthNumber > 520" class="analytics-newsline-news-item" @click="toggleNewsDescription(item.id)">
              <div>
                <span class="analytics-newsline-news-item-chip" :class="[`-${dir}`, `-${item.type}`]" v-text="item.type" />
              </div>
              <span v-if="['ar', 'ps', 'my', 'fa'].includes(routePages.locale)" class="analytics-newsline-news-item-time" :class="`-${dir}`" v-text=item.date_time />
              <span v-else class="analytics-newsline-news-item-time" :class="`-${dir}`" v-text="moment(item.date_time).format('HH:mm')" />
              <div class="d-flex align-items-center">
                <lfx-symbol :small="true" :symbol="item.symbol" :class="isRtlMode ? 'ml-2' : 'mr-2'" />
                <span class="analytics-newsline-news-item-symbol" :class="`-${dir}`" v-text="`${item.symbol === 'Другое' ? $t('Другое') : item.symbol}`" />
              </div>
              <span class="analytics-newsline-news-item-title" :class="`-${dir}`" v-text="item.title" />
            </div>
            <div v-else class="analytics-newsline-news-item -mobile" @click="toggleNewsDescription(item.id)">
              <div class="d-flex align-items-center justify-content-between w-100">
                <span v-if="!isRtlMode" class="analytics-newsline-news-item-chip" :class="`-${item.type}`" v-text="item.type" />
                <div class="d-flex align-items-center">
                  <span class="analytics-newsline-news-item-time" :class="`-${dir}`" v-text="moment(item.date_time).format('HH:mm')" />
                  <div class="d-flex align-items-center">
                    <lfx-symbol :small="true" :symbol="item.symbol" />
                    <span class="analytics-newsline-news-item-symbol" :class="isRtlMode ? 'mr-2' : 'ml-2'" v-text="item.symbol" />
                  </div>
                </div>
                <span v-if="isRtlMode" class="analytics-newsline-news-item-chip" :class="`-${item.type}`" v-text="item.type" />
              </div>
              <span class="analytics-newsline-news-item-title -mobile" :class="`-${dir}`" v-text="item.title" />
            </div>
            <div v-if="item.is_shown" class="analytics-newsline-news-item-description">
              <lfx-icon-close
                class="analytics-newsline-news-item-description-close"
                :class="`-${dir}`"
                @click.native="toggleNewsDescription(item.id)"
              />
              <div class="analytics-newsline-news-item-description-text" :class="isRtlMode ? 'text-right' : ''" v-html="item.description" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import LfxIconClose from '~/components/icons/lfx-icon-close'
import LfxIconFilter from '~/components/icons/lfx-icon-filter'
import LfxSymbol from '~/components/_aux/lfx-symbol'
export default {
  name: 'Analytics',
  components: {
    LfxSymbol,
    LfxIconFilter,
    LfxIconClose
  },
  data () {
    return {
      moment
    }
  },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    windowWidthNumber () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    },
    analyticsData () {
      return this.$store.getters['analytics/getters/handler/getAnalyticsData']
    },
    analyticsDataPage () {
      return this.$store.getters['analytics/getters/handler/getAnalyticsDataPage']
    },
    activeTimeZone () {
      return this.$store.getters['analytics/getters/handler/getActiveTimeZone']
    },
    scrollBottom () {
      return this.$store.getters['dictionaries/getters/handler/getScrollBottom']
    }
  },
  watch: {
    activeTimeZone () {
      this.$store.dispatch('analytics/actions/handler/fetchAnalyticsData')
    },
    scrollBottom (newValue) {
      if (newValue === 0) {
        this.$store.dispatch('analytics/actions/handler/fetchAnalyticsData', this.analyticsDataPage + 1)
      }
    }
  },
  created () {
    this.$store.dispatch('analytics/actions/handler/fetchAnalyticsData')
  },
  async destroyed () {
    await this.$store.commit('analytics/mutations/handler/CLEAR_ANALYTICS_FILTER', {
      rootData: this.$store.state.analytics.state.handler,
      data: { fields: ['types', 'instruments'] }
    })
  },
  methods: {
    showPopup (popupName) {
      this.$store.dispatch('dictionaries/actions/handler/showPopup', popupName)
    },
    toggleNewsDescription (newsId) {
      this.$store.commit('analytics/mutations/handler/TOGGLE_CURRENT_NEWS_DESCRIPTION', {
        rootData: this.$store.state.analytics.state.handler,
        data: newsId
      })
    },
    isFirstDate (date) {
      let result = false
      Object.keys(this.analyticsData).forEach((itemDay, key) => {
        if (key === 0) {
          result = date === itemDay
        }
      })
      return result
    }
  }
}
</script>
