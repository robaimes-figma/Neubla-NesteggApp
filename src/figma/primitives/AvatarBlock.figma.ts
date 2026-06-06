// url=https://www.figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2010-15581
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const title = instance.getString('Title')
const description = instance.getString('Description')
const children = snippet('Avatar')

export default {
  example: figma.code`
    <AvatarBlock title="${title}" description="${description}">
      ${children}
    </AvatarBlock>
  `,
  imports: ['import { AvatarBlock } from "primitives"'],
  id: 'avatar-block',
  metadata: { nestable: true },
}
