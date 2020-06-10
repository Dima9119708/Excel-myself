function toButtons(buttons) {

  return buttons.map(button => {
    const active = button.active === true ? 'active' : ''

    return  `
      <div class="button ${active}" 
      data-toolbarButton='${JSON.stringify(button.property)}'>

          <i class="material-icons">${button.icons}</i>
      </div>
    `
  })
}

export function toolbarButtons(state) {

  const buttons = [
    {
      icons: 'format_align_left',    
      active : state['textAlign'] === 'left',
      property: {textAlign : 'left'},
    },
    {
      icons: 'format_align_center',
      active : state['textAlign'] === 'center',
      property: {textAlign : 'center'}
    },
    {
      icons: 'format_align_right',
      property: {textAlign : 'right'},
      active : state['textAlign'] === 'right'
    },
    {
      icons: 'format_italic',
      active : state['fontStyle'] === 'italic',
      property: {fontStyle : state.fontStyle === 'italic' ? 'normal' : 'italic'}, 
    },
    {
      icons: 'format_bold',
      active : state['fontWeight'] === 'bold',
      property: {fontWeight : state.fontWeight === 'normal' ? 'bold' : 'normal'},
    },
    {
      icons: 'format_underlined',
      active : state['textDecoration'] === 'underline',
      property: {textDecoration : state.textDecoration === 'none' ? 'underline' : 'none'}
    }
  ]

  return toButtons(buttons).join('')
}