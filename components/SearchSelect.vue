<template>
  <b-field label="Name">
    <b-input v-model="name"></b-input>
  </b-field>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      name: 'alex',
    }
  },
})
</script>
