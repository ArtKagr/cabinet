<template>
  <div class="popup-chat-image">
    <img class="popup-chat-image-img" :src="chatImage" alt>
  </div>
</template>

<script>
export default {
  name: 'PopupChatImage',
  computed: {
    chatImage () {
      return this.$store.getters['chat/getters/handler/getActiveMessageImageUrl']
    }
  }
}
</script>
<style lang="scss">
  .popup-chat-image {
    display: flex;
    margin: 0 auto;

    &-img {
    }
  }
</style>
