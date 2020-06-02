export class Dom {
  constructor(selector) {
    this.$element = typeof selector === 'string'
                  ? document.querySelector(selector)
                  : selector
  }

  toHTML(html) {
    if (html) {
      return this.$element.innerHTML = html
    }

    return this.$element.textContent
  }

  insertAdjacentHTML(position, string){
    this.$element.insertAdjacentHTML(position, string)
  }

  append(element) {
    this.$element.append(element)
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