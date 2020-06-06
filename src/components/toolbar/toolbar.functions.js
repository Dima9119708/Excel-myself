import { toolbarButtons } from "./toolbar.template"

export function toolbarHTML($root, stylesDefault) {
  $root.toHTML(' ')
  $root.insertAdjacentHTML('beforeend', toolbarButtons(stylesDefault))
}