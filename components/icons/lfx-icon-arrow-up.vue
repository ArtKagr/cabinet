<template>
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1L14 13H0L7 1Z" :fill="fill" />
  </svg>
</template>
<script>
export default {
  props: {
    fill: {
      type: String,
      default: '#FF4B55'
    }
  }
}
</script>
