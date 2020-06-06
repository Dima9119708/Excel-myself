import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {

  constructor($root, options = {}) {
    super($root, options)

    this.emmiter = options.emmiter
    this.unsubscribers = []
  }


  $emit(event, ...args) {
    this.emmiter.emit(event, ...args)
  }

  $subscriber(event, fn) {
    const unsub = this.emmiter.subscriber(event, fn)
    this.unsubscribers.push(unsub)
  }

  init() {
    this.initEventListener()
  }

  destroy() {
    this.destroyEventListener()
    this.unsubscribers.forEach(unsub => unsub())
    document.onkeydown = null
  }
}