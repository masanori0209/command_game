<template>
  <div class="home">
    <div class="game">
      <Game/>
    </div>
    <div class="command">
      <CommandLine/>
      <Commander/>
    </div>
  </div>
</template>

<script>
import Game from "@/components/Game.vue";
import CommandLine from "@/components/CommandLine.vue";
import Commander from "@/components/Commander.vue";

export default {
  name: "home",
  components: {
    Game,
    CommandLine,
    Commander,
  },
  mounted () {
    this.$store.commit('init')
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  background: #666;
  color: #f8f8f8;
  display: flex;
  flex-wrap: wrap;
}
.game {
  width: 60%;
  height: 100%;
  min-width: 300px;
}
.command {
  width: 40%;
  height: 100%;
  min-width: 200px;
}
</style>
