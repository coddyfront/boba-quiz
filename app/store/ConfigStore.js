import {makeAutoObservable} from "mobx"

class ConfigStore {

    focusElementID = ''

    constructor() {
        makeAutoObservable(this)
    }

    focusedElement() {
        console.log('focused', this.focusElementID)
        if (this.focusElementID) {
            document.getElementById(this.focusElementID).focus()
        }
    }

}


export const configStore = new ConfigStore()
