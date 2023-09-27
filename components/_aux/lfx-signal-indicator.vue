<template>
  <div>
    <div v-if="indicator === 'right1'" class="d-flex align-items-center">
      <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="6" height="6" fill="#808080" />
      </svg>
    </div>
    <div v-else-if="indicator === 'down1'" class="d-flex align-items-center">
      <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5L0.669872 0.500001L9.33013 0.5L5 5Z" fill="#FF4B55" />
      </svg>
    </div>
    <div v-else-if="indicator === 'down2'" class="d-flex align-items-center">
      <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5L0.669872 0.500001L9.33013 0.5L5 5Z" fill="#FF4B55" />
      </svg>
      <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5L0.669872 0.500001L9.33013 0.5L5 5Z" fill="#FF4B55" />
      </svg>
    </div>
    <div v-else-if="indicator === 'down3'" class="d-flex align-items-center">
      <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5L0.669872 0.500001L9.33013 0.5L5 5Z" fill="#FF4B55" />
      </svg>
      <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5L0.669872 0.500001L9.33013 0.5L5 5Z" fill="#FF4B55" />
      </svg>
      <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5L0.669872 0.500001L9.33013 0.5L5 5Z" fill="#FF4B55" />
      </svg>
    </div>
    <div v-else-if="indicator === 'up1'" class="d-flex align-items-center">
      <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 0L9.33013 4.5H0.669873L5 0Z" fill="#47BF6F" />
      </svg>
    </div>
    <div v-else-if="indicator === 'up2'" class="d-flex align-items-center">
      <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 0L9.33013 4.5H0.669873L5 0Z" fill="#47BF6F" />
      </svg>
      <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 0L9.33013 4.5H0.669873L5 0Z" fill="#47BF6F" />
      </svg>
    </div>
    <div v-else-if="indicator === 'up3'" class="d-flex align-items-center">
      <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 0L9.33013 4.5H0.669873L5 0Z" fill="#47BF6F" />
      </svg>
      <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 0L9.33013 4.5H0.669873L5 0Z" fill="#47BF6F" />
      </svg>
      <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 0L9.33013 4.5H0.669873L5 0Z" fill="#47BF6F" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LfxSignalIndicator',
  props: {
    indicator: {
      type: String,
      default: 'stop'
    }
  }
}
</script>
