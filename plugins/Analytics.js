export default ({ app }, inject) => {
  function saveAnalyticsFeed ({ analytics = [], feed = [], page = 1 }) {
    if (page === 1) {
      return feed
    } else {
      return [...analytics, ...feed]
    }
  }

  function saveAnalyticsCalendar ({ events = [], calendar = [], page = 1 }) {
    if (page === 1) {
      return calendar
    } else {
      return [...events, ...calendar]
    }
  }

  inject('analytics', {
    saveAnalyticsFeed,
    saveAnalyticsCalendar
  })
}
