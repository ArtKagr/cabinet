<template>
  <div class="education">
    <div class="d-flex flex-column mb-4" :class="windowWidth < 768 ? 'mb-2 mt-3 mx-3' : ''">
      <span class="menu-title mb-2" :class="`-${dir}`" v-text="$t('Часто задаваемые вопросы')" />
      <span class="text-secondary-14" :class="isRtlMode ? 'text-right' : ''">
        <span @click="openChat" v-html="$t('Не смогли найти ответ? Обратитесь в {link}службу технической поддержки{/link}', { link: '<a class=support-link>', '/link': '</a>' })" />
      </span>
    </div>
    <div class="education-faq">
      <flickity v-if="windowWidth < 768" :options="flickityOptions" class="mb-3 bg-white border-light-secondary">
        <div
          v-for="(item, elem) in faq"
          :key="elem"
          class="education-faq-menu-item -flickity"
          :class="elem === activeFaqTab ? '-active' : ''"
          @click="updateActiveFaqTab(elem)"
        >
          <span
            class="education-faq-menu-item-title"
            :class="[elem === activeFaqTab ? '-active' : '', `-${dir}`]"
            v-text="item.label"
          />
          <span
            class="education-faq-menu-item-text"
            :class="[elem === activeFaqTab ? '-active' : '', `-${dir}`]"
            v-text="$pluralize(item.items.length, [$t('вопрос'), $t('вопроса'), $t('вопросов')])"
          />
        </div>
      </flickity>
      <div class="education-faq-data" :class="`-${dir}`">
        <div
          v-for="(item, key) in activeFaqTabData.items"
          :key="key"
          class="education-faq-data-item"
          @click="openQuestion(key)"
        >
          <div class="d-flex align-items-center justify-content-between w-100">
            <span class="education-faq-data-item-title" v-text="item.label" />
            <div class="education-faq-data-item-icon" :class="[openedQuestion === key ? '-active' : '', `-${dir}`]">
              <lfx-icon-chevron-down />
            </div>
          </div>
          <div v-if="openedQuestion === key" class="education-faq-data-item-text" :class="`-${dir}`" v-html="item.text" />
        </div>
      </div>
      <div class="education-faq-menu">
        <div
          v-for="(item, elem) in faq"
          :key="elem"
          class="education-faq-menu-item"
          :class="elem === activeFaqTab ? '-active' : ''"
          @click="updateActiveFaqTab(elem)"
        >
          <span class="education-faq-menu-item-title" :class="`-${dir}`" v-text="item.label" />
          <span class="education-faq-menu-item-text" :class="`-${dir}`" v-text="$pluralize(item.items.length, [$t('вопрос'), $t('вопроса'), $t('вопросов')])" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LfxIconChevronDown from '~/components/icons/lfx-icon-chevron-down'
export default {
  name: 'Faq',
  components: { LfxIconChevronDown },
  data () {
    return {
      openedQuestion: null
    }
  },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Часто задаваемые вопросы')} | ${this.$t('Обучение')}`)
    }
  },
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    isAuthUser () {
      return this.$store.getters['dictionaries/getters/user/getIsAuthUser']
    },
    isDemoTour () {
      return this.$store.getters['dictionaries/getters/user/isDemoTour']
    },
    windowWidth () {
      return Number(this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth'])
    },
    activeFaqTab () {
      return this.$store.getters['education/getters/handler/getActiveEducationFaqTab']
    },
    faq () {
      return this.$store.getters['education/getters/handler/getFaq']
    },
    activeFaqTabData () {
      return this.faq[this.activeFaqTab]
    },
    flickityOptions () {
      return {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false,
        imagesLoaded: true,
        contain: true,
        cellAlign: this.isRtlMode ? 'right' : 'left',
        rightToLeft: this.isRtlMode,
        draggable: true
      }
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    }
  },
  created () {
    this.$store.dispatch('education/actions/handler/fetchEducationFaq')
  },
  mounted () {
    setTimeout(() => {
      const supportLink = document.querySelector('.support-link')
      supportLink.addEventListener('click', () => {
        this.$store.dispatch('chat/actions/handler/openCurrentRoom', { user_id: 2 })
        this.$store.commit('chat/mutations/handler/TOGGLE_CHAT_SIDEBAR', { rootData: this.$store.state.chat.state.handler, data: true })
      })
    }, 1000)
  },
  methods: {
    updateActiveFaqTab (key) {
      if (key !== this.activeFaqTab) {
        this.openedQuestion = null
      }
      this.$store.commit('education/mutations/handler/UPDATE_ACTIVE_EDUCATION_FAQ_TAB', {
        rootData: this.$store.state.education.state.handler,
        data: key
      })
    },
    openQuestion (key) {
      this.openedQuestion = this.openedQuestion === key ? null : key
    },
    async openChat () {
      if (this.isAuthUser || this.isDemoTour) {
        await this.$store.dispatch('chat/actions/handler/openCurrentRoom', { user_id: 2 })
        this.$store.commit('chat/mutations/handler/TOGGLE_CHAT_SIDEBAR', { rootData: this.$store.state.chat.state.handler, data: true })
      } else {
        this.$store.dispatch('dictionaries/actions/handler/showPopup', 'register-yet')
      }
    }
  }
}
</script>
