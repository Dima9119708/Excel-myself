import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { $ } from '../../core/Dom'
import { TableSelected } from "./TableSelected";
import { selectedGroup, tableResize, tableGetElementID, styleChange } from "./table.functions";
import { stylesDefault } from "../../core/stylesDefault";

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

    this.onKeydownInit()

    this.$subscriber('Formula:Text', data => {
      this.selection.$currentCell.toHTML(data)
    })

    this.$subscriber('Formula:Enter', data => {
      this.selection.contentEditableCell(this.selection.$currentCell)
    })

    this.$subscriber('ToolBar:Styles', data => {
      this.selection.applyStyles(data)
    })
  }

  toHTML() {
    return createTable(this.rowСounter)
  }

  onDblclick(event) {
    const target = $(event.target).getAttribute('cell')

    if (target) {
      this.selection.contentEditableCell($(event.target))
    }
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
        this.selection.$currentCell.removeClass('selected')
        this.selection.oneSelected($(event.target))

        this.$emit('Selected:click', this.selection.$currentCell.toHTML())
        this.onKeydownInit()

        this.$emit('Current:Styles', styleChange(
                                            stylesDefault, 
                                            this.selection.$currentCell))  
      }
    } else if ($targetResize) {
      tableResize($(event.target), this.$root, $targetResize)
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
          this.selection.$currentCell.removeClass('selected')
  
          this.selection.oneSelected($($getCell))
          this.$emit('Selected:Keyboard', $($getCell).toHTML())
        }
      }
    }
  }

  onInput(event) {
    this.$emit('Selected:Text', $(event.target).toHTML())
  }
}
