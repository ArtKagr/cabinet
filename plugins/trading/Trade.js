import {
  CMD_BUY,
  CMD_SELL,
  CMD_BUY_LIMIT,
  CMD_SELL_LIMIT,
  CMD_BUY_STOP,
  CMD_SELL_STOP,
  CMD_BUY_STOP_LIMIT,
  CMD_SELL_STOP_LIMIT
} from '@/plugins/trading/Constants'

export default ({ app }, inject) => {
  function isCurrentTrade (cmd) {
    return [CMD_BUY, CMD_SELL].includes(cmd)
  }

  function isBuy (cmd) {
    return [CMD_BUY, CMD_BUY_LIMIT, CMD_BUY_STOP, CMD_BUY_STOP_LIMIT].includes(cmd)
  }

  function getPriceType (cmd) {
    return isBuy(cmd) ? 'bid' : 'ask'
  }

  function getCmdStatus (cmd) {
    switch (cmd) {
      case CMD_BUY:
      case CMD_BUY_LIMIT:
      case CMD_BUY_STOP:
      case CMD_BUY_STOP_LIMIT:
        return '-buy'
      case CMD_SELL:
      case CMD_SELL_LIMIT:
      case CMD_SELL_STOP:
      case CMD_SELL_STOP_LIMIT:
        return '-sell'
      default:
        return ''
    }
  }

  function getCmdLabel (cmd, isBet = false) {
    if (isBet) {
      switch (cmd) {
        case CMD_BUY:
        case CMD_BUY_LIMIT:
        case CMD_BUY_STOP:
        case CMD_BUY_STOP_LIMIT:
          return 'Вверх'
        case CMD_SELL:
        case CMD_SELL_LIMIT:
        case CMD_SELL_STOP:
        case CMD_SELL_STOP_LIMIT:
          return 'Вниз'
        default:
          return ''
      }
    } else {
      switch (cmd) {
        case CMD_BUY:
          return 'Покупка'
        case CMD_SELL:
          return 'Продажа'
        case CMD_BUY_LIMIT:
          return 'Покупка по цене'
        case CMD_SELL_LIMIT:
          return 'Продажа по цене'
        case CMD_BUY_STOP:
          return 'Покупка по цене'
        case CMD_SELL_STOP:
          return 'Продажа по цене'
        case CMD_BUY_STOP_LIMIT:
          return 'Покупка по цене'
        case CMD_SELL_STOP_LIMIT:
          return 'Продажа по цене'
        default:
          return ''
      }
    }
  }
  inject('trade', {
    isCurrentTrade,
    isBuy,
    getPriceType,
    getCmdStatus,
    getCmdLabel
  })
}
