import { ExcelComponent } from "../../core/ExcelComponent";
import { toolbarButtons } from "./toolbar.template";
import { $ } from '../../core/Dom'
import { stylesDefault } from "../../core/init/stylesDefault";
import { toolbarHTML } from "./toolbar.functions";

export class ToolBar extends ExcelComponent {

  static parentClassName = 'excel__toolbar'

  constructor($root, options) {
    super ($root, {
      listener : ['click'],
      ...options
    })

    this.$root = $root
    this.$stylesCell = {...stylesDefault}
  }

  get toHTMLButtons() {
    return toolbarButtons(this.$stylesCell)
  }

  init() {
    super.init()

    this.$subscriber('CURRENT:STYLES', changeStyles => {
      this.$stylesCell = {...changeStyles}
      this.changeToolbarHTML
    })
  }

  toHTML() {
    return this.toHTMLButtons
  }

  get changeToolbarHTML() {
    toolbarHTML($(this.$root), this.$stylesCell)
  }

  onClick(event) {
    const $target = $(event.target).closest('[data-toolbarbutton]')

    if ($target) {

      const $targetArr = JSON.parse($($target).getAttribute('toolbarbutton'))
      this.$stylesCell = {...this.$stylesCell, ...$targetArr}

      this.changeToolbarHTML
      this.$emit('TOOLBAR:STYLES', this.$stylesCell)
    }
  }
}