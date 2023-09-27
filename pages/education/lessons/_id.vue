<template>
  <div class="education-lessons-current">
    <lfx-menu
      class="education-lessons-current-menu"
      :menu="menu"
      :active-item="activeTab"
      @click-handler="clickHandler"
    />
    <div class="education-lessons-current-block">
      <div class="education-lessons-current-container">
        <div class="education-lessons-current-container-head">
          <div class="education-lessons-current-container-head-back" @click="backToLessons">
            <lfx-icon-arrow-back />
            <span v-text="$t('Вернуться к списку')" />
          </div>
          <div class="education-lessons-current-container-head-radio">
            <lfx-icon-radio />
            <lfx-icon-radio-fill />
            <span v-text="$t('Отметить как пройденное')" />
          </div>
        </div>
        <div class="education-lessons-current-container-data">
          <span class="education-lessons-current-container-data-title" v-text="currentLesson.title" />
          <div v-if="activeTab === 'video'" class="education-lessons-current-container-data-video">
            <span v-text="currentLesson.description" />
          </div>
          <div v-else class="education-lessons-current-container-data-text" v-html="currentLesson.text_version" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LfxMenu from '~/components/_aux/lfx-menu'
import LfxIconArrowBack from '~/components/icons/lfx-icon-arrow-back'
import LfxIconRadio from '~/components/icons/lfx-icon-radio'
import LfxIconRadioFill from '~/components/icons/lfx-icon-radio-fill'
export default {
  name: 'CurrentLesson',
  components: { LfxIconRadioFill, LfxIconRadio, LfxIconArrowBack, LfxMenu },
  data () {
    return {
      activeTab: 'video'
    }
  },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    currentLesson () {
      return this.$store.getters['education/getters/handler/getCurrentLesson']
    },
    menu () {
      // Меню страницы "Обучение"
      return [
        { title: this.$t('Видеоурок'), route: 'video', flag: 'video' },
        { title: this.$t('Текстовая версия'), route: 'text', flag: 'text' }
      ]
    }
  },
  created () {
    this.$store.dispatch('education/actions/handler/fetchCurrentLesson', this.routePages.current)
  },
  methods: {
    clickHandler (flag) {
      this.activeTab = flag
    },
    backToLessons () {
      this.$router.push(`/${this.routePages.locale}/education/lessons`)
    }
  }
}
</script>
