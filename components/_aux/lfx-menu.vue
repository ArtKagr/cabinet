<template>
  <div class="menu -static_menu" :class="borderless ? '-borderless' : ''">
    <ul v-if="windowWidth === 'xl' || windowWidth === 'lg' || staticMenu" class="menu-items -static" :class="[`-${dir}`, marginless ? 'm-0' : '']">
      <li v-for="item in menu" :key="item.flag" class="menu-items-item" :class="`-${dir}`" @click="setActiveMenuItem(item)">
        <a
          class="menu-items-item-link"
          :class="item.flag === activeMenuItem || item.route === activeMenuItem ? '-active' : ''"
          v-text="item.title"
        />
      </li>
    </ul>
    <flickity v-else ref="flickity" class="menu-items" :options="flickityOptions">
      <li v-for="item in menu" :key="item.flag" class="menu-items-item" :class="`-${dir}`" @click="setActiveMenuItem(item)">
        <a class="menu-items-item-link" :class="item.flag === activeMenuItem ? '-active' : ''" v-text="item.title" />
      </li>
    </flickity>
  </div>
</template>

<script>
export default {
  name: 'LfxMenu',
  props: {
    menu: {
      type: Array,
      default: () => []
    },
    source: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    marginless: {
      type: Boolean,
      default: false
    },
    noRoute: {
      type: Boolean,
      default: false
    },
    staticMenu: {
      type: Boolean,
      default: false
    },
    noMarginTitle: {
      type: Boolean,
      default: false
    },
    activeItem: {
      type: String,
      default: null
    },
    borderless: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    routePages () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages']
    },
    activeMenuItem () {
      if (this.activeItem) {
        return this.activeItem
      } else {
        let result
        switch (this.source) {
          case 'profile-indicators':
            result = this.$store.getters['profile/getters/handler/getProfileIndicatorsActiveMenuItem']
            break
          default:
            result = this.$store.getters['dictionaries/getters/handler/getActiveMenuItem']
        }
        return result
      }
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
        rightToLeft: this.isRtlMode
      }
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    }
  },
  mounted () {
    if (this.routePages.parent) {
      this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_ITEM', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: this.routePages.current
      })
    }
  },
  destroyed () {
    this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_ITEM', {
      rootData: this.$store.state.dictionaries.state.handler,
      data: null
    })
  },
  methods: {
    async setActiveMenuItem (item) {
      switch (this.source) {
        case 'profile-indicators':
          await this.$store.commit('profile/mutations/handler/SET_PROFILE_INDICATORS_ACTIVE_MENU_ITEM', {
            rootData: this.$store.state.profile.state.handler,
            data: item.flag
          })
          break
        default:
          await this.$store.commit('dictionaries/mutations/handler/SET_ACTIVE_MENU_ITEM', {
            rootData: this.$store.state.dictionaries.state.handler,
            data: item.flag
          })
      }
      this.$emit('click-handler', item.flag)
    }
  }
}
</script>
<style lang="scss" scoped>
a {
  color: #8e9aac;
  text-decoration: none;

  display: inline-block;
  position: relative;
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
