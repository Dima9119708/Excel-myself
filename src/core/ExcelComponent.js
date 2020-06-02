import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {

  constructor($root, options = {}) {
    super($root, options.listener || [])
  }

  initListener() {
    this.initEventListener()
  }

  destroyListener() {
    this.destroyEventListener()
  }
}