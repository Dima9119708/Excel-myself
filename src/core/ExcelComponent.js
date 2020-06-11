import { DomListener } from "./DomListener";
import * as actions from '../redux/actions'

export class ExcelComponent extends DomListener {

  constructor($root, options = {}) {
    super($root, options)

    this.emmiter = options.emmiter
    this.store = options.store
    this.unsubscribers = []
    this.subscribers = options.subscribers || []
  }

  $emit(event, ...args) {
    this.emmiter.emit(event, ...args)
  }

  $subscriber(event, fn) {
    const unsub = this.emmiter.subscriber(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action){
    this.store.dispatch(action)
  }

  storeChange() {}

  init() {
    this.initEventListener()
  }

  destroy() {
    this.destroyEventListener()
    this.unsubscribers.forEach(unsub => unsub())
    document.onkeydown = null
  }
}