import { ExcelComponent } from "../../core/ExcelComponent";
import { $ } from '../../core/Dom'

export class Formula extends ExcelComponent {

  static parentClassName = 'excel__formula'

  constructor($root, options) {
    super ($root, {
      subscribers : ['currentText'],
      listener : ['input', 'keydown'],
      ...options
    })

    this.$root = $root
    this.$formulaInput = null
  }

  init(){
    super.init()

    const {currentText} = this.store.getState()

    this.$formulaInput = $(this.$root).querySelector('[data-formulaInput]')
    $(this.$formulaInput).toHTML(currentText)

    this.$subscriber('SELECTED:KEYBOARD', data => {
      $(this.$formulaInput).toHTML(data)
    })
  }

  storeChange(change) {
    $(this.$formulaInput).toHTML(change.currentText)
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" data-formulaInput contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    this.$emit('FORLUMA:INPUT', $(event.target))
  }

  onKeydown(event) {
    document.onkeydown = null
    const { key } = event

    if (key === 'Enter') {
      event.preventDefault()
      this.$emit('FORMULA:ENTER', 'enter')
    }
  }
}