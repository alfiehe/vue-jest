<template>
  <div class="item-list">
   <item
    v-for="item in displayItems"
    :key="item.id"
    :item="item"
  >
  </item>
  </div>
</template>

<script>
import Item from './Item';

export default {
  data() {
    return {
      displayItems: window.items
    };
  },
  components: {
    Item
  }
}
</script>
<style scoped>

</style>