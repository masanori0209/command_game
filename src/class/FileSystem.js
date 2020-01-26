/*
 * FileSystem
 * ファイルシステムクラス
 * id: string (uuidのようなもの)
 * name: ファイル名
 * type: ファイルタイプ
 *  - 0: ファイル
 *  - 1: フォルダー
 *  - 2: シンボリックリンク
 * mode: ファイルモード
 * 
 */
import uuid from '../functions/uuid'
const FileSystem = class FileSystem {
    constructor (name, type, mode, owner, group) {
        this.id  = uuid()
        this.name = name
        this.type = type
        this.mode = mode
        this.owner = owner
        this.group = group
        this.parent = null
        this.current = []
        this.children = []
        this.createdAt = new Date()
        this.isHome = false
    }
    addChild (childNode) {
        console.log(this)
        this.children.push(childNode)
        childNode.parent = this
    }
    changeDirectory (path, changePath) {
        console.log('f1: ', this)
        console.log('f2: ', changePath)
        if (changePath.length == 0 || changePath == undefined) {
            console.log('fans: ', changePath)
            return this
        }
        // ほんとはホームディレクトリ
        if (path[0] == '~') {
            console.log('f3: ', path)
            changePath.shift()
            var p = ''
            if (path.charAt(0) + path.charAt(1) == '~/') p = path.slice(2)
            else p = path.slice(1)
            return this.getRoot().changeDirectory(p, changePath)
        }
        // 何もないときはルートに
        if (path[0] == '' && path.length == 0) {
            console.log('f4: ', path)
            return this.getRoot().changeDirectory('', [])
        }
        // ルートからたどる
        if (path[0] == '/') {
            console.log('f5: ', path)
            changePath.shift()
            return this.getRoot().changeDirectory(path.slice(1), changePath)
        }
        // 一つ前へ
        if (changePath[0] == '..') {
            console.log('f6: ', path)
            changePath.shift()
            return this.parent.changeDirectory(path, changePath)
        } else {
            console.log('f7: ', path)
            for (let c in this.children) {
                if (this.children[c].name === changePath[0] && this.children[c].type === 1) {
                    changePath.shift()
                    return this.children[c].changeDirectory(path, changePath)
                }
            }
        }
    }
    listFiles (option) {
        let res = ''
        for (let c in this.children) {
            let list_str =  this.children[c].type === 0 ? this.children[c].name : this.children[c].name + '/'
            res += list_str + '\t'
        }
        return res
    }
    searchChildren (searchResult, searchName) {
        if (this.id === searchName) searchResult.push(this)
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i]
            child.searchChildren(searchResult, searchName)
        }
    }
    searchParents (searchResult, searchName) {
        if (this.id === searchName) searchResult.push(this)
        if (this.parent === null) return
        this.parent.searchParents(searchResult, searchName)
    }
    getRoot () {
        if (this.parent === null) return this
        else return this.parent.getRoot()
    }
    getHome () {
        if (this.parent === null) return this
        else return this.parent.getRoot()
    }
    searchAll (searchResult, searchName) {
        const root = this.getRoot()
        root.searchChildren(searchResult, searchName)
    }
    getDepth () {
        if (this.parent === null) return 0
        return this.parent.getDepth() + 1
    }
}
export default FileSystem