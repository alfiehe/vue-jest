<template>
  <section :style="{ fontSize: `${postFontSize}em`}">
    <blog-post
      v-for="post in posts"
      :key="post.id"
      :title="post.title"
      @enlarge-text="onEnlargeText"
    />
  </section>
</template>

<script>
import BlogPost from './blog-post.vue';

export default {
  name: 'Blog',
  components: {
    BlogPost
  },
  data() {
    return {
      posts: [
        { id: 1, title: 'My journey with Vue' },
        { id: 2, title: 'Blogging with Vue' },
        { id: 3, title: 'Why Vue is so fun' }
      ],
      postFontSize: 1,
    }
  },
  methods: {
    onEnlargeText(payload) {
      console.log('payload===', payload);
      this.postFontSize += payload.mount;
    }
  }
}
</script>
