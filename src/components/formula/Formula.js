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
    this.$formulaInput = null
  }

  init(){
    super.init()

    this.$formulaInput = $(this.$root).querySelector('[data-formulaInput]')

    this.$subscriber('TABLE:SELECT-TEXT', data => {
      let dataParse = data.attr('parse')

      if (dataParse && dataParse.startsWith('=')) {

        if (data.toHTML() === '') {
          dataParse = ''
        }

        $(this.$formulaInput).toHTML(dataParse)
      }
      else {
        $(this.$formulaInput).toHTML(data.toHTML())
      }
    })
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