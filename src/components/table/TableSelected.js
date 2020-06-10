import { Dom } from "../../core/Dom"
import * as actions from '../../redux/actions'

export class TableSelected {
  constructor() {
    
    this.$group = []
    this.$contentEditableGroup = []
    this.$currentCell = null
  }

  contentEditableCell(cell) {
    this.$contentEditableGroup.push(cell)
    this.$contentEditableGroup.forEach(cell => cell.contentEditable(false))
    cell.contentEditable(true)
    cell.focus()
  }

  oneSelected($cell) {
    this.clear()
    this.$group.push($cell)
    
    $cell.addClass('selected')
    this.$currentCell = $cell
  }

  groupSelected($cells) {
    this.clear()
    this.$group = $cells
    this.$group.forEach(cell => cell.addClass('selected'))
  }

  applyStyles(styles) {
    if(!this.$group.length) {
      this.$currentCell.css(styles)
      return [this.$currentCell]
    }
    this.$group.forEach($cell => $cell.css(styles))

    return this.$group
  }

  clear() {
    this.$group.forEach(cell => cell.removeClass('selected'))
    this.$group = []
  }
}