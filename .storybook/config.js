import Vue from 'vue';
import Buefy from 'buefy'

import { configure } from '@storybook/vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUpload, faImage, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import '../assets/styles/main.scss';

import { createEventBus } from '../plugins/eventBus'

import SearchSelect from '../components/searchSelect/SearchSelect'
import ImageGrid from '../components/imageGrid/ImageGrid'
import Notifications from '../components/notifications/Notifications'


library.add(faUpload);
library.add(faImage);
library.add(faPlus);

Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
})

Vue.prototype.$eventBus = createEventBus()


Vue.component('SearchSelect', SearchSelect)
Vue.component('ImageGrid', ImageGrid)
Vue.component('Notifications', Notifications)

function loadStories() {
  const req = require.context('../components', true, /\.stories\.[tj]s$/);
  req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);
