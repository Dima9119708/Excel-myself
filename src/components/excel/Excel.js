import { $ } from "../../core/Dom"
import { Emitter } from "../../core/Emitter"
import { Store } from "../../redux/Store"
import { reducer } from "../../redux/reducer"
import { storage, debounce } from "../../core/utils"
import { initialState } from "../../core/initialState"
import { StoreSub } from "../../core/StoreSubscriber"

export class Excel {
  constructor(selector, components = []) {
    this.selector = $(selector)
    this.components = components
    this.emmiter = new Emitter()
    this.store = new Store(reducer, storage('excel-table') || initialState)
    this.storeSubscriber = new StoreSub(this.store)
  }

  getRoot() {
    const excel = $.create('div', 'excel')

      this.store.subscribe(state => {
        setTimeout(() => {
          storage('excel-table', state)
        }, 500)
      })


    const options = {
      emmiter : this.emmiter,
      store : this.store
    }

    this.components = this.components.map(Component => {
      const createComponent = $.create('div', Component.parentClassName)
      const component = new Component(createComponent, options)
      $(createComponent).insertAdjacentHTML('beforeend',component.toHTML())
      excel.append(createComponent)

      return component
    })

    this.selector.append(excel)
  }

  render() {
    this.getRoot()

    this.storeSubscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init())
  }

  destroy() {
    this.components.forEach(component => component.destroy());
  }
}