import faker from 'faker'

import { SearchSelectItem } from '~/types/SearchSelect'

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
      onSelect(value: SearchSelectItem) {
        console.log(value) //eslint-disable-line
      },
      getResults(value: string) {
        const regex = new RegExp(value)
        return Promise.resolve(
          names
            .filter((value) => regex.test(value.name))
            .map((value) => ({
              text: value.name,
              value: value.id,
            }))
            .slice(0, 10)
        )
      },
    },
    template:
      '<search-select @select="onSelect" :get-results="getResults"></search-select>',
  }
}
