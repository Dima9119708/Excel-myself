import { ExcelComponent } from "../../core/ExcelComponent";
import * as actions from '../../redux/actions'
import {ActiveRout} from '../../core/routing/ActiveRout'

export class Header extends ExcelComponent {

  static parentClassName = 'excel__header'

  constructor($root, options) {
    super ($root, {
      subscribers : ['headerTittle'],
      listener : ['input', 'click'],
      ...options
    })

    this.$root = $root
  }

  init() {
    super.init()

    const {headerTittle} = this.store.getState()
    this.$root.querySelector('[data-headerTittle]').value = headerTittle
  }

  toHTML() {
    return `
        <input type="text" class="input" data-headerTittle value="Новая таблица" />

        <div>

          <div class="button" data-delete="delete">
            <i class="material-icons" data-delete="delete">delete</i>
          </div>

          <div class="button" data-exit="exit">
            <i class="material-icons" data-exit="exit">exit_to_app</i>
          </div>

        </div>
    `
  }

  onInput(event) {
    this.$dispatch(actions.headerTittle(event.target.value))
  }

  onClick(event) {
    if (event.target.dataset['exit']) {
      ActiveRout.hash = ''
      ActiveRout.reload
      localStorage.removeItem('Current')
    }
    else if (event.target.dataset['delete']) {

      const answer = confirm('Вы ходите удалить таблицу')

      if (answer)  {
        localStorage.removeItem(`#excel/${ActiveRout.param}`)
        localStorage.removeItem('Current')
        ActiveRout.hash = ''
        ActiveRout.reload
      }
    }
  }
}