import { stylesDefault } from "../../core/stylesDefault"
import { camelCaseToDash } from "./table.functions"

const CODES = {
  a : 'A'.charCodeAt(),
  z : 'Z'.charCodeAt()
}

function createLetters(_, index) {
  for( let i = CODES.a; i < CODES.z; i++ ) {
    return String.fromCharCode(i + index)
  }
}

function createColumn(lenght) {

  return (letter, id) => {
    return `
    <div class="column unselectable" data-id="${id}" data-resizer  data-column>
      ${letter}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
  }

}

function createCell(col) {

  return function(_,row) {
    const styles = camelCaseToDash(JSON.stringify(stylesDefault))
    return `
      <div class="cell" data-cell="cell"  
      data-idCell="${row}" 
      data-id="${col}:${row}"
      style='${styles}' >
      </div>
    `
  }
}

function toRow(elements, id) {
  const ids = id ? id : ''
  const rowResize = id ? '<div class="row-resize" data-resize="row"></div>' : ''

  return `
    <div class="row" data-resizer>

      <div class="row-info unselectable">${ids}
        ${rowResize}
      </div>

      <div class="row-data">
          ${elements}
      </div>
   </div>
  `
}

export function createTable(rowCount = 20) {

  const rows = []
  const result = CODES.z - CODES.a + 1

  const column = new Array(result) 
                .fill('')
                .map(createLetters)
                .map(createColumn(result))
                .join('')

  rows.push(toRow(column))

  for( let i = 0; i < rowCount; i++ ) {
    const row = new Array(result)
                .fill('')
                .map(createCell(i))
                .join('')
    rows.push(toRow(row, i + 1))
  }

  return rows.join('')
}

