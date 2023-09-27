<template>
  <div class="popup-education-webinar">
    <iframe
      class="popup-education-webinar-video"
      :width="windowWidth === 'sm' ? windowWidthNumber : 768"
      :height="windowWidth === 'sm' ? 400 : 484"
      :src="webinar.video_url"
    />
    <div class="popup-education-webinar-data">
      <div class="popup-education-webinar-data-description">
        <span class="popup-education-webinar-data-description-title" v-text="webinar.title" />
        <span class="popup-education-webinar-data-description-short_text" v-text="webinar.short_text" />
      </div>
      <div class="popup-education-webinar-data-person">
        <img class="popup-education-webinar-data-person-image" :src="webinar.author_avatar" alt>
        <div class="popup-education-webinar-data-person-description">
          <span class="popup-education-webinar-data-person-description-title" v-text="$t('Наш эксперт')" />
          <span class="popup-education-webinar-data-person-description-name" v-text="webinar.full_name" />
          <span class="popup-education-webinar-data-person-description-subtitle" v-text="webinar.desc" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupEducationWebinar',
  computed: {
    windowWidth () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentWindowWidth']
    },
    windowWidthNumber () {
      return this.$store.getters['dictionaries/getters/handler/getCurrentNumberWindowWidth']
    },
    webinar () {
      return this.$store.getters['education/getters/handler/getCurrentWebinar']
    }
  }
}
</script>
