<template>
  <div class="loading" v-show="showLoading">
    {{ loadingText }}
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {
      loadingText: '',
      showLoading: false,
    }
  },
  methods: {
    show() {
      this.showLoading = true
      this.getLoadingText()
    },
    hide() {
      this.showLoading = false
      this.getLoadingText()
    },
    getLoadingText() {
       this.loadingText = this.showLoading ? '加载中...' : ''
    }
  }
}
</script>
