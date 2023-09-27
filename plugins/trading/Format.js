export default ({ app }, inject) => {
  function number (value) {
    value = Math.round(value * 100) / 100
    value = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

    return app.store.$dir() === 'rtl' ? '\u202A' + value + '\u202C' : value
  }

  function numberPlus (value) {
    let string = number(value)
    string = value > 0 ? `+${string}` : string

    return app.store.$dir() === 'rtl' ? '\u202A' + string + '\u202C' : string
  }

  function percent (value) {
    value = value + '%'

    return app.store.$dir() === 'rtl' ? '\u202A' + value + '\u202C' : value
  }

  function numberClass (value) {
    if (value === 0) {
      return ''
    }

    return value > 0 ? 'green' : 'red'
  }

  function moneyClear (text) {
    return parseFloat(text.replace(' ', '').replace(' ', '')) || 0
  }

  function numberClear (text) {
    return parseFloat(text) || 0
  }

  function secToTime (seconds) {
    const hour = seconds / 3600 ^ 0
    const min = (seconds - hour * 3600) / 60 ^ 0
    const sec = seconds - hour * 3600 - min * 60

    return {
      hour: hour < 10 ? `0${hour}` : hour,
      min: min < 10 ? `0${min}` : min,
      sec: sec < 10 ? `0${sec}` : sec
    }
  }

  inject('format', {
    number,
    numberPlus,
    percent,
    numberClass,
    moneyClear,
    numberClear,
    secToTime
  })
}
