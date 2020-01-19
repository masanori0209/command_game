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
    }
    addChild (childNode) {
        console.log(this)
        this.children.push(childNode)
        childNode.parent = this
    }
    changeDirectory (changePath) {
        console.log(this)
        console.log(changePath)
        if (changePath.length == 0) return this
        // 一つ前へ
        if (changePath[0] == '..') {
            changePath.shift()
            return this.parent.changeDirectory(changePath)
        } else if (changePath[0] == '')
        for (let c in this.children) {
            if (this.children[c].name == changePath[0]) {
                changePath.shift()
                return this.children[c].changeDirectory(changePath)
            }
        }
        return this
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