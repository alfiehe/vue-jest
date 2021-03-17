<template>
  <div class="item">
    <h4><a :href="item.url">{{ item.title }}</a></h4>
    <p>{{ item.score }}</p>
    <p>{{ item.author }}</p>
  </div>
</template>

<script>

export default {
  props: ['item'],
  data() {
    return {

    };
  },
}
</script>
<style scoped>

</style>