import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";

export class Table extends ExcelComponent {

  static parentClassName = 'excel__table'

  constructor($root) {
    super ($root, {
      listener : ['click']
    }) 
  }

  toHTML() {
    return createTable(30)
  }
}