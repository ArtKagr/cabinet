export const getters = {
  // Данные юзера
  getUser: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.dictionaries.state.user.data)),
  // Суб профили юзера
  getSubUsers: (state, getters) => getters.getUser.sub_users.map((user, key) => {
    if ([null, ''].includes(user.name)) {
      user.name = `Sub profile ${key + 1}`
    }
    return user
  }),
  // Авторизационные данные
  getAuthorization: (state, getters, rootState) => JSON.parse(JSON.stringify(rootState.dictionaries.state.user.authorization)),
  // Токен для авторизации
  getUserToken: () => localStorage.getItem('user_token') || null,
  // ID авторизированного юзера
  getAuthorizationUserId: (state, getters, rootState, rootGetters) => {
    return localStorage.getItem('user_id') || rootGetters['dictionaries/getters/user/getAuthorization'].id || 1
  },
  // Режим авторизованного юзера
  getIsAuthUser: (state, getters) => !getters.getUser.is_demo_tour && !getters.getUser.is_guest,
  // Режим демо авторизованного пользователя
  getIsAuthUserDemo: (state, getters) => getters.getIsAuthUser && getters.getUser.mode === 0,
  // Режим гостя
  getIsGuest: (state, getters) => getters.getUser.is_guest && !getters.getUser.is_demo_tour,
  // Токен для получения данных в режиме демо-тур
  getGuestUserToken: (state, getters, rootState) => rootState.dictionaries.state.user.guestUserToken,
  //
  isDemoTour: (state, getters) => getters.getUser.is_demo_tour && !getters.getUser.is_guest,
  //
  getIsDemo: (state, getters) => getters.getUser.is_demo_tour || getters.getUser.is_guest,
  // EU/MI аккаунт
  isEuAccount: (state, getters) => getters.getUser.is_eu
}
