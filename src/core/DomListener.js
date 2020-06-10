import {$} from './Dom'

const prefixAndUppercase = listener => {
  return 'on' + listener[0].toUpperCase() + listener.slice(1)
}

export class DomListener {
  constructor($element, options) {
    this.$elem = $($element)
    this.listeners = options.listener || []
  }

  initEventListener() {
    this.listeners.forEach( listener => {
      const method = prefixAndUppercase(listener)
      if (!this[method]) {
        throw Error(`Метода ${method} нет у компонента ${this.nameComponent}`)
      }
      this[method] = this[method].bind(this)
      this.$elem.onEventListener(listener, this[method])
    })
  }

  destroyEventListener() {
    this.listeners.forEach( listener => {
      const method = prefixAndUppercase(listener)
      this.$elem.offEventListener(listener, this[method])
    })
  }
}