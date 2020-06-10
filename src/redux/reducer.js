import { 
  TABLE_RESIZE,
  TABLE_CELL_TEXT, 
  TABLE_CURRENT_TEXT, 
  TOOLBAR_STYLES,
  HEADER_TITTLE 
} from "./constants";

export function reducer(state, actions) {
  let field
  let prev

  switch(actions.type) {
    case TABLE_RESIZE :

    field = actions.data['col'] ? 'colState' : 'rowState'
    prev = state[field]
    prev[actions.data.id] = actions.data['col'] || actions.data['row']

    return {
      ...state,
      [field] : prev
    }

    case TABLE_CELL_TEXT:
      prev = state.dataText || {}
      prev[Object.keys(actions.data)] = Object.values(actions.data).join('')

    return {
      ...state,
      dataText : prev
    }
    
    case TOOLBAR_STYLES:
      const dataStyles = state['dataStyles'] || {}

      actions.groupCell.forEach(cell => {
        const id = cell.getAttribute('id')
        dataStyles[id] = {...actions.styles}
      });

    return {
      ...state,
      dataStyles
    }

    case HEADER_TITTLE :

    return {
      ...state,
      headerTittle : actions.headerText
    }
  }

  return state
}