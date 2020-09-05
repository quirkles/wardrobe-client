import Vue from 'vue';
import Buefy from 'buefy'
import '!style-loader!css-loader!sass-loader!../assets/styles/variables.scss';
import '!style-loader!css-loader!sass-loader!../assets/styles/_mixins.scss';
import { configure } from '@storybook/vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUpload, faImage, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import SearchSelect from '../components/searchSelect/SearchSelect'
import ImageGrid from '../components/imageGrid/ImageGrid'

import "../assets/styles/main.scss"

library.add(faUpload);
library.add(faImage);
library.add(faPlus);

Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
})


Vue.component('SearchSelect', SearchSelect)
Vue.component('ImageGrid', ImageGrid)

function loadStories() {
  const req = require.context('../components', true, /\.stories\.[tj]s$/);
  req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);
