
const CommandSystem = function CommandSystem (state, command) {
    var commandQuery = state.inputLine.split(' ')
    var res = ''
    try {
        switch (commandQuery[0]) {
            case 'cd':
                let path = commandQuery[1]
                try {
                    // 最初のターゲットディレクトリ策定 : homedirは変えること
                    if (path == undefined || path == '' || path[0] == '/' || path[0] == '~') {
                        state.current = state.root
                    }
                    const dir = state.current.changeDirectory(path.split('/'))
                    console.log('cd: ', dir)
                    // path見つかんない場合
                    if (dir == undefined) {
                        res = 'cd: ' + commandQuery[1] + ': No such file or directory'
                    } else {
                    // 見つかったらそのディレクトリに移動
                        state.current = dir
                    }
                    console.log('cd: ', state.current)
                } catch (e) {
                    console.error(e)
                }
                break
            case 'mkdir':
                break
            case 'ls':
                break
            case 'touch':
                break
            case 'rm':
                break
            case 'rmdir':
                break
        }
    } catch {
        res = state.inputLine + ': command not found'
    } finally {
        state.logs.push(command)
        if (res != '') state.logs.push(res)
        state.inputLine = ''
    }
    return state
}
export default CommandSystem