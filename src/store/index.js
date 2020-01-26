import Vue from "vue"
import Vuex from "vuex"
import FileSystem from '@/class/FileSystem'
import CommandSystem from '@/class/CommandSystem'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    headerMessage: 'Linux Learning Game',
    inputLine: '',
    onBackSlash: '',
    logs: [],
    root: null,
    current: null,
    home: null
  },
  mutations: {
    init (state) {
      state.root = new FileSystem('root', 1, 777, 'root', 'root')
      state.root.addChild(new FileSystem('Home',  1, 755, 'root', 'root'))
      state.root.children[0].addChild(new FileSystem('Picture',  1, 755, 'root', 'root'))
      state.root.children[0].children[0].addChild(new FileSystem('a.jpg',  0, 755, 'root', 'root'))
      state.root.children[0].addChild(new FileSystem('Document', 1, 755, 'root', 'root'))
      state.root.children[0].children[1].addChild(new FileSystem('b.pdf',  0, 755, 'root', 'root'))
      state.root.children[0].addChild(new FileSystem('Develop',  1, 755, 'root', 'root'))
      state.root.children[0].addChild(new FileSystem('Desktop',  1, 644, 'root', 'root'))
      state.current = state.root.children[0]
      state.home = state.root.children[0]
    },
    commandSend (state) {
      // 最初の命令文を読み取り
      state = CommandSystem(state, state.inputLine)
    }
  },
  actions: {},
  modules: {}
});
