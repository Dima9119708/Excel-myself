import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { $ } from '../../core/Dom'
import { TableSelected } from "./TableSelected";
import { selectedGroup, tableResizeEvent, tableGetElementID, styleChange } from "./table.functions";
import { stylesDefault } from "../../core/stylesDefault";
import * as actions from '../../redux/actions'

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

    this.$dispatch(actions.tableCurrentText({
      text : this.selection.$currentCell.toHTML(),
    }))

    this.emmiterCurrentStyles()

    this.onKeydownInit()

    this.$subscriber('FORLUMA:INPUT', data => {
      this.selection.$currentCell.toHTML(data.toHTML())
      this.dispatchTEXT(this.selection.$currentCell)
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

        this.$dispatch(actions.tableCurrentText({
          text : $(event.target).toHTML(),
        }))

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
          this.$emit('SELECTED:KEYBOARD', $($getCell).toHTML())
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
    const id = target.getAttribute('id')
    const text = target.toHTML()
    
    this.$dispatch(actions.tableCellText({
      [id] : text,
    }))

    this.$dispatch(actions.tableCurrentText({
      text : text,
    }))
  }

  onInput(event) {
    this.dispatchTEXT($(event.target))
  }
}
