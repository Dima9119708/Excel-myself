import { $ } from "../core/Dom";
import { PagesInterface } from "./PagesInterface";
import { ActiveRout } from "../core/routing/ActiveRout";
import { createRecords } from "./dashboard.function";

export class Dashboard extends PagesInterface {

  getRoot() {

    const now = Date.now()

    const db = $.create('div', 'db')
    
    $(db).insertHTML('beforeend',`
    <div class="db__header">
    <h1>Excel Dashboard</h1>
    </div>

    <div class="db__new">
    <div class="db__view">
      <a data-table="table"  href="#excel/${now}" class="db__create">
        Новая <br /> Таблица
      </a>
    </div>
    </div>

    <div class="db__table db__view">

      ${createRecords()} 

    </div>

    `)

    return db
  }

  initial() {
    document.onclick = e => {
      e.preventDefault()

      if ( e.target.dataset['table'] ) {
        ActiveRout.hash = e.target.hash
        ActiveRout.reload
      }
    }
  }
}