<template>
  <div class="game-container">
    <svg class="svg" :width="width" :height="height" :viewBox="viewport">
      <Directory :dir="$store.state.root" :dirIdx="idx" v-if="$store.state.root"/>
    </svg>
  </div>
</template>

<script>
import Directory from "@/components/Directory"
export default {
  name: "Game",
  components: {
    Directory
  },
  data () {
    return {
      width: 5000,
      height: 4000,
      ratio: 1,
      dx: 0,
      dy: 0,
      viewport: '0 0 5000 4000',
      viewportMap: '0 0 5000 4000',
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.game-container {
  width: 100%;
  height: 100%;
  overflow: scroll;
}
.group {
  padding: 5px;
}
</style>
