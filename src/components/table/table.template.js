import { stylesDefault } from "../../core/init/stylesDefault"
import { camelCaseToDash } from "./table.functions"
import { parse } from "../../core/utils/utils"

const CODES = {
  a : 'A'.charCodeAt(),
  z : 'Z'.charCodeAt()
}

const defaultWidth = 120
const defaultHeight = 24

function createLetters(_, index) {
  for( let i = CODES.a; i < CODES.z; i++ ) {
    return String.fromCharCode(i + index)
  }
}

function createColumn({colState}) {

  return (letter, id) => {

    return `
    <div
       class="column unselectable"
       data-id="${id}" data-resizer
       data-column
       style="width:${colState[id] || defaultWidth}"
       >
      ${letter}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
  }

}

function createCell(col, {colState,dataText,dataStyles}) {
  return function(_,idCell) {
    const id = `${col}:${idCell}`
    const text = dataText[id] ? dataText[id] : ''
    const width = colState[idCell] || defaultWidth + 'px'
    const styles = camelCaseToDash(dataStyles[id] || stylesDefault)

    return `
      <div class="cell" data-cell="cell"
      data-idCell="${idCell}"
      data-id="${id}"
      data-parse="${text}"
      style='width:${width};${styles}' >
        ${parse(text)}
      </div>
    `
  }
}

function toRow(elements, id, state) {

  const ids = id ? id : ''
  const rowResize = id ? '<div class="row-resize" data-resize="row"></div>' : ''
  const rowState = state ? state.rowState : ''

  return `
    <div
     class="row"
     data-id="${ids}"
     data-resizer
     style="height:${rowState[id] || defaultHeight + 'px'};"
     >

      <div class="row-info unselectable">${ids}
        ${rowResize}
      </div>

      <div class="row-data">
          ${elements}
      </div>
   </div>
  `
}

export function createTable(rowCount = 20, state) {

  const rows = []
  const result = CODES.z - CODES.a + 1

  const column = new Array(result)
                .fill('')
                .map(createLetters)
                .map(createColumn(state))
                .join('')

  rows.push(toRow(column))

  for( let i = 0; i < rowCount; i++ ) {
    const row = new Array(result)
                .fill('')
                .map(createCell(i, state))
                .join('')
    rows.push(toRow(row, i + 1, state))
  }

  return rows.join('')
}
