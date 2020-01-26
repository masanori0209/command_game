import FileSystem from '@/class/FileSystem'
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
                try {
                    if (path != undefined) {
                        // 最初のターゲットディレクトリ策定 : homedirは変えること
                        let pathSplits = path.split('/')
                        let newDir = pathSplits.pop()
                        console.log('pop: ', pathSplits)
                        // path全体
                        const dir = state.current.changeDirectory(path, path.split('/'))
                        // path手前まで
                        const dirPre = state.current.changeDirectory(path, pathSplits)
                        console.log('cd1: ', dir)
                        // path見つかんない場合
                        if (dir == undefined && dirPre == undefined) {
                            res = 'mkdir: ' + commandQuery[1] + ': No such file or directory'
                        // pathは存在しつつmkdirできる体制
                        } else if (dir == undefined && dirPre != undefined) {
                            let isExist = false
                            for (let i in dirPre.children) {
                                if (newDir === dirPre.children[i].name) isExist = true
                            }
                            if (!isExist) {
                                dirPre.addChild(new FileSystem(newDir, 1, 755, 'user', 'user'))
                            } else {
                                res = 'mkdir: ' + commandQuery[1] + ': File exists'
                            }
                        // どっちも存在する場合
                        } else {
                            res = 'mkdir: ' + commandQuery[1] + ': File exists'
                        }
                        console.log('cd2: ', state.current)
                    } else {
                        res = 'usage: mkdir directory ...'
                    }
                } catch (e) {
                    res = 'mkdir: ' + commandQuery[1] + ': No such file or directory'
                    console.error(e)
                }
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
                try {
                    if (path != undefined) {
                        // 最初のターゲットディレクトリ策定 : homedirは変えること
                        let pathSplits = path.split('/')
                        let newFile = pathSplits.pop()
                        console.log('pop: ', pathSplits)
                        // path全体
                        const dir = state.current.changeDirectory(path, path.split('/'))
                        // path手前まで
                        const dirPre = state.current.changeDirectory(path, pathSplits)
                        console.log('cd1: ', dir)
                        // path見つかんない場合
                        if (dir == undefined && dirPre == undefined) {
                            res = 'touch: ' + commandQuery[1] + ': Not a directory'
                        // pathは存在しつつtouchできる体制
                        } else if (dir == undefined && dirPre != undefined) { 
                            let isExist = false
                            for (let i in dirPre.children) {
                                if (newDir === dirPre.children[i].name) isExist = true
                            }
                            if (!isExist) {
                                dirPre.addChild(new FileSystem(newFile, 0, 755, 'user', 'user'))
                            } else {
                                dirPre.createdAt = new Date()
                            }
                        // どっちも存在する場合
                        } else {
                            // timestamp 更新
                            dirPre.createdAt = new Date()
                        }
                        console.log('cd2: ', state.current)
                    } else {
                        res = 'touch: ' + commandQuery[1] + ': No such file or directory'
                    }
                } catch (e) {
                    res = 'touch: ' + commandQuery[1] + ': No such file or directory'
                    console.error(e)
                }
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