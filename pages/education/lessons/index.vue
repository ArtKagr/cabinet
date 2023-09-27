<template>
  <div class="education-lessons">
    <div v-for="(block, key) in educationData" :key="key" class="education-lessons-container">
      <div v-for="(element, item) in block" :key="item" class="education-lessons-container-block">
        <div v-if="element.tests_title" class="education-lessons-container-block-content">
          <div class="education-lessons-container-block-content-block -test">
            <span class="education-lessons-container-block-content-block-title" v-text="element.tests_title" />
            <div v-if="element.tests_percent" class="education-lessons-container-block-content-block-data">
              <lfx-icon-check-round
                class="education-lessons-container-block-content-block-data-block-icon"
                :color="element.is_result ? '#47bf6f' : '#ff4b55'"
              />
              <span
                class="education-lessons-container-block-content-block-data-block-text"
                v-text="`${element.tests_percent}% правильных ответов`"
              />
            </div>
            <div v-else class="education-lessons-container-block-content-block-data">
              <span class="education-lessons-container-block-content-block-data-block-text" v-text="$t('Проверьте полученные знания')" />
            </div>
          </div>
        </div>
        <div v-else class="education-lessons-container-block-content">
          <div
            class="education-lessons-container-block-content-block"
            :class="{ '-is_active': visibleBlocks.includes(element.id) }"
            @click="toggleBlockVisible(element.id)"
          >
            <div class="d-flex flex-column">
              <span class="education-lessons-container-block-content-block-title" v-text="element.title" />
              <div class="education-lessons-container-block-content-block-data">
                <div class="education-lessons-container-block-content-block-data-block">
                  <lfx-icon-brains class="education-lessons-container-block-content-block-data-block-icon" />
                  <span class="education-lessons-container-block-content-block-data-block-text" v-text="element.level" />
                </div>
                <div class="education-lessons-container-block-content-block-data-block">
                  <lfx-icon-book class="education-lessons-container-block-content-block-data-block-icon" />
                  <span class="education-lessons-container-block-content-block-data-block-text" v-text="`${element.count} тема`" />
                </div>
                <div class="education-lessons-container-block-content-block-data-block">
                  <lfx-icon-check-round class="education-lessons-container-block-content-block-data-block-icon" />
                  <span
                    class="education-lessons-container-block-content-block-data-block-text"
                    v-text="`${$t('Пройдено')} ${element.percent_complete}%`"
                  />
                </div>
              </div>
            </div>
            <div class="education-lessons-container-block-content-block-icon" :class="{ '-is_active': visibleBlocks.includes(element.id) }">
              <lfx-icon-arrow2-right />
            </div>
          </div>
          <div v-if="visibleBlocks.includes(element.id)" class="education-lessons-container-block-content-accordion">
            <div
              v-for="lesson in element.lessons"
              :key="lesson.lesson_id"
              class="education-lessons-container-block-content-accordion-item"
              @click="openCurrentLesson(lesson)"
            >
              <lfx-icon-check-round
                v-if="lesson.check"
                style="width: 16px; height: 16px; margin-right: 14px;"
                class="education-lessons-container-block-content-accordion-icon"
                color="#47bf6f"
              />
              <span
                class="education-lessons-container-block-content-accordion-item-text"
                :class="lesson.check ? '-complete' : ''"
                v-text="lesson.lesson_title"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LfxIconBrains from '~/components/icons/lfx-icon-brains'
import LfxIconBook from '~/components/icons/lfx-icon-book'
import LfxIconCheckRound from '~/components/icons/lfx-icon-check-round'
import LfxIconArrow2Right from '~/components/icons/lfx-icon-arrow-2-right'
export default {
  name: 'Lessons',
  components: { LfxIconArrow2Right, LfxIconCheckRound, LfxIconBook, LfxIconBrains },
  data () {
    return {
      visibleBlocks: []
    }
  },
  computed: {
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    educationData () {
      return this.$store.getters['education/getters/handler/getEducationData']
    },
    currentLesson () {
      return this.$store.getters['education/getters/handler/getCurrentLesson']
    }
  },
  created () {
    this.$store.dispatch('education/actions/handler/fetchEducation')
  },
  methods: {
    toggleBlockVisible (id) {
      if (this.visibleBlocks.includes(id)) {
        this.visibleBlocks = this.visibleBlocks.filter(visibleBlockId => visibleBlockId !== id)
      } else {
        this.visibleBlocks.push(id)
      }
    },
    openCurrentLesson (lesson) {
      this.$router.push(`/${this.routePages.locale}/education/lessons/${lesson.lesson_id}`)
    }
  }
}
</script>

<style scoped>

</style>
