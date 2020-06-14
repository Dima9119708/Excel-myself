import {storage} from '../core/utils/utils'

function createLi(key) {

  const model = storage(key)

  return `
      <li class="db__record">
        <a data-table="table" href="${key}">${model.headerTittle}</a>
        <strong>${model.date}</strong>
      </li>
  `
}

export function getKey() {
  const key = []
  for(let i = 0; i < localStorage.length; i++) {

    if (localStorage.key(i).includes('excel')) {
      key.push(localStorage.key(i))
    }
  }

  return key
}

export function createRecords() {

  const keys = getKey()

  if (!keys.length){
    return `
    <span>Таблицы не созданы</span>
    `
  }

  return   `
    <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
    </div>

    <ul class="db__list">
         ${keys.map(createLi).join('')}
    </ul>
  `
}