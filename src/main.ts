import { library } from '@fortawesome/fontawesome-svg-core'
import { faClipboard, faRandom, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createApp } from 'vue'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'
import Toast, { type PluginOptions } from "vue-toastification"
import "vue-toastification/dist/index.css"
import App from './App.vue'
import './assets/index.css'
import router from './router'
library.add(faTimes, faClipboard, faRandom)

const app = createApp(App)

const toastOptions : PluginOptions = {
	// You can set your default options here
};

app
	.component('font-awesome-icon', FontAwesomeIcon)
	.use(Toast, toastOptions)
	.use(router)
	.use(createVfm())
	.mount('#app')
