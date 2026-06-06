// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=9762:739
import figma from 'figma'
const instance = figma.selectedInstance

const shortcut = instance.getString('Shortcut')

export default {
  example: figma.code`
    <MenuShortcut>${shortcut}</MenuShortcut>
  `,
  imports: ['import { MenuShortcut } from "primitives"'],
  id: 'menu-shortcut',
  metadata: { nestable: true },
}
