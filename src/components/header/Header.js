import { ExcelComponent } from "../../core/ExcelComponent";
import * as actions from '../../redux/actions'

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

          <div class="button">
            <i class="material-icons">delete</i>
          </div>

          <div class="button">
            <i class="material-icons">exit_to_app</i>
          </div>

        </div>
    `
  }

  onInput(event) {
    this.$dispatch(actions.headerTittle(event.target.value))
  }

  onClick(event) {

  }
}