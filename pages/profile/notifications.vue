<template>
  <div class="profile-page-verification">
    <form-notifications
      id="notifications"
      :form-title="defaultFormTitle"
      :prop-form="customForm"
      field-classes="mb-4"
    />
  </div>
</template>

<script>
import FormNotifications from '~/components/modal/forms/form-notifications'
export default {
  name: 'Notifications',
  components: {
    FormNotifications
  },
  data () {
    return {
      customForm: [],
      defaultFormTitle: 'notifications'
    }
  },
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`${this.$t('Уведомления')}`)
    }
  },
  computed: {
    formData () {
      return this.$store.getters['forms/getters/handler/getDefaultFormData']('notifications')
    }
  },
  async created () {
    await this.$store.dispatch('forms/actions/handler/fetchForm', 'notifications')
    this.copyForm()
  },
  methods: {
    copyForm () {
      this.customForm = this.$store.getters['forms/getters/handler/getForm']
    }
  }
}
</script>
