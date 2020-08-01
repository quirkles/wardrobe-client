import faker from 'faker'

import { SearchResult } from '~/components/searchSelect/types'

faker.seed(1234)

const names = Array(100)
  .fill(0)
  .map(() => ({
    name: faker.name.findName(),
    id: faker.random.uuid(),
  }))

export default { title: 'SearchSelect' }

export const withText = () => {
  return {
    methods: {
      onSelect(value: SearchResult) {
        console.log(value) //eslint-disable-line
      },
      getResults(value: string) {
        console.log(value) //eslint-disable-line
        console.log(names) //eslint-disable-line
        const regex = new RegExp(value)
        return names
          .filter((value) => regex.test(value.name))
          .map((value) => ({
            text: value.name,
            value: value.id,
          }))
      },
    },
    template:
      '<search-select @select="onSelect" :get-results="getResults"></search-select>',
  }
}
