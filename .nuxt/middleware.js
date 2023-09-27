const middleware = {}

middleware['auth-login'] = require('..\\middleware\\auth-login.js')
middleware['auth-login'] = middleware['auth-login'].default || middleware['auth-login']

middleware['auth'] = require('..\\middleware\\auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

export default middleware
