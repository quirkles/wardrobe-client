<template>
  <div class="column is-one-third">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            src="https://bulma.io/images/placeholders/1280x960.png"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <nuxt-link
              :to="{
                path: `/garment/${this.$props.garmentData.id}`,
              }"
              >{{ this.$props.garmentData.title }}</nuxt-link
            >
          </div>
        </div>
        <div class="content">{{ this.$props.garmentData.description }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Garment } from '~/types/Garment'
export default Vue.extend({
  props: {
    garmentData: {
      type: Object as PropType<Garment>,
      required: true,
    },
  },
  methods: {},
})
</script>

<style lang="scss"></style>
