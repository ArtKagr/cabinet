import {
  COPY_STATUS_DEFAULT,
  COPY_STATUS_DETACH,
  COPY_STATUS_LOCKED
} from '@/plugins/trading/Constants'

export default ({ app }, inject) => {
  function getStatusLabel (status) {
    switch (status) {
      case COPY_STATUS_DEFAULT:
        return 'Копирование'
      case COPY_STATUS_DETACH:
      case COPY_STATUS_LOCKED:
        return 'Открепление'
      default:
        return ''
    }
  }
  function getStatusClass (status) {
    switch (status) {
      case COPY_STATUS_DEFAULT:
        return '-copy'
      case COPY_STATUS_DETACH:
      case COPY_STATUS_LOCKED:
        return '-detach'
      default:
        return ''
    }
  }
  inject('copyTrading', {
    getStatusLabel,
    getStatusClass
  })
}
