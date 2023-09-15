/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { mdi } from 'vuetify/iconsets/mdi'

// Composables
import { createVuetify } from 'vuetify'
import {customIcon} from '../components/CustomIcons'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          background: '#F4F4F4', //Light Grey
          surface: '#FFFFFF', // White
          primary: '#633CFF',  //Purple
          'primary-lighten-1': '#BEADFF', // Hover purple
          'primary-lighten-2': '#EFEBFF', // Light purple
          secondary: '#333333', //Dark grey
          'secondary-lighten-1': '#737373', // Grey
          'secondary-lighten-2': '#D9D9D9', // Borders
          error: 'FF3939'
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    sets: {
      customIcon,
      mdi
    },
  },
})
