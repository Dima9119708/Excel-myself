import { $ } from "../../core/Dom"
import { Emitter } from "../../core/Emitter"

export class Excel {
  constructor(selector, components = []) {
    this.selector = $(selector)
    this.components = components
    this.emmiter = new Emitter()
  }

  getRoot() {
    const excel = $.create('div', 'excel')

    const options = {
      emmiter : this.emmiter
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

    this.components.forEach(component => component.init())
  }

  destroy() {
    this.components.forEach(component => component.destroy());
  }
}