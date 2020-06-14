import './scss/index.scss'
import '@babel/polyfill'

import { Router } from './core/routing/Router'
import { Dashboard } from './pages/DashboardPage'
import { ExcelPage } from './pages/ExcelPage'


new Router('#app', {
  dashboard : Dashboard,
  excel : ExcelPage
})
