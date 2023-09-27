const formFieldsOrder = {
  editAddress: ['country', 'region', 'city', 'address', 'postcode'],
  registration: ['country', 'full_name', 'email', 'login', 'phone', 'password', 'currency', 'agreement', 'privacy', 'mailing'],
  notifications: ['low_margin_level', 'email_low_margin', 'sms_low_margin', 'email_trading', 'email_company', 'email_analytics', 'email_offers', 'email_blog', 'email_mt'],
  twitterWatcher: ['account', 'agreement'],
  affiliatePrograms: ['name', 'email', 'phone', 'telegram', 'country', 'city', 'is_regulated', 'is_restrictions', 'payment_systems', 'languages', 'average_salary', 'office', 'is_broker', 'company_registration', 'taxation', 'messengers', 'facebook', 'advertising', 'competitors', 'business_contacts', 'marketing', 'active_client_count', 'sub_partners', 'deposit', 'options', 'options_other', 'plan_to_generate', 'course', 'representative_company_name', 'work_period', 'info']
  // addWallet: ['beneficiary_name', 'beneficiary_account', 'bank_code', 'bank_branch_name']
}

export default ({ app }, inject) => {
  function updateForm (form) {
    return form.map((field) => {
      const newField = {
        attribute: field.attribute,
        label: field.label,
        relations: field.relations,
        type: getFieldType(field),
        value: field.value,
        values: field.values ? field.values.map(val => ({ text: val[1], value: val[0] })) : null,
        regular: [],
        hint: field.hint || null,
        string: null,
        required: null,
        error: null
      }

      if (newField.type === 'checkbox') {
        if (typeof field.value === 'string') {
          newField.value = field.value
        } else {
          newField.value = field.value === true ? 1 : field.value === false ? 0 : typeof field.value === 'number' ? field.value : 0
        }
      }

      field.rules.forEach((rule) => {
        if (rule.type === 'regular') {
          newField.regular.push({
            message: rule.message,
            pattern: new RegExp(rule.pattern.replace(/[#$is]/gi, ''))
          })
        }
        if (rule.type === 'string') {
          newField.string = {
            message: rule.message ? rule.message.replace(/{ATTRIBUTE}/gi, field.label) : '',
            max: rule.max || 999999,
            min: rule.min || 0
          }
        }
        if (rule.type === 'required') {
          newField.required = {
            message: rule.message.replace(/{ATTRIBUTE}/gi, field.label)
          }
        }
        if (rule.type === 'in' && field.attribute !== 'office') {
          newField.in = {
            message: rule.message.replace(/{ATTRIBUTE}/gi, field.label),
            range: rule.range
          }
        }
        if (rule.type === 'numeric') {
          newField.numeric = {
            message: rule.message.replace(/{ATTRIBUTE}/gi, field.label),
            max: rule.max || 999999,
            min: rule.min || 0
          }
        }
      })
      return newField
    })
  }
  function getFieldType (field) {
    if (field.attribute === 'office') {
      return 'text'
    }

    return field.type.toLowerCase()
  }

  function updateFormErrors (form, errors) {
    let changedForm = form

    Object.entries(errors)
      .map(e => ({ attribute: e[0], error: e[1] }))
      .forEach((e) => {
        changedForm = changedForm.map((field) => {
          if (field.attribute === e.attribute) {
            field.error = e.error
          }
          return field
        })
      })

    return changedForm
  }

  function checkRelations (form, field) {
    field.relations.forEach((item) => {
      const relationField = form.find(el => el.attribute === item.field)

      if (relationField && item.values.includes(relationField.value)) {
        checkErrors(field)
      }
    })
  }

  function checkErrors (field) {
    if (['', null].includes(field.value) && field.required) {
      field.error = field.required.message
    } else if (!['', null].includes(field.value) && field.string) {
      const val = field.value.split('')

      if (val.length < field.string.min || val.length > field.string.max) {
        field.error = field.string.message
      }
    } else if (field.in && field.in.range && field.in.range.length && field.type === 'select') {
      field.error = null
    } else if (field.in && field.value && typeof field.value === 'object' && field.value.length) {
      const isError = !field.value.some((val) => {
        return field.in.range.some((el) => {
          // eslint-disable-next-line eqeqeq
          return el == val || el === val
        })
      })

      if (isError) {
        field.error = field.in.message
      }
    } else if (field.in && field.in.range && field.in.range.length && !field.in.range.includes(field.value)) {
      field.error = field.in.message
    } else if (field.regular.length) {
      field.regular.forEach((regular) => {
        if (!regular.pattern.test(field.value)) {
          field.error = regular.message
        }
      })
    }
  }

  function checkForm (form) {
    return form.map((field) => {
      field.relations ? checkRelations(form, field) : checkErrors(field)
      return field

      // else if (field.numeric) {
      //   const val = field.value.split('')
      //   if (val.length < field.numeric.min || val.length > field.numeric.max) {
      //     field.error = field.numeric.message
      //   }
      // }
      //
      //
      // else if (field.type === 'checkbox' && field.value === 0 && field.required) {
      //   field.error = field.required.message
      // }
    })
  }

  function filterForm (form, attributes) {
    return form.filter(field => !attributes.includes(field.attribute))
  }

  function resetFormErrors (form) {
    return form.map((field) => {
      field.error = null
      return field
    })
  }

  function resortForm (form, keys) {
    return keys
      .map(key => form.find(field => field.attribute === key))
      .filter(field => field)
  }

  function setFormParams (form, params, formTitle, amount) {
    const routePages = app.store.getters['dictionaries/getters/handler/getRoutePages']
    const fieldCountry = form.find(field => field.attribute === 'country')
    const country = fieldCountry ? fieldCountry.value : null

    const userId = ['trades', 'trades-history', 'info'].includes(routePages.current) ? routePages.second : routePages.current
    const activeMethod = app.store.getters['finance/getters/handler/getActiveMethod']
    const activeCard = app.store.getters['finance/getters/handler/getActiveCard']

    const campaignId = localStorage.getItem('campaign_id')

    const prevStepQuestEu = localStorage.getItem('step_quest_eu')

    const programType = localStorage.getItem('program-type')

    let promoData = localStorage.getItem('handout_data')

    if (promoData) {
      promoData = JSON.parse(promoData)
    }

    switch (formTitle) {
      case 'registration':
      case 'registrationPage':
        return {
          ...params,
          country: country || localStorage.getItem('country'),
          uid: localStorage.getItem('uid'),
          cid: localStorage.getItem('cid'),
          promo_code: localStorage.getItem('promo_code'),
          _lang: routePages.locale
        }
      case 'demoDeposit':
        return { ...params, amount }
      case 'copyAction':
      case 'copyActionTrader':
        return { ...params, id: app.store.getters['trading/getters/handler/getOpenedTrade'].user_id || userId }
      case 'addBankCard':
        return { ...params, method: 'card' }
      case 'addBankTransfer':
        return { ...params, method: activeMethod }
      case 'editBank':
        return { ...params, id: activeCard.id }
      case 'affiliateEditCompany':
        return { ...params, id: campaignId }
      case 'affiliateCreateCompany':
        return { ...params, type: programType }
      case 'withdrawalRequest':
      case 'withdrawalRequestModal':
      case 'depositRequest':
      case 'depositRequestModal':
      case 'depositRequestCard':
      case 'addWallet':
      case 'addBank':
      case 'addCard':
        return { ...params, method: activeMethod }
      case 'questionnaireEu':
      case 'questionnaireTrader':
        return { ...params, step: prevStepQuestEu }
      case 'affiliatePromoMakeApp':
        return { ...params, type: promoData.activeCategory, file: promoData.file }
      default:
        return params
    }
  }

  inject('form', {
    updateForm,
    updateFormErrors,
    checkForm,
    resetFormErrors,
    resortForm,
    setFormParams,
    filterForm,
    formFieldsOrder
  })
}
