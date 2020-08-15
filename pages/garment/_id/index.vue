<template>
  <div id="garment-list-page" class="container pt-4">
    <h1>Garment details View</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Garment } from '~/fragmentTypes'

export default Vue.extend({
  data() {
    return {
      garmentData: {} as Garment,
    }
  },
  computed: {},
  methods: {},
})
</script>

<style lang="scss">
#garment-list-page {
  margin: 0 1rem;
}
</style>
