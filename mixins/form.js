export default {
  props: {
    direction: {
      type: String,
      default: 'flex-column'
    },
    fieldClasses: {
      type: String,
      default: 'mb-4'
    },
    buttonClasses: {
      type: String,
      default: ''
    },
    isButtonShown: {
      type: Boolean,
      default: true
    },
    propForm: {
      type: Array,
      default: null
    },
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      changedForm: [],
      isFetchInfo: false,
      formKey: null
    }
  },
  computed: {
    form () {
      return this.propForm || this.$store.getters['forms/getters/handler/getForm']
    },
    formData () {
      return this.$store.getters['forms/getters/handler/getFormData'](this.formId)
    },
    buttonText () {
      return this.$store.getters['forms/getters/handler/getFormData'](this.formId).button
    },
    formId () {
      return this.id || this.formTitle
    },
    formTitle () {
      return this.$store.getters['forms/getters/handler/getFormTitle']
    },
    isFormSuccess () {
      return !this.changedForm.some(field => !!field.error)
    },
    formValues () {
      return this.changedForm.reduce((acc, field) => {
        acc[field.attribute] = field.value
        return acc
      }, {})
    },
    user () {
      return this.$store.getters['dictionaries/getters/user/getUser']
    },
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    },
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    needProfileTrader () {
      return this.$store.getters['profile/getters/handler/getNeedProfileTrader']
    }
  },
  watch: {
    form: {
      handler (newValue) {
        this.changedForm = newValue
      },
      deep: true
    }
  },
  created () {
    this.$store.dispatch('dictionaries/actions/handler/togglePreloader', false)
  },
  mounted () {
    const formButton = this.$refs['form-button']
    if (this.isButtonShown && formButton) {
      formButton.focus()
    }
    this.changedForm = this.form
  },
  methods: {
    onSubmit (e) {
      if (e) {
        e.preventDefault()
      }

      this.checkForm()

      this.isFormSuccess ? this.saveForm() : this.openErrorPopup()
    },
    setValue (value, attribute) {
      if (this.formTitle === 'withdrawalRequest') {
        this.isFetchInfo = true
      }
      this.changedForm = this.changedForm.map((field) => {
        if (field.attribute === attribute) {
          field.error = null
          switch (attribute) {
            case 'trader_enable':
              if (value === 0) {
                field.value = value
              } else if (this.needProfileTrader.need_balance) {
                this.openErrorPopup(
                  'error',
                  'Минимальный баланс для добавления в рейтинг трейдеров составляет {amount}',
                  { amount: `${this.needProfileTrader.need_balance} USD` }
                )
              } else if (this.needProfileTrader.need_trader_questionnaire) {
                this.fetchForm('questionnaireTrader')
              } else if (this.needProfileTrader.need_username) {
                this.fetchForm('editUsername')
              } else {
                field.value = value
              }
              break
            case 'experience_instruments':
            case 'options':
              if (field.value.includes(value)) {
                field.value = field.value.filter(val => val !== value)
              } else {
                field.value.push(value)
              }
              break
            default:
              field.value = value
          }
        }
        return field
      })
      this.checkValue(this.formId, value, attribute)
    },
    checkValue (formId, value, attribute) {
      switch (formId) {
        case 'registration':
          if (attribute === 'country') {
            this.fetchForm('registration')
          }
          break
        case 'registrationPage':
          if (attribute === 'country') {
            this.fetchForm('registrationPage')
          }
          break
        case 'financeHistory':
          this.$store.dispatch('finance/actions/handler/fetchFinanceHistoryCount', this.formValues)
          break
        case 'depositRequest':
        case 'depositRequestModal':
        case 'depositRequestCard':
          if (value && attribute === 'card') {
            this.changedForm = this.$form.filterForm(this.changedForm, ['number', 'holder', 'expire'])
          } else if (!value && attribute === 'card') {
            this.changedForm = this.form
          }
          break
        case 'affiliateCalculator':
          this.saveForm()
          break
      }
    },
    getField (attribute) {
      return this.changedForm.find(field => field.attribute === attribute)
    },
    checkForm () {
      this.changedForm = this.$form.resetFormErrors(this.changedForm)
      this.changedForm = this.$form.checkForm(this.changedForm)
    },
    saveForm () {
      this.$store.dispatch('forms/actions/handler/saveForm', { formId: this.formId, values: this.formValues })
    },
    fetchForm (formTitle) {
      this.$store.dispatch('forms/actions/handler/fetchForm', formTitle)
    },
    savePopupName (popupName) {
      this.$store.commit('dictionaries/mutations/handler/SAVE_POPUP_NAME', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: popupName
      })
    },
    togglePopup (flag) {
      this.$store.commit('dictionaries/mutations/handler/TOGGLE_POPUP', {
        rootData: this.$store.state.dictionaries.state.handler,
        data: flag
      })
    },
    openErrorPopup (title = 'error', text = 'Произошла ошибка', textSettings = {}) {
      this.$store.dispatch('dictionaries/actions/handler/openErrorToast', { title, description: this.$t(text, textSettings) })
    },
    recalculateKey () {
      this.formKey = Math.floor(Math.random() * 1000000)
    }
  }
}
