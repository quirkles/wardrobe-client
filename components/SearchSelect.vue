<template>
  <b-field label="Name">
    <b-input v-model="query" @input="handleChange"></b-input>
  </b-field>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    getResults: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      query: null as string | null,
    }
  },
  methods: {},
})
</script>
