import { $ } from "../Dom"
import { ActiveRout } from "./ActiveRout"

export class Router {
  constructor(selector, routs) {

    this.selector = $(selector)
    this.routs = routs
    this.page = null

    this.init()
  }

  init() {
    this.changePageHandler()
  }

  changePageHandler() {

    if (this.page) {
      this.page.destroyDelete()
    }

    const Page = ActiveRout.path.includes('excel') 
                ? this.routs.excel 
                : this.routs.dashboard

    this.page = new Page(ActiveRout.param)

    this.selector.append(this.page.getRoot())
    this.page.initial()
  }
}