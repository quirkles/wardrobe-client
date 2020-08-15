import Vue from 'vue';
import Buefy from 'buefy'
import '!style-loader!css-loader!sass-loader!../assets/styles/variables.scss';
import '!style-loader!css-loader!sass-loader!../assets/styles/_mixins.scss';
import { configure } from '@storybook/vue'

import SearchSelect from '../components/searchSelect/SearchSelect'

import "../assets/styles/main.scss"

Vue.use(Buefy)

Vue.component('SearchSelect', SearchSelect)

function loadStories() {
  const req = require.context('../components', true, /\.stories\.[tj]s$/);
  req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);
