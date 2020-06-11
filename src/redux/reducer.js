import { 
  TABLE_RESIZE,
  TABLE_CELL_TEXT, 
  TABLE_CURRENT_TEXT, 
  TOOLBAR_STYLES,
  HEADER_TITTLE, 
  DATE
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

      const id = Object.keys(actions.data).join('')
      const value = Object.values(actions.data).join('')

      if (value === '') {
        delete prev[id]
      }
      else {
        prev[id] = value
      }

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

    case DATE : 

    return {
      ...state,
      date : `${new Date().toLocaleDateString()} 
              ${new Date().toLocaleTimeString()}`
    }
  }

  return state
}