import { library } from '@fortawesome/fontawesome-svg-core'
import { faClipboard, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createApp } from 'vue'
import 'vue-final-modal/style.css'
import App from './App.vue'
import router from './router'
library.add(faTimes, faClipboard)

import { createVfm } from 'vue-final-modal'
import './assets/index.css'

const app = createApp(App)

app
	.component('font-awesome-icon', FontAwesomeIcon)
	.use(router)
	.use(createVfm())
	.mount('#app')
