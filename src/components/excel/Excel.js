import { $ } from "../../core/Dom"

export class Excel {
  constructor(selector, components = []) {
    this.selector = $(selector)
    this.components = components
  }

  getRoot() {
    const excel = $.create('div', 'excel')

    this.components = this.components.map(Component => {
      const createComponent = $.create('div', Component.parentClassName)
      const component = new Component(createComponent)
      $(createComponent).insertAdjacentHTML('beforeend',component.toHTML())
      excel.append(createComponent)

      return component
    })

    this.selector.append(excel)
  }

  render() {
    this.getRoot()

    this.components.forEach(component => component.initListener())
  }

  destroy() {
    this.components.forEach(component => component.destroyListener());
  }
}