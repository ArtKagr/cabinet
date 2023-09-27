<template>
  <svg
    id="L4"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 46 10"
    enable-background="new 0 0 0 0"
    xml:space="preserve"
  >
    <circle :fill="mode === 'light' ? '#fff' : '#3b4b68'" stroke="none" cx="5" cy="5" r="5">
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        begin="0.1"
      />
    </circle>
    <circle :fill="mode === 'light' ? '#fff' : '#3b4b68'" stroke="none" cx="23" cy="5" r="5">
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        begin="0.2"
      />
    </circle>
    <circle :fill="mode === 'light' ? '#fff' : '#3b4b68'" stroke="none" cx="41" cy="5" r="5">
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        begin="0.3"
      />
    </circle>
  </svg>
</template>
<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'light'
    }
  }
}
</script>
