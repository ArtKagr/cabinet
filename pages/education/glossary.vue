<template>
  <div class="education">
    <div class="education-glossary">
      <div v-if="windowWidth > 767" class="education-glossary-menu" :class="`-${dir}`">
        <span
          v-for="(item, key) in glossaryMenu"
          :key="key"
          class="education-glossary-menu-item"
          :class="[activeGlossaryMenuPoint === item ? '-active' : '', `-${dir}`]"
          @click="setActiveGlossaryMenuPoint(item)"
          v-text="item"
        />
      </div>
      <flickity v-else :options="flickityOptions" class="mb-3 bg-white border-light-secondary">
        <span
          v-for="(item, key) in glossaryMenu"
          :key="key"
          class="education-glossary-menu-item"
          :class="activeGlossaryMenuPoint === item ? '-active' : ''"
          @click="setActiveGlossaryMenuPoint(item)"
          v-text="item"
        />
      </flickity>
      <div class="education-glossary-data">
        <div v-for="(item, key) in activeGlossaryPart" :key="key" class="education-glossary-data-item">
          <span class="education-glossary-data-item-title" :class="`-${dir}`" v-text="key" />
          <span class="education-glossary-data-item-description" :class="`-${dir}`" v-text="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Glossary',
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Глоссарий')} | ${this.$t('Обучение')}`)
    }
  },
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    windowWidth () {
      return Number(this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth'])
    },
    glossary () {
      return this.$store.getters['education/getters/handler/getGlossary']
    },
    activeGlossaryMenuPoint () {
      return this.$store.getters['education/getters/handler/getActiveGlossaryMenuPoint']
    },
    activeGlossaryPart () {
      return this.glossary[this.activeGlossaryMenuPoint]
    },
    glossaryMenu () {
      return Object.keys(this.glossary)
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
    this.$store.dispatch('education/actions/handler/fetchEducationGlossary')
  },
  methods: {
    setActiveGlossaryMenuPoint (point) {
      this.$store.commit('education/mutations/handler/UPDATE_ACTIVE_EDUCATION_GLOSSARY_MENU_POINT', {
        rootData: this.$store.state.education.state.handler,
        data: point
      })
    }
  }
}
</script>
<style lang="scss" scoped>
a {
  color: #8e9aac;
  text-decoration: none;
}
a:after {
  background: none repeat scroll 0 0 #3498db;
  content: "";
}
a:hover:after {
  width: 100%;
  left: 0;
}
</style>
