import {$} from '../../core/Dom'

export function selectedGroup($targetEvent, $currentSelection) {

  const $current = $currentSelection.ids(true)
  const $target = $targetEvent.ids(true)

  const col = groupSelected($current.col, $target.col)
  const row = groupSelected($current.row, $target.row)

  return col.reduce( (acc, col) => {
    row.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])

}

function groupSelected(start, finish) {
  if ( start > finish) {
    [finish, start] = [start, finish]
  }
  
  return new Array(finish - start + 1)
             .fill('')
             .map( (_, i) => start + i)
}

export function tableResize($target, $root, $targetResize){
  
  const type = $targetResize

  const $parent = $($target).closest('[data-resizer]')
  const $resizeLine = $($parent.querySelector('[data-resize]')) 
  const $parentId = $($parent).getAttribute('id')
  const $parentCoord = $($parent).coordinates()
  const $parentWidth = $parent.offsetWidth
  const $parentHeight = $parent.offsetHeight
  let delta
  let value

  if (type === 'col') {
    $resizeLine.css({
      height : 5000 + 'px',
      opacity : 1
    })
  }
  else if (type === 'row') {
    $resizeLine.css({
      width : 5000 + 'px',
      opacity : 1
    })
  }

  $root.onmousemove = e => {

    if ( type === 'col' ) {
      delta = e.pageX - $parentCoord.right
      value = ($parentWidth + delta) + 'px'
      $resizeLine.css({
        left : value
      })
    }
    else if (type === 'row') {
      delta = e.y - $parentCoord.bottom
      value = $parentHeight + delta
      $resizeLine.css({
        top : value + 'px'
      })
    }
  }

  $root.onmouseup = e => {
    $root.onmousemove = null
    $root.onmouseup = null

    if ( type === 'col' ) {
      $($parent).css({
        width : value
      })

      $root.querySelectorAll(`[data-idCell="${$parentId}"]`)
          .forEach(cell => {
              $(cell).css({
                width : value
              })
          });

      $resizeLine.css({
        left : 'unset',
        right : 0,
        opacity : 0,
        height : 100 + '%',
      })
    }
    else if (type === 'row') {

      $resizeLine.css({
        width : 100 + '%',
        opacity : 0,
        top : 'unset'
      })

      $($parent).css({
        height : value + 'px'
      })
    }
  }
}

export function tableGetElementID( key, col, row, rowСounter ) {
  
  switch (key) {
    case 'ArrowRight':
    case 'Tab':
      col++
    break
    case 'ArrowLeft':
      if ( col > 0 ) {
        col--
      }
    break
    case 'ArrowUp':
      if ( row > 0 ) {
        row--
      }
    break
    case 'ArrowDown':
    case 'Enter':
      if (row < rowСounter - 1) {
          row++
      }
    break
  }

  return `[data-id="${row}:${col}"]`
}

export function camelCaseToDash( myStr ) {

  const arrStyles = []
  const objStyles = JSON.parse(myStr)
  
  Object.keys(objStyles).forEach(style => {
    let str = `${style}:${objStyles[style]}`
    arrStyles.push(str)
  })

  return arrStyles.join(';').replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);;
}

export function styleChange(stylesDefault, $currentCell) {

  Object.keys(stylesDefault).forEach( style => {
    stylesDefault[style] = $currentCell.$element.style[style]
  })

  return stylesDefault
}