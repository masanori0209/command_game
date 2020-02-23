<template>
  <div class="command-line" @click="cursorInput()" @keydown.37="cursorLeft" @keydown.39="cursorRight"  @keydown.enter="pos=0">
    <div class="header-container">
      <div class="button-box">
        <div class="red"></div>
        <div class="yellow"></div>
        <div class="green"></div>
      </div>
      <div class="message">
        {{$store.state.headerMessage}}
      </div>
    </div>
    <div class="main-container" v-if="$store.state.logs.length > 0">
      <div class="logs" v-for="(log, i) in $store.state.logs" :key="i">
        <span class="init">$</span>{{log}}
      </div>
    </div>
    <div class="input-line">
      <div><span class="init">$</span>{{$store.state.inputLine}}<span class="caret" :style="{'margin-left': (pos + 2) + 'px', 'background': isFocus ? '#f0f0f0aa' : 'transparent'}"></span></div>
      <input id="input" @blur="offCursor()" @keydown.enter="$store.commit('commandSend')" v-model="$store.state.inputLine"/>
    </div>
    <!-- debug -->
    <div style="position: fixed; top: 0; left: 0; width: 100px; height: 150px; background: white; color: black;">
      <p>pos: {{pos}}</p>
      <p>pos/8: {{pos / 8}}</p>
      <p>inputLine: {{$store.state.inputLine.length}}</p>
      <p>inputPos: {{posi}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommandLine",
  data () {
    return {
      isFocus: false,
      pos: 0,
      posi: null
    }
  },
  computed : {
  },
  mounted () {
    this.posi = document.getElementById('input').addEventListener('keyup', e => {
      console.log('Pos: ', e.target.selectionStart)
    })
  },
  methods: {
    cursorLeft () {
      if (!this.$store.state.inputLine) return
      if (this.$store.state.inputLine.length <= -1 * (this.pos / 8)) return
      this.pos -= 8
    },
    cursorRight () {
      if (!this.$store.state.inputLine) return
      if (this.pos >= 0) return
      this.pos += 8
    },
    cursorInput () {
      console.log('cursor')
      document.getElementById('input').focus()
      this.isFocus = true
    },
    offCursor () {
      console.log('off')
      this.isFocus = false
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.command-line {
  height: 60%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #111;
}
.header-container {
  height: 24px;
  width: 100%;
  background: #dcdcdc;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .button-box {
    display: flex;
    align-items: center;
    width: 100px;
    .red {
      margin-left: 8px;
      height: 16px;
      width:  16px;
      border: solid thin #d44;
      border-radius: 50%;
      background: #e66;
    }
    .yellow {
      margin-left: 8px;
      height: 16px;
      width:  16px;
      border: solid thin #dd4;
      border-radius: 50%;
      background: #ee6;
    }
    .green {
      margin-left: 8px;
      height: 16px;
      width:  16px;
      border: solid thin #4d4;
      border-radius: 50%;
      background: #6e6;
    }
  }
  .message {
    color: #2c3e50;
    width: 100%;
    margin-right: 78px;
    text-align: center;
  }
}
.main-container {
  height: auto;
  width: 100%;
  .logs {
    color: #f8f8f8;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-size: 14px;
    .init {
      margin-right: 6px;
    }
  }
}
.input-line {
  height: auto;
  width: 100%;
  word-break: break-all;
  div {
    white-space: pre-wrap;
    word-wrap: break-word;
    margin: 0;
    width: calc(100% - 30px);
    background: transparent;
    border: none;
    white-space: pre-wrap;
    color: #f8f8f8;
    font-size: 14px;
    .init {
      margin-right: 6px;
    }
    .caret {
      display: inline-block;
      vertical-align: middle;
      margin-left: 2px;
      width: 6px;
      height: 13px;
      background: transparent;
      border: solid thin #f0f0f0aa;
    }
  }
  input {
    display: block;
    width: 0px;
    height: 0px;
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
    border: none;
    outline: 0;
  }
}
</style>
