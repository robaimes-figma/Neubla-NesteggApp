// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=348-15896
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const children = snippet('Text Content Title')

export default {
  example: figma.code`
    <Hero variant="subtle">
      ${children}
    </Hero>
  `,
  imports: ['import { Hero } from "compositions"'],
  id: 'hero-basic',
  metadata: { nestable: true },
}
