export function storage(key,value) {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value) )
  }

  return JSON.parse(localStorage.getItem(key))
}

export function isEqual(a,b) {
  
  if(typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }

  return a === b
}

export function parse(value) {

  if(value.startsWith('=')) {
    try {

      return eval(value.slice(1))
    } catch {

      return ''
    }
  }

  return value
}

export function startsWithString(value) {

  if (value.startsWith('=')) {
    return value
  }

  return ''
}

export function debounce(time,fn) {

}