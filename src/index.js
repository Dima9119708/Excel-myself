import './scss/index.scss'
import '@babel/polyfill'

import { Router } from './core/routing/Router'
import { Dashboard } from './pages/Dashboard'
import { ExcelPage } from './pages/ExcelPage'


const router = new Router('#app', {
  dashboard : Dashboard,
  excel : ExcelPage
})

