import { toolbarButtons } from "./toolbar.template"

export function toolbarHTML($root, stylesDefault) {
  $root.toHTML(' ')
  $root.insertHTML('beforeend', toolbarButtons(stylesDefault))
}