export class Emitter {
  constructor() {
    this.listeners = {}
  }

  emit(event, ...args) {
    this.listeners[event].forEach(listener => {
      listener(...args)
    });
  }

  subscriber(event, fn) {
    this.listeners[event] = []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = 
            this.listeners[event].filter(eventFn => fn !== eventFn)
    }
  }
}
