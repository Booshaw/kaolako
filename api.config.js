const isProdMode = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  baseUrl: isProdMode ? 'http://cd.godo.pub:18080/kaola' : 'http://cd.godo.pub:18080/kaola'
  // socketHost: isProdMode ? 'https://surmon.me' : 'http://localhost:3000'
}