<template>
  <div class="d-flex" :class="isRtlMode ? 'justify-content-end' : ''">
    <svg
      v-if="priority === 1"
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="3" cy="3" r="3" fill="#C8ECD4" />
    </svg>
    <svg
      v-if="priority === 2"
      width="14"
      height="6"
      viewBox="0 0 14 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="3" cy="3" r="3" fill="#91D9A9" />
      <circle cx="11" cy="3" r="3" fill="#91D9A9" />
    </svg>
    <svg
      v-if="priority === 3"
      width="22"
      height="6"
      viewBox="0 0 22 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="3" cy="3" r="3" fill="#47BF6F" />
      <circle cx="11" cy="3" r="3" fill="#47BF6F" />
      <circle cx="19" cy="3" r="3" fill="#47BF6F" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'LfxCalendarPriority',
  props: {
    priority: {
      type: Number,
      default: 1
    }
  },
  computed: {
    isRtlMode () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode']
    }
  }
}
</script>
