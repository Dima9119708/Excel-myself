import { debounce, storage } from "../core/utils/utils"
import { ActiveRout } from "../core/routing/ActiveRout"

function storageName(params) {
  return `#excel/${params}`
}

export class StateProcessor {
  constructor(client, delay = 500) {
    this.client = client
    this.listen = debounce(this.listen.bind(this), delay)
  }

  listen(state) {
    this.client.save(state)
  }

  get() {
    return this.client.get()
  }
}

export class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name)

    if (name) {
      storage('Current', name)
    }
    else {
      const current = storage('Current')
      ActiveRout.hash = storageName(current)
      ActiveRout.reload
    }
  }

  save(state) {
    storage(this.name, state)
  }

  get() {
    return new Promise(resolve => {

      setTimeout(() => {
        resolve(storage(this.name))
      }, 1000)

    })
  }
}