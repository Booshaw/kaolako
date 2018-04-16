const isProdMode = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  baseUrl: isProdMode ? 'https://easy-mock.com/mock/5a0a4bd2b31e3216824d4b95/api' : 'https://easy-mock.com/mock/5a0a4bd2b31e3216824d4b95/api'
  // socketHost: isProdMode ? 'https://surmon.me' : 'http://localhost:3000'
}