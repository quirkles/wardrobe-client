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
          type="is-indian-red"
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

import { File } from './imageGridTypes'
import { GarmentImage } from '~/fragmentTypes'

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
    .file {
      height: 100%;
      .upload {
        .upload-draggable {
          display: flex;
          align-items: center;
          border: none;
          border-radius: 0;
        }
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
