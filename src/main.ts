import { createApp } from 'vue'
import 'vue-final-modal/style.css'
import App from './App.vue'
import router from './router'

import { createVfm } from 'vue-final-modal'
import './assets/index.css'

const app = createApp(App)

app
	.use(router)
	.use(createVfm())
	.mount('#app')
