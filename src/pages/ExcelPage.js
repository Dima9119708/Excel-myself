import { Excel } from '../components/excel/Excel'
import { Header } from '../components/header/Header'
import { ToolBar } from '../components/toolbar/Toolbar'
import { Formula } from '../components/formula/Formula'
import { Table } from '../components/table/Table'
import { PagesInterface } from './PagesInterface'
import { Store } from '../redux/Store'
import {reducer} from '../redux/reducer'
import {storage} from '../core/utils'
import {initialState} from '../core/initialState'
import { ActiveRout } from '../core/routing/ActiveRout'
import {dateTable} from '../redux/actions'

export class ExcelPage extends PagesInterface {

  getRoot() {

    if (!this.params) {
      this.params = Date.now()
      ActiveRout.hash = `#excel/${this.params}`
    }

    const store = new Store(
                      reducer, 
                      storage(`#excel/${this.params}`) || initialState)

    this.excel = new Excel(
      [Header,ToolBar,Formula,Table],
      store
    )

    store.subscribe(state => {
      setTimeout(() => {
        storage(`#excel/${this.params}`, state)
      }, 500) 
    })
    
    return this.excel.getRoot()
  }

  initial() {
    this.excel.init()
  }

  destroyDelete() {
    this.excel.destroy()
  }
}