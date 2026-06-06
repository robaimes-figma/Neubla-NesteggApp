// url=https://www.figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=56-15608
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const spacing = instance.getEnum('Spacing', {
  Overlap: 'negative-200',
  Spaced: '100',
})
const children = snippet('Avatar')

export default {
  example: figma.code`
    <AvatarGroup spacing="${spacing}" max={3}>
      ${children}
    </AvatarGroup>
  `,
  imports: ['import { AvatarGroup } from "primitives"'],
  id: 'avatar-group',
  metadata: { nestable: true },
}
