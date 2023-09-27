export default function ({ redirect }) {
  const userToken = localStorage.getItem('user_token')
  if (userToken && userToken !== '00000000000000000000000000000000') {
    redirect('/ru/trading/crypto')
  }
}
