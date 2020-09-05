<template>
  <div class="columns is-multiline image-grid">
    <div class="column is-one-half upload-container">
      <b-field class="file is-warning">
        <b-upload
          v-model="fileModels"
          multiple
          drag-drop
          expanded
          @input="onFileChange"
        >
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="plus" size="is-large"></b-icon>
              </p>
              <p>Drop your images here or click to upload</p>
            </div>
          </section>
        </b-upload>
      </b-field>
    </div>
    <div
      v-for="image in images"
      :key="image.id"
      class="column is-half image-container"
    >
      <b-image :src="image.url" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import { GarmentImage } from '~/fragmentTypes'

interface File {
  name: 'string'
}

interface DataType {
  fileModels: File[]
}

export default Vue.extend({
  data(): DataType {
    return {
      fileModels: [],
    }
  },
  props: {
    images: {
      type: Array as PropType<GarmentImage[]>,
      required: false,
      default: () => [],
    },
  },
  methods: {
    onFileChange(files: File[]): void {
      this.$emit('fileChange', files)
      this.$set(this, 'fileModels', [])
    },
  },
})
</script>

<style lang="scss">
.image-grid {
  .upload-container {
    display: flex;
    justify-content: center;
    align-items: center;
    .upload {
      .upload-draggable {
        border: none;
        border-radius: 0;
      }
    }
  }
  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
