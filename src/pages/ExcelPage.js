import { Excel } from '../components/excel/Excel'
import { Header } from '../components/header/Header'
import { ToolBar } from '../components/toolbar/Toolbar'
import { Formula } from '../components/formula/Formula'
import { Table } from '../components/table/Table'
import { PagesInterface } from './PagesInterface'
import { Store } from '../redux/Store'
import {reducer} from '../redux/reducer'
import {initialState} from '../core/init/initialState'
import { StateProcessor, LocalStorageClient } from '../shared/initPageExcel'


export class ExcelPage extends PagesInterface {

  constructor(params) {
    super(params)

    this.init = null
    this.getData = null
    this.processor = new StateProcessor(
      new LocalStorageClient(this.params)
    )
  }

  async getRoot() {

    this.getData = await this.processor.get()
    this.init = this.getData || initialState

    const store = new Store(reducer, this.init)

    this.excel = new Excel(
      [Header,ToolBar,Formula,Table],
      store
    )

    store.subscribe(this.processor.listen)

    return this.excel.getRoot()
  }

  initial() {
    this.excel.init()
  }

  destroyDelete() {
    this.excel.destroy()
  }
}