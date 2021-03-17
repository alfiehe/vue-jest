<template>
  <div
    :class="{hidden: isHidden}"
    :style="{
      'width': `${percent}%`
    }"
  >
   进度条组件
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHidden: true,
      percent: 0,
      timer: null,
    }
  },
  methods: {
    start() {
      this.isHidden = false;
      this.percent = 0;
      this.timer = setInterval(() => {
        this.percent++;
      }, 100);
    },
    finish() {
      this.isHidden = true;
      this.percent = 100;
      clearInterval(this.timer);
    }
  }
}
</script>
