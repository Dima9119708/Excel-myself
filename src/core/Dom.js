export class Dom {
  constructor(selector) {
    this.$element = typeof selector === 'string'
                  ? document.querySelector(selector)
                  : selector
  }

  toHTML(html) {
    if (html || html == '') {
      return this.$element.innerHTML = html
    }

    return this.$element.textContent
  }

  insertAdjacentHTML(position, string){
    this.$element.insertAdjacentHTML(position, string)
  }

  contentEditable(boolean) {
    this.$element.contentEditable = boolean
  }

  append(element) {
    this.$element.append(element)
  }

  onEventListener(type, fn) {
    this.$element.addEventListener(type, fn)
  }

  offEventListener(type, fn) {
    this.$element.removeEventListener(type, fn)
  }

  addClass(className) {
    this.$element.classList.add(className)
  }

  removeClass(className) {
    this.$element.classList.remove(className)
  }

  ids(boolean) {
    if(boolean) {
      const dataId = this.$element.dataset.id.split(':')
      return {
        col : +dataId[1],
        row : +dataId[0]
      }
    }

    return this.$element.dataset.id
  }

  querySelector(selector) {
    return this.$element.querySelector(selector)
  }

  querySelectorAll(selector){
    return this.$element.querySelectorAll(selector)
  }

  getAttribute(attr) {
    return this.$element.dataset[attr]
  }

  contains(className) {
    return this.$element.contains(className)
  }

  closest(selectors) {
    return this.$element.closest(selectors)
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$element.style[key] = styles[key]
    })
  }

  coordinates(){
    return this.$element.getBoundingClientRect()
  }

  focus() {
    this.$element.focus()
  }

  blur() {
    this.$element.blur()
  }
}

export function $(element) {
  return new Dom(element)
}

$.create = (tagName, options) => {
  const createElem = document.createElement(tagName)

  if (options) { 
    createElem.classList.add(options)
  }

  return createElem
}