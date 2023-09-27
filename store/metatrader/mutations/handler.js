export const mutations = {
  // Изменение данных страницы метатрейдер
  SAVE_METATRADER_DATA (state, payload) {
    payload.rootData.metatraderData = payload.data
    payload.rootData.actualAccount = Object.assign(JSON.parse(JSON.stringify(payload.rootData.actualAccount)), payload.data)
    payload.rootData.primaryAccount = payload.data.primary
  },
  // Изменение актуального аккаунта
  SAVE_ACTUAL_ACCOUNT (state, payload) {
    payload.rootData.actualAccount = Object.assign(JSON.parse(JSON.stringify(payload.rootData.actualAccount)), payload.data)
  },
  // VPS информация
  SAVE_VPS_INFO (state, payload) {
    payload.rootData.vpsInfo = payload.data
  }
}
