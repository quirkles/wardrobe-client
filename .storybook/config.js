import Vue from 'vue';
import Buefy from 'buefy'
import { configure } from '@storybook/vue'
import SearchSelect from '../components/searchSelect/SearchSelect.vue'

import "../assets/styles/main.scss"

Vue.use(Buefy)

// register components
Vue.component('search-select', SearchSelect)

function loadStories() {
  const req = require.context('../components', true, /\.stories\.ts$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
