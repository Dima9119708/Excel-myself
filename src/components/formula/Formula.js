import { ExcelComponent } from "../../core/ExcelComponent";
import { $ } from '../../core/Dom'

export class Formula extends ExcelComponent {

  static parentClassName = 'excel__formula'

  constructor($root, options) {
    super ($root, {
      listener : ['input', 'keydown'],
      ...options
    })

    this.$root = $root
  }

  init(){
    super.init()

    const $formulaInput = $(this.$root).querySelector('[data-formulaInput]')

    this.$subscriber('Selected:Text', data => {
      $($formulaInput).toHTML(data)
    })

    this.$subscriber('Selected:click', data => {
      $($formulaInput).toHTML(data)
    })

    this.$subscriber('Selected:Keyboard', data => {
      $($formulaInput).toHTML(data)
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" data-formulaInput contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    this.$emit('Formula:Text', $(event.target).toHTML())
  }

  onKeydown(event) {
    document.onkeydown = null
    const { key } = event

    if (key === 'Enter') {
      event.preventDefault()
      this.$emit('Formula:Enter', 'enter')
    }
    
  }
}