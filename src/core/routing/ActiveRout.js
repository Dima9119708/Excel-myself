export class ActiveRout {

  static get path() {
    return location.hash.slice(1)
  }

  static get param() {
    return ActiveRout.path.split('/')[1]
  }

  static set hash(eventHash) {
    location.hash = eventHash
  }

  static get reload() {
    location.reload()
  }
}