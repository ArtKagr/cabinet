<template>
  <div v-if="error.statusCode === '404'" class="error-page">
    <span class="error-page-title" :class="`-${dir}`" v-text="$t('Во время обработки Вашего запроса веб-сервером произошла ошибка.')" />
    <span class="error-page-text" :class="`-${dir}`" v-text="$t('Страница не найдена.')" />
  </div>
  <div v-else class="error-page">
    <span class="error-page-title" :class="`-${dir}`" v-text="error.statusCode" />
    <span class="error-page-text" :class="`-${dir}`" v-text="error.message" />
  </div>
</template>

<script>
export default {
  name: 'Error',
  // eslint-disable-next-line vue/require-prop-types
  props: ['error'],
  head () {
    return {
      title: this.$store.getters['dictionaries/getters/handler/getHeadTitle'](`(${this.errorData.statusCode}) ${this.errorData.message}`)
    }
  },
  computed: {
    dir () {
      return this.$store.getters['dictionaries/getters/handler/getIsRtlMode'] ? 'rtl' : 'ltr'
    },
    errorData () {
      return this.error
    }
  }
}
</script>
<style lang="scss">
  .error-page {
    display: flex;
    flex-direction: column;

    &-title {
      padding: 20px 30px 5px;
      margin-bottom: 10px;
      font-size: 20px;
      color: #3B4B68;

      &.-rtl {
        text-align: right;
      }

      @media screen and (max-width: 768px) {
        padding: 20px 10px 10px;
        margin-bottom: 0;
        font-size: 18px;
      }
    }

    &-text {
      padding: 0 30px;
      font-size: 14px;
      color: #788496;

      &.-rtl {
        text-align: right;
      }

      @media screen and (max-width: 768px) {
        padding: 0 10px;
      }
    }
  }
</style>
