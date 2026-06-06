// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=9762:760
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const heading = snippet('Text Strong')

export default {
  example: figma.code`
    <MenuHeading>${heading}</MenuHeading>
  `,
  imports: ['import { MenuHeading } from "primitives"'],
  id: 'menu-heading',
  metadata: { nestable: true },
}
