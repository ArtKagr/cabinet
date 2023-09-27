import Vue from 'vue'

Vue.prototype.$pluralize = (amount, words) => {
  try {
    const cases = [2, 0, 1, 1, 1, 2]
    return amount + ' ' + (words[(amount % 100 > 4 && amount % 100 < 20) ? 2 : cases[Math.min(amount % 10, 5)]] || words[1])
  } catch (e) {
    console.warn(e)
  }
}
