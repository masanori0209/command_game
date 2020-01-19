
const CommandSystem = function CommandSystem (state, command) {
    var commandQuery = state.inputLine.split(' ')
    var res = ''
    try {
        let path = commandQuery[1]
        switch (commandQuery[0]) {
            case 'cd':
                try {
                    // 最初のターゲットディレクトリ策定 : homedirは変えること
                    const dir = state.current.changeDirectory(path, path.split('/'))
                    console.log('cd1: ', dir)
                    // path見つかんない場合
                    if (dir == undefined) {
                        res = 'cd: ' + commandQuery[1] + ': No such file or directory'
                    } else {
                    // 見つかったらそのディレクトリに移動
                        state.current = dir
                    }
                    console.log('cd2: ', state.current)
                } catch (e) {
                    res = 'cd: ' + commandQuery[1] + ': No such file or directory'
                    console.error(e)
                }
                break
            case 'mkdir':
                break
            case 'ls':
                try {
                    if (path != undefined) {
                        // 最初のターゲットディレクトリ策定 : homedirは変えること
                        const dir = state.current.changeDirectory(path, path.split('/'))
                        console.log('cd1: ', dir)
                        // path見つかんない場合
                        if (dir == undefined) {
                            res = 'ls: ' + commandQuery[1] + ': No such file or directory'
                        } else {
                            res = dir.listFiles()
                        }
                        console.log('cd2: ', state.current)
                    } else {
                        res = state.current.listFiles()
                    }
                } catch (e) {
                    res = 'ls: ' + commandQuery[1] + ': No such file or directory'
                    console.error(e)
                }
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