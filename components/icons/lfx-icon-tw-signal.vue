<template>
  <svg
    v-if="accuracy <= 30"
    width="62"
    height="10"
    viewBox="0 0 62 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="5" cy="5" r="5" fill="#ECEDF1" />
    <circle cx="18" cy="5" r="5" fill="#ECEDF1" />
    <circle cx="31" cy="5" r="5" fill="#ECEDF1" />
    <circle cx="44" cy="5" r="5" fill="#ECEDF1" />
    <circle cx="57" cy="5" r="5" fill="#ECEDF1" />
  </svg>
  <svg
    v-else-if="accuracy > 30 && accuracy <= 40"
    width="62"
    height="10"
    viewBox="0 0 62 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="5" cy="5" r="5" fill="#47BF6F" />
    <circle cx="18" cy="5" r="5" fill="#ECEDF1" />
    <circle cx="31" cy="5" r="5" fill="#ECEDF1" />
    <circle cx="44" cy="5" r="5" fill="#ECEDF1" />
    <circle cx="57" cy="5" r="5" fill="#ECEDF1" />
  </svg>
  <svg
    v-else-if="accuracy > 40 && accuracy <= 50"
    width="62"
    height="10"
    viewBox="0 0 62 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="5" cy="5" r="5" fill="#47BF6F" />
    <circle cx="18" cy="5" r="5" fill="#47BF6F" />
    <circle cx="31" cy="5" r="5" fill="#ECEDF1" />
    <circle cx="44" cy="5" r="5" fill="#ECEDF1" />
    <circle cx="57" cy="5" r="5" fill="#ECEDF1" />
  </svg>
  <svg
    v-else-if="accuracy > 50 && accuracy <= 60"
    width="62"
    height="10"
    viewBox="0 0 62 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="5" cy="5" r="5" fill="#47BF6F" />
    <circle cx="18" cy="5" r="5" fill="#47BF6F" />
    <circle cx="31" cy="5" r="5" fill="#47BF6F" />
    <circle cx="44" cy="5" r="5" fill="#ECEDF1" />
    <circle cx="57" cy="5" r="5" fill="#ECEDF1" />
  </svg>
  <svg
    v-else-if="accuracy > 60 && accuracy <= 70"
    width="62"
    height="10"
    viewBox="0 0 62 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="5" cy="5" r="5" fill="#47BF6F" />
    <circle cx="18" cy="5" r="5" fill="#47BF6F" />
    <circle cx="31" cy="5" r="5" fill="#47BF6F" />
    <circle cx="44" cy="5" r="5" fill="#47BF6F" />
    <circle cx="57" cy="5" r="5" fill="#ECEDF1" />
  </svg>
  <svg
    v-else-if="accuracy > 70"
    width="62"
    height="10"
    viewBox="0 0 62 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="5" cy="5" r="5" fill="#47BF6F" />
    <circle cx="18" cy="5" r="5" fill="#47BF6F" />
    <circle cx="31" cy="5" r="5" fill="#47BF6F" />
    <circle cx="44" cy="5" r="5" fill="#47BF6F" />
    <circle cx="57" cy="5" r="5" fill="#47BF6F" />
  </svg>
</template>

<script>
export default {
  name: 'LfxIconTwSignal',
  props: {
    accuracy: {
      type: Number,
      default: null
    }
  }
}
</script>
