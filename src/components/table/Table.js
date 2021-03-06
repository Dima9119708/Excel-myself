import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { $ } from '../../core/Dom'
import { TableSelected } from "./TableSelected";
import { selectedGroup, tableResizeEvent, tableGetElementID, styleChange } from "./table.functions";
import { stylesDefault } from "../../core/init/stylesDefault";
import * as actions from '../../redux/actions'
import { parse, startsWithString } from "../../core/utils/utils";

export class Table extends ExcelComponent {

  static parentClassName = 'excel__table'

  constructor($root, options) {
    super ($root, {
      listener : ['mousedown', 'dblclick', 'input'],
      ...options
    })

    this.$root = $root
    this.nameComponent = 'Table'
    this.selection = new TableSelected()
    this.rowСounter = 30
  }

  init() {
    super.init()

    this.selection.$currentCell = $(this.$root.querySelector('[data-id="0:0"]'))
    this.selection.$currentCell.addClass('selected')

    this.$emit('TABLE:SELECT-TEXT', this.selection.$currentCell)

    this.emmiterCurrentStyles()

    this.onKeydownInit()

    this.$subscriber('FORLUMA:INPUT', data => {
      this.selection.$currentCell.toHTML(data.toHTML())
      this.dispatchTEXT(this.selection.$currentCell)

      this.selection.$currentCell.attr('data-parse', startsWithString(data.toHTML()))
      this.selection.$currentCell.toHTML(parse(data.toHTML()))
    })

    this.$subscriber('FORMULA:ENTER', data => {
      this.selection.contentEditableCell(this.selection.$currentCell)
    })

    this.$subscriber('TOOLBAR:STYLES', styles => {
      const cellStyles = this.selection.applyStyles(styles)
      this.$dispatch(actions.toolbarStyles(cellStyles, styles))
    })
  }

  toHTML() {
    return createTable(this.rowСounter, this.store.getState())
  }

  onDblclick(event) {
    const target = $(event.target).getAttribute('cell')

    if (target) {
      this.selection.contentEditableCell($(event.target))
    }
  }

  selected($cell) {
    this.selection.$currentCell.removeClass('selected')
    this.selection.oneSelected($cell)
  }

  async tableResize(event,$targetResize) {
    const data = await tableResizeEvent(event, this.$root, $targetResize)
    this.$dispatch(actions.tableResize(data))
  }

  onMousedown(event) {
    const $targetCell = $(event.target).getAttribute('cell')
    const $targetResize = $(event.target).getAttribute('resize')

    if ($targetCell) {

      if(event.shiftKey) {

        this.selection.groupSelected (
          selectedGroup( $(event.target), this.selection.$currentCell)
            .map(elem => {
              return $(this.$root.querySelector(`[data-id="${elem}"]`))
            })
        )
      }
      else {

        this.selected($(event.target))

        this.$emit('TABLE:SELECT-TEXT', $(event.target))

        this.onKeydownInit()
        this.emmiterCurrentStyles()

      }
    } else if ($targetResize) {
      this.tableResize($(event.target),$targetResize)
    }
  }

  onKeydownInit() {

    const keyboards = [
      'ArrowRight',
      'ArrowUp',
      'ArrowLeft',
      'ArrowDown',
      'Tab',
      'Enter',
    ]

    document.onkeydown = event => {
      const { key } = event

      if(keyboards.includes(key)) {
        event.preventDefault()

        let {col, row} = this.selection.$currentCell.ids(true)

        const $getCell = this.$root.querySelector(`
                              ${tableGetElementID(key,
                                                  col,
                                                  row,
                                                  this.rowСounter)}
                              `)
        if ($getCell) {
          this.selection.$currentCell.blur()
          this.selected($($getCell))
          this.$emit('TABLE:SELECT-TEXT', $($getCell))
          this.emmiterCurrentStyles()
        }
      }
    }
  }

  emmiterCurrentStyles() {
    this.$emit('CURRENT:STYLES', styleChange(
                stylesDefault,
                this.selection.$currentCell))
  }

  dispatchTEXT(target) {
    const id = target.attr('id')
    const text = target.toHTML()

    this.$dispatch(actions.tableCellText({
      [id] : text,
    }))
  }

  onInput(event) {
    this.dispatchTEXT($(event.target))
    this.$emit('TABLE:SELECT-TEXT', $(event.target))
  }
}
