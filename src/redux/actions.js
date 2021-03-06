import { 
  TABLE_RESIZE, 
  TABLE_CELL_TEXT,
  TABLE_CURRENT_TEXT,
  TOOLBAR_STYLES,
  HEADER_TITTLE, 
  DATE
} from "./constants";

export function tableResize(data){
  return {
    type : TABLE_RESIZE,
    data
  }
}

export function tableCellText(data) {
  return {
    type : TABLE_CELL_TEXT,
    data
  }
}

export function toolbarStyles(groupCell, styles) {

  return {
    type : TOOLBAR_STYLES,
    groupCell,
    styles
  }
}

export function headerTittle(headerText) {
  return {
    type : HEADER_TITTLE,
    headerText
  }
}

export function dateTable() {
  return {
    type : DATE,
  }
}