<template>
  <div class="popup-education-webinar-registration">
    <div class="popup-education-webinar-registration-block">
      <span
        class="popup-education-webinar-registration-block-title"
        v-text="webinar.title"
      />
      <div
        class="popup-education-webinar-registration-block-text"
        v-html="webinar.text"
      />
      <div class="popup-education-webinar-registration-block-start">
        <span
          class="popup-education-webinar-registration-block-start-title"
          v-text="$t('Начало')"
        />
        <span
          class="popup-education-webinar-registration-block-start-time"
          v-text="`${webinar.date_start} ${webinar.timezone}`"
        />
      </div>
    </div>
    <div class="popup-education-webinar-registration-person">
      <div class="popup-education-webinar-data-person">
        <img class="popup-education-webinar-data-person-image" :src="webinar.author_avatar" alt>
        <div class="popup-education-webinar-data-person-description">
          <span class="popup-education-webinar-data-person-description-title" v-text="$t('Наш эксперт')" />
          <span class="popup-education-webinar-data-person-description-name" v-text="webinar.full_name" />
          <span class="popup-education-webinar-data-person-description-subtitle" v-text="webinar.desc" />
        </div>
      </div>
      <b-button
        class="popup-education-webinar-registration-person-button"
        variant="primary"
        @click="registerWebinar"
        v-text="$t('Записаться')"
      />
      <span
        class="popup-education-webinar-registration-person-text"
        v-text="$t('За час до начала вебинара вам придёт уведомление')"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupEducationWebinarRegistration',
  computed: {
    webinar () {
      return this.$store.getters['education/getters/handler/getWebinarRegistration']
    }
  },
  methods: {
    registerWebinar () {
      this.$store.dispatch('education/actions/handler/registerCurrentWebinar', this.webinar.id)
    }
  }
}
</script>
