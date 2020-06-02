import { ExcelComponent } from "../../core/ExcelComponent";

export class Formula extends ExcelComponent {

  static parentClassName = 'excel__formula'

  constructor($root) {
    super ($root)
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }
}