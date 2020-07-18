export default { title: 'SearchSelect' }

export const withText = () => {
  return {
    methods: {
      getResults(value: string) {
        console.log(value) //eslint-disable-line
        return {
          text: value,
          value: Math.random(),
        }
      },
    },
    template: '<search-select :get-results="getResults"></search-select>',
  }
}
