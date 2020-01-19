<template>
  <g v-if="dir.children.length > 0">
    <foreignObject class="group" :x="dir.getDepth() * width" :y="dirIdx * height" :width="width" :height="height">
      <h2><span class="circle" v-if="this.$store.state.current.id == dir.id">●</span>{{dir.name}}</h2>
      <p v-for="(d, idx) in dir.children" :key="idx">{{d.name}}</p>
    </foreignObject>
    <g>
      <Directory v-for="(d, idx) in dir.children" :key="idx" :dir="d" :dirIdx="idx"/>
    </g>
  </g>
</template>

<script>
import Directory from "@/components/Directory"
export default {
  name: "Directory",
  components: {
    Directory
  },
  mounted () {
    console.log(this.dir)
  },
  props: ['dir', 'dirIdx'],
  data () {
    return {
      width: 200,
      height: 300,
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.game {
  width: 100%;
  height: 100%;
}
.svg {
}
.group {
  padding: 5px;
}
</style>
