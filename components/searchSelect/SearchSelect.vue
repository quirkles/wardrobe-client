<template>
  <b-field label="Name">
    <b-input v-model="query" @input="handleChange"></b-input>
  </b-field>
</template>

<script lang="ts">
import Vue from 'vue'
import { SearchResult } from '~/components/searchSelect/types'
import { debounce } from '~/utils/debounce'

interface DataType {
  query: null | string
  results: SearchResult[]
}

export default Vue.extend({
  props: {
    getResults: {
      type: Function,
      required: true,
    },
  },
  data(): DataType {
    return {
      query: null,
      results: [],
    }
  },
  methods: {
    handleChange: debounce(async function setResults(this: Vue, value: string) {
      this.$data.results = await this.$props.getResults(value)
    }, 500),
  },
})
</script>
