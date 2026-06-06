// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=9762:720
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const menuHeader = snippet('Menu Header')
const menuSeparator = snippet('Menu Separator')
const menuSection = snippet('Menu Section')
const menuItem = snippet('Menu Item')

export default {
  example: figma.code`
    <Menu>
      ${menuHeader}
      ${menuSeparator}
      ${menuSection}
      ${menuItem}
    </Menu>
  `,
  imports: ['import { Menu } from "primitives"'],
  id: 'menu',
  metadata: { nestable: true },
}
