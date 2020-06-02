export class DomListener {
  constructor($element, listeners = []) {
    this.$elem = $element

    this.listeners = listeners
  }

  initEventListener() {
    this.listeners.forEach( listener => {
      console.log(this.$elem)
    })
  }

  destroyEventListener() {

  }
}