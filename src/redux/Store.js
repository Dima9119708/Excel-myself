export class Store {
  constructor(reducer, initialState = {}) {
    this.reducer = reducer
    this.state = this.reducer({...initialState}, {type: '__INIT__'})
    this.listeners = []
  }

  dispatch(action){
    this.state = this.reducer(this.state, action)
    this.listeners.forEach(listener => listener(this.state))
  }

  subscribe(fn) {
    this.listeners.push(fn)
    return {
      unsub() {
        this.listeners = this.listeners.filter(l => l !== fn)
      }
    }
  }

  getState() {
    return this.state
  }
}