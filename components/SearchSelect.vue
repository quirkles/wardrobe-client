<template>
  <b-field label="Name">
    <b-input v-model="query" @input="handleChange"></b-input>
  </b-field>
</template>

<script lang="ts">
import Vue from 'vue'
// interface DataType {
//   query: null | string
//   results: any[]
// }
export default Vue.extend({
  props: {
    getResults: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      query: null,
      results: [],
    }
  },
  methods: {
    handleChange: function setResults(this: Vue, value: string) {
      this.$data.results = this.$props.getResults(value)
    },
  },
})
</script>
