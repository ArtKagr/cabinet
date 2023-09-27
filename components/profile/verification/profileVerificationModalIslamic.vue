<template>
  <div class="modal-container-content">
    <a
      class="text-decoration-none text-transform-none"
      target="_blank"
      href="https://www.liteforex.com/uploads/documents/pdf-litefinance/litefinance-request-to-transfer-account-to-islamic-account-en.pdf?_ga=2.150646326.1447102853.1631519292-1128114120.1631519292"
    >
      <b-button variant="outline-primary" class="w-100" v-text="$t('Условия предоставления сервиса {name}', { name: 'Islamic Account' })" />
    </a>
    <div class="modal-container-content-agreement mt-4">
      <b-icon-square class="modal-container-content-agreement-checkbox" />
      <span v-text="$t('Я прочитал и принимаю условия предоставления сервиса')" />
    </div>
    <b-button variant="primary" class="mt-4" v-text="$t('Отправить')" />
  </div>
</template>

<script>
export default {
  name: 'ProfileVerificationModalIslamic'
}
</script>
