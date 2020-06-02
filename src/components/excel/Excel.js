import { $ } from "../../core/Dom"

export class Excel {
  constructor(selector, components = []) {
    this.selector = $(selector)
    this.components = components
  }

  getRoot() {
    const excel = $.create('div', 'excel')

    this.components.forEach(Component => {
      const createComponent = $.create('div', Component.parentClassName)
      const component = new Component(createComponent)
      $(createComponent).insertAdjacentHTML('beforeend',component.toHTML())
      excel.append(createComponent)
    })

    this.selector.append(excel)
  }

  render() {
    return this.getRoot()
  }

  destroy() {

  }
}