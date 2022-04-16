import { createApp } from 'vue'
import App from './App.vue'
import Keycloak from 'keycloak-js'
import store from './store'

const initOptions = {
  url: 'https://keycloak.apps.soxprox.local', realm: 'soxprox', clientId: 'time-app', onLoad: 'login-required'
}

let keycloak = Keycloak(initOptions)

keycloak.init({
  onLoad: initOptions.onLoad
}).then((auth) => {
  store.dispatch('user/setKeycloak', keycloak)
  if(!auth) {
    window.location.reload()
  } else {
    createApp(App).use(store).mount('#app')
    store.dispatch('user/setKeycloak', keycloak)
  }
  setInterval(() => {
    keycloak.updateToken(70)
  }, 6000)
})


