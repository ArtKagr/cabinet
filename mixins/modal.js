export default {
  props: {
    type: {
      type: String,
      default: 'modal'
    }
  },
  data () {
    return {
      inputSearchValue: ''
    }
  },
  computed: {
    isPopupShown () {
      return this.$store.getters['dictionaries/getters/handler/getIsPopupShown']
    },
    isSearchPopupShown () {
      return this.$store.getters['dictionaries/getters/handler/getIsSearchPopupShown']
    },
    isModalShown () {
      return this.$store.getters['dictionaries/getters/handler/getIsModalShown']
    },
    changedSearchValue: {
      get () {
        return this.inputSearchValue
      },
      set (newValue) {
        this.inputSearchValue = newValue
        this.search(newValue)
      }
    }
  },
  destroyed () {
    document.removeEventListener('keydown', this.closeToEscape)
  },
  mounted () {
    document.addEventListener('keydown', this.closeToEscape)
  },
  methods: {
    closeModal () {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_MODAL', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: false
      })
    },
    closePopup () {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: false
      })
    },
    closeSearchPopup () {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_SEARCH_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: false
      })
    },
    closeTradeOpenPopup () {
      this.$store.dispatch('dictionaries/actions/handler/toggleTradeOpenPopup', false)
    },
    closeTradeClosePopup () {
      this.$store.dispatch('dictionaries/actions/handler/toggleTradeClosePopup', false)
    },
    closeToEscape (key) {
      if (key.code === 'Escape') {
        if (this.type === 'popup-trade-open') {
          this.closeTradeOpenPopup()
        } else if (this.type === 'popup-trade-close') {
          this.closeTradeClosePopup()
        } else if (this.type === 'search-popup') {
          this.closeSearchPopup()
        } else if (this.type === 'modal' && !this.isPopupShown) {
          this.closeModal()
        } else {
          this.closePopup()
        }
      }
    },
    getCabinetSearch () {
      this.$refs[this.inputRef].focus()
      this.search(this.inputSearchValue)
    },
    search (value = '') {
      if (value.length >= 2) {
        this.$store.dispatch('dictionaries/actions/handler/cabinetSearch', value)
      } else if (value.length === 0) {
        this.closeSearchPopup()
      }
    }
  }
}
