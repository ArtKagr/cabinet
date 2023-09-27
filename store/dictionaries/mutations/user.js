export const mutations = {
  // Сохранение данных юзера
  SAVE_USER (state, payload) {
    payload.rootData.data = payload.data
  },
  TOGGLE_TWITTER_WATCHER (state, payload) {
    payload.rootData.data.is_twitter_watcher = payload.data
  },
  // Сохранение информации об авторизированном пользователе
  SAVE_AUTHORIZATION_USER_DATA (state, payload) {
    payload.rootData.authorization = payload.data
    localStorage.setItem('user_id', payload.data.id)
    localStorage.setItem('secret_id', payload.data.secret_id)
    localStorage.setItem('user_token', payload.data.token)
  }
}
