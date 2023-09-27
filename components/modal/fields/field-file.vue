<template>
  <div class="field-file">
    <b-form-file v-model="file" :lang="lang" @input="fileChanged" />
  </div>
</template>

<script>
export default {
  name: 'FieldFile',
  data () {
    return {
      file: null
    }
  },
  computed: {
    lang () {
      return this.$store.getters['dictionaries/getters/handler/getRoutePages'].locale
    }
  },
  methods: {
    fileChanged (newFile) {
      this.$emit('change', newFile)
    }
  }
}
</script>
<style lang="scss">
  .field-file {

    .custom-file-input:focus ~ .custom-file-label {
      box-shadow: none !important;
      border-color: #D9DCE1 !important;
    }

    div {
      height: 41px !important;

      input {
        height: 41px !important;
      }

      label {
        padding-top: 10px !important;
        height: 41px !important;
        cursor: pointer;

        &::after {
          padding-top: 10px !important;
          height: 41px !important;
        }
      }
    }
  }
</style>
