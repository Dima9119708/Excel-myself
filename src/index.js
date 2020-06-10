import './scss/index.scss'
import '@babel/polyfill'
import { Excel } from './components/excel/Excel'
import { Header } from './components/header/Header'
import { ToolBar } from './components/toolbar/Toolbar'
import { Formula } from './components/formula/Formula'
import { Table } from './components/table/Table'


const excel = new Excel('#app', 
  [Header,ToolBar,Formula,Table]
)

excel.render()