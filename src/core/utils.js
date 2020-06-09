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