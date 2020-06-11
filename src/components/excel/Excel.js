import { $ } from "../../core/Dom"
import { Emitter } from "../../core/Emitter"
import { StoreSub } from "../../core/StoreSubscriber"
import { dateTable } from '../../redux/actions'
import { initialState } from "../../core/initialState"

export class Excel {
  constructor(components = [], store) {
    this.components = components
    this.emmiter = new Emitter()
    this.store = store
    this.storeSubscriber = new StoreSub(this.store)
  }

  getRoot() {
    const excel = $.create('div', 'excel')

    const options = {
      emmiter : this.emmiter,
      store : this.store
    }

    this.components = this.components.map(Component => {
      const createComponent = $.create('div', Component.parentClassName)
      const component = new Component(createComponent, options)
      $(createComponent).insertHTML('beforeend',component.toHTML())
      excel.append(createComponent)

      return component
    })

    this.store.dispatch(dateTable())

    return excel
  }

  init() {
    this.storeSubscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init())
  }

  destroy() {
    this.components.forEach(component => component.destroy());
  }
}