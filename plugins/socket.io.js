import io from 'socket.io-client'

export default (nodeUrl = 'https://node-app.litemarkets.com:44380') => {
  return io.connect(nodeUrl, { path: '/cabinet/socket.io' })
}
