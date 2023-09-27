<template>
  <div class="menu" :class="source ? `-${source}` : ''">
    <div class="d-flex justify-content-between" :class="isMobileTradersInstrumentsList ? 'flex-wrap mb-2' : ''">
      <div v-if="title" class="d-flex align-items-center" :class="[noMarginTitle ? 'm-0' : 'mb-2', isMobileTradersInstrumentsList ? 'mb-2' : '']">
        <span class="menu-title" v-text="title" />
        <slot name="button" />
      </div>
      <slot name="settings" />
    </div>
    <div v-if="menu && menu.length" class="slider-menu">
      <ul v-if="windowWidthNumber > 1000" class="menu-items -static">
        <li v-for="item in menu" :key="item.flag" class="menu-items-item" :class="isRtlMode ? '-rtl' : '-ltr'" @click="setActiveMenuItem(item)">
          <nuxt-link
            v-if="source"
            class="menu-items-item-link"
            :class="item.flag === activeMenuItem || item.route === activeMenuItem ? '-active' : ''"
            :to="`/${routePages.locale}/${source}${item.route ? `/${item.route}` : ''}`"
            v-text="item.title"
          />
          <span
            v-else
            class="menu-items-item-link"
            :class="item.flag === activeMenuItem || item.route === activeMenuItem ? '-active' : ''"
            v-text="item.title"
          />
        </li>
      </ul>
      <flickity
        v-else
        class="menu-items"
        :options="flickityOptions"
        style="height: 23px;"
      >
        <li v-for="item in menu" :key="item.flag" class="menu-items-item" :class="isRtlMode ? '-rtl' : '-ltr'" @click="setActiveMenuItem(item)">
          <nuxt-link
            v-if="source"
            class="menu-items-item-link"
            :class="item.flag === activeMenuItem || item.route === activeMenuItem ? '-active' : ''"
            :to="`/${routePages.locale}/${source}${item.route ? `/${item.route}` : ''}`"
            v-text="item.title"
          />
          <span
            v-else
            class="menu-items-item-link"
            :class="item.flag === activeMenuItem || item.route === activeMenuItem ? '-active' : ''"
            v-text="item.title"
          />
        </li>
      </flickity>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LfxMenuLinks',
  props: {
    source: {
      type: String,
      default: null
    },
    menu: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: null
    },
    activeItem: {
      type: String,
      default: null
    },
    noMarginTitle: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    },
    isMobileTradersInstrumentsList () {
      return this.windowWidth === 'sm' && ['trading', 'traders'].includes(this.source)
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    activeMenuItem () {
      return this.activeItem || this.$store.getters['dictionaries/getters/handler/getActiveMenuLinksItem']
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
    },
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    windowWidthNumber () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    }
  },
  created () {
    setTimeout(() => {
      this.isVisible = true
    }, 500)
    if (this.routePages.parent) {
      this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_LINKS_ITEM', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: this.routePages.current
      })
    }
  },
  destroyed () {
    this.isVisible = false
    this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_LINKS_ITEM', {
      rootData: this.$store.state.dictionaries.state.handler,
      data: null
    })
  },
  methods: {
    setActiveMenuItem (item) {
      this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_LINKS_ITEM', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: item.flag
      })
      this.$emit('click-handler', item.flag)
    }
  }
}
</script>
<style lang="scss" scoped>
  .slider-menu {
    padding: 0;
    display: flex;
  }

a {
  color: #8e9aac;
  text-decoration: none;

  display: inline-block;
  position: relative;

  &:hover {
    color: #8e9aac;
  }
}
a:after {
  background: none repeat scroll 0 0 #3498db;
  content: "";
  display: block;
  transform: translateY(1px);
  height: 1px;
  left: 50%;
  position: absolute;
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 0;
}
a:hover:after {
  width: 100%;
  left: 0;
}
</style>
