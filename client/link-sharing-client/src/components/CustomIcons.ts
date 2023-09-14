// Original solution is found here https://stackoverflow.com/questions/73795753/how-to-import-custom-svg-icons-in-vuetify-3

import { h, defineComponent } from "vue/dist/vue.esm-bundler.js";
import type { IconSet, IconProps } from "vuetify";

// fetch all icon .svg files with vite's built-in glob
const svgdata = import.meta.glob('../assets/icons/*.svg', { as: 'raw', eager: true })


const customSvgNameToComponent: { [key: string]: string } = {};

Object.entries(svgdata).forEach(([key, value]) => {
    // the current key is a dir string, such as ./src/assets/icons/icon-arrow-right.svg
    // value is the raw <svg>...</svg> tag
    const newKey = key.split('/').pop().replace(/^icon-/, "").replace(/.svg$/, ""); //remove dir path, 'icon-' and '.svg' for cleaner key

    // wrap svg raw data in <i> tag and create a new Vue component
    const component = defineComponent({
        template: `<i>${value}</i>`
    })

    // Assign the shorten key to svg component
    customSvgNameToComponent[newKey] = component
})

const custom: IconSet = {
    component: (props: IconProps) =>
      h(props.tag, [h(customSvgNameToComponent[props.icon as string], { class: 'v-icon__svg' })]),
    //   create icon sets
  }

export  { custom /* aliases */ };