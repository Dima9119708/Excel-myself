import { isEqual } from "./utils/utils"

export class StoreSub {
  constructor(store) {
    this.store = store
    this.sub = null
    this.prev = {}
  }

  subscribeComponents(components) {
    this.prev = this.store.getState()

    this.sub = this.store.subscribe(state => {

      Object.keys(state).forEach(key => {
        if(!isEqual(this.prev[key], state[key])) {
          components.forEach(component => {

            if(component.subscribers.includes(key)) {
              const change = {[key] : state[key]}
              component.storeChange(change)
            }
          })
        }
      })

      this.prev = this.store.getState()
    })
  }
}