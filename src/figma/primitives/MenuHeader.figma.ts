// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=9762:728
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const header = snippet('Text Strong')
const subhead = snippet('Text Small')

export default {
  example: figma.code`
    <MenuHeader>
      ${subhead}
      ${header}
    </MenuHeader>
  `,
  imports: ['import { MenuHeader } from "primitives"'],
  id: 'menu-header',
  metadata: { nestable: true },
}
