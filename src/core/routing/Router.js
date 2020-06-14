import { $ } from "../Dom"
import { ActiveRout } from "./ActiveRout"
import { preloader } from "../preloader/preloader"

export class Router {
  constructor(selector, routs) {

    this.selector = $(selector)
    this.routs = routs
    this.page = null
    this.preloader = preloader

    this.init()
  }

  init() {
    this.changePageHandler()
  }

  async changePageHandler() {

    if (this.page) {
      this.page.destroyDelete()
    }

    const Page = ActiveRout.path.includes('excel')
                ? this.routs.excel
                : this.routs.dashboard


    this.selector.append(this.preloader())

    this.page = new Page(ActiveRout.param)

    const pageRoot = await this.page.getRoot()

    this.selector.clear().append(pageRoot)
    this.page.initial()
  }
}