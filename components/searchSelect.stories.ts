import SearchSelect from './SearchSelect.vue'

export default { title: 'SearchSelect' }

export const withText = () => ({
  components: { 'search-select': SearchSelect },
  template: '<search-select></search-select>',
})
