const CODES = {
  a : 'A'.charCodeAt(),
  z : 'Z'.charCodeAt()
}

function createLetters(_, index) {
  for( let i = CODES.a; i < CODES.z; i++ ) {
    return String.fromCharCode(i + index)
  }
}


function createColumn(letter, id) {

  return `
    <div class="column" data-id="${id}" data-column>
      ${letter}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createCell(col) {

  return function(_,row) {
    return `
      <div class="cell" contenteditable data-id="${col}:${row}"></div>
    `
  }
}

function toRow(elements, id) {
  const ids = id ? id : ''

  return `
    <div class="row">

      <div class="row-info">${ids}</div>

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
                .map(createColumn)
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