/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './requestUtils/apolloClient'


const app = createApp(App)

registerPlugins(app)

app.provide(DefaultApolloClient, apolloClient)
app.mount('#app')
