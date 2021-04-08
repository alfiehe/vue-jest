<template>
  <div class="blog-post">
    <h3>{{ title }}</h3>
    <button @click="$emit('enlarge-text', { mount: 1.1 })">FontSize ++</button>
  </div>
</template>

<script>
export default {
  name: 'blog-post',
  props: ['title'],
  data() {
    return {
     
    }
  },
  methods: {
  }
}
</script>
