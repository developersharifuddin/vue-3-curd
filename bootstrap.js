const $ = require('jquery')
window.axios = require('axios')

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

axios.defaults.withCredentials = true

window.axios.defaults.headers.common['Authorization'] = document
  .querySelector('meta[name="authorization"]')
  .getAttribute('content')
