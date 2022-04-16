import { createApp } from 'vue'
import App from './App.vue'
import Keycloak from 'keycloak-js'

const initOptions = {
  url: 'https://keycloak.apps.soxprox.local', realm: 'soxprox', clientId: 'time-app', onLoad: 'login-required'
}

let keycloak = Keycloak(initOptions)

keycloak.init({
  onLoad: initOptions.onLoad
}).then((auth) => {
  if(!auth) {
    window.location.reload()
  } else {
    createApp(App).mount('#app')
  }
  setInterval(() => {
    keycloak.updateToken(70)
  }, 6000)
})


