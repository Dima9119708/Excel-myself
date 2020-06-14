import { $ } from "../Dom"

export function preloader() {

  const preload = $.create('div', 'lds-ring')

  $(preload).toHTML(`
  <div></div><div></div><div></div><div></div></div>
  `)

  return preload
}