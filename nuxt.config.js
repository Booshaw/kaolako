module.exports = {
  plugins: [
    { src: '~plugins/iview', ssr: true },
    { src: '~plugins/video.js', ssr: false },
    { src: '~plugins/quill.js', ssr: false }
  ],
  css: [
    '~assets/stylus/index.styl',
    'video.js/dist/video-js.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: 'kaolako',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'nuxt.js fro kaolako website' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vender: ['axios']
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: [
      [
        '/api', 
        { 
          target: 'http://kaola.eaon.win:8080/kaola', // api主机
          pathRewrite: { '^/api' : '/' }
        }
    ]
  ]
}
