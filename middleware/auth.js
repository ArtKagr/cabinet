export default function ({ store, redirect }) {
  if (!store.getters['dictionaries/getters/user/getUserToken']) {
    redirect(`${store.getters['dictionaries/getters/handler/getRoutePages'].locale}/trading/currency`)
  }
}
