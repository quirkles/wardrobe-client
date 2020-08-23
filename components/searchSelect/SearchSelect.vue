<template>
  <div class="search-select">
    <div v-show="!isSearching">
      <a @click="toggleIsSearching">{{ displayText }}</a>
    </div>
    <div v-show="isSearching">
      <div class="overlay" @click="toggleIsSearching" />
      <div class="search-and-results">
        <b-field v-show="isSearching">
          <b-input
            ref="searchBox"
            v-model="query"
            :placeholder="$props.placeholder"
            @input="handleChange"
          ></b-input>
        </b-field>
        <ul v-if="results && results.length">
          <li
            v-for="result in results"
            :key="result.value"
            @click="handleSelect(result)"
          >
            {{ result.text }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SearchResult } from '~/components/searchSelect/searchSelectTypes'
import { debounce } from '~/utils/debounce'
interface DataType {
  isSearching: boolean
  query: null | string
  results: SearchResult[]
  selectedResult: SearchResult | null
}
export default Vue.extend({
  props: {
    placeholder: {
      type: String,
      default: 'Search term',
    },
    getResults: {
      type: Function,
      required: true,
    },
  },
  data(): DataType {
    return {
      isSearching: false,
      query: null,
      results: [],
      selectedResult: null,
    }
  },
  computed: {
    displayText(): string {
      return this.selectedResult?.text || this.$props.placeholder
    },
  },
  methods: {
    toggleIsSearching(): void {
      this.isSearching = !this.isSearching
      if (this.isSearching) {
        ;(this.$refs.searchBox as HTMLInputElement).focus()
      }
    },
    handleSelect(result: SearchResult): void {
      this.selectedResult = result
      this.isSearching = false
      this.$emit('select', result)
    },
    handleChange: debounce(async function setResults(this: Vue, value: string) {
      this.$data.results = await this.$props.getResults(value)
    }, 500),
  },
})
</script>

<style lang="scss">
@import 'assets/styles/variables';
@import 'assets/styles/mixins';
.search-select {
  display: inline-block;
  .overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    opacity: 1;
    z-index: 1;
  }
  .search-and-results {
    position: relative;
    z-index: 2;
    .field {
      margin-bottom: 0;
    }
    a {
      padding: $control-padding-vertical $control-padding-horizontal;
    }
    ul {
      top: 100%;
      position: relative;
      width: 100%;
      border-bottom: 1px solid;
      border-left: 1px solid;
      border-right: 1px solid;
      list-style: none;
      margin: 0;
      li {
        cursor: pointer;
        padding: $control-padding-vertical $control-padding-horizontal;
        &:hover {
          background-color: bulmaDarken($white, 5%);
        }
      }
    }
  }
}
</style>