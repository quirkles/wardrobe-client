import Vue from 'vue';
import { configure } from '@storybook/vue'
import SearchSelect from '../components/SearchSelect'

import "../assets/styles/main.scss"

Vue.component('SearchSelect', SearchSelect)

function loadStories() {
  const req = require.context('../components', true, /\.stories\.[tj]s$/);
  req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);
