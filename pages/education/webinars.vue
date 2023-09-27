<template>
  <div class="education-webinars">
    <div v-if="nextWebinars && nextWebinars.length" class="education-webinars-next">
      <span class="education-webinars-next-title" v-text="$t('Предстоящие вебинары')" />
      <div class="education-webinars-next-items">
        <div v-for="item in nextWebinars" :key="item.id" class="education-webinars-next-items-item">
          <span class="education-webinars-next-items-item-title" v-text="item.title" />
          <span class="education-webinars-next-items-item-description" v-text="item.short_text" />
          <div class="education-webinars-next-items-item-block">
            <span class="education-webinars-next-items-item-block-title" v-text="`${$t('Вебинар начнется')}:`" />
            <span class="education-webinars-next-items-item-block-date_time" v-text="`${item.date_start} ${item.timezone}`" />
          </div>
          <span
            v-if="item.is_registered"
            class="education-webinars-next-items-item-button -registered"
            v-text="$t('Вы уже зарегистрированы')"
          />
          <span
            v-else
            class="education-webinars-next-items-item-button"
            @click="fetchWebinarRegistration(item)"
            v-text="$t('Зарегистрироваться')"
          />
        </div>
      </div>
    </div>
    <div v-if="archiveWebinars && archiveWebinars.length" class="education-webinars-archive">
      <span class="education-webinars-archive-title" v-text="$t('Архив вебинаров')" />
      <lfx-menu class="p-0" :menu="categories" :active-item="payload.type" @click-handler="clickHandler" />
      <div class="education-webinars-archive-items">
        <div
          v-for="item in archiveWebinars"
          :key="item.id"
          class="education-webinars-archive-items-item"
          @click="fetchCurrentWebinar(item)"
        >
          <img class="education-webinars-archive-items-item-image" :src="item.thumb_url" alt>
          <span class="education-webinars-archive-items-item-title" v-text="item.title" />
          <span class="education-webinars-archive-items-item-subtitle" v-text="item.date_start" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LfxMenu from '~/components/_aux/lfx-menu'
export default {
  name: 'Webinars',
  components: { LfxMenu },
  data () {
    return {
      payload: {
        type: 'all',
        page: 1
      }
    }
  },
  computed: {
    scrollBottom () {
      return this.$store.getters['dictionaries/getters/handler/getScrollBottom']
    },
    webinarsData () {
      return this.$store.getters['education/getters/handler/getEducationWebinars']
    },
    nextWebinars () {
      return this.webinarsData.next
    },
    categories () {
      return this.webinarsData.categories.reduce((acc, item, index) => {
        if (index === 0) {
          acc.push({ type: null, title: this.$t('Все категории'), flag: 'all' })
        }
        acc.push({ ...item, flag: `${item.type}` })

        return acc
      }, [])
    },
    archiveWebinars () {
      return this.$store.getters['education/getters/handler/getWebinarsArchive']
    }
  },
  watch: {
    scrollBottom (newValue) {
      if (newValue === 0) {
        this.payload.page += 1
        this.fetchWebinars()
      }
    }
  },
  created () {
    this.fetchWebinars()
  },
  methods: {
    clickHandler (flag) {
      this.payload.type = flag
      this.payload.page = 1
      this.fetchWebinars()
    },
    openPopup (popupName) {
      this.$store.commit('dictionaries/mutations/handler/SAVE_POPUP_NAME', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: popupName
      })
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: true
      })
    },
    fetchWebinars () {
      const type = this.payload.type === 'all' ? null : this.payload.type
      const page = this.payload.page

      this.$store.dispatch('education/actions/handler/fetchEducationWebinars', { type, page })
    },
    fetchCurrentWebinar (currentWebinar) {
      this.$store.dispatch('education/actions/handler/fetchCurrentWebinar', currentWebinar.id)
      this.openPopup('education-webinar')
    },
    fetchWebinarRegistration (currentWebinar) {
      this.$store.dispatch('education/actions/handler/fetchWebinarRegistration', currentWebinar.id)
      this.openPopup('education-webinar-registration')
    }
  }
}
</script>
