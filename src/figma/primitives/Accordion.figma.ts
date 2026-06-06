// url=https://www.figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=7753-4779
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const children = snippet('Accordion Item')

export default {
  example: figma.code`
    <Accordion>
      ${children}
    </Accordion>
  `,
  imports: ['import { Accordion } from "primitives"'],
  id: 'accordion',
  metadata: { nestable: true },
}
