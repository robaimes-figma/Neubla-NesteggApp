// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=348-15901
import figma from 'figma'
const instance = figma.selectedInstance

const childNodes = instance.findConnectedInstances(
  (node) => ['Text Content Title', 'Button Group'].includes(node.name),
  { traverseInstances: true },
)
let child0, child1
if (childNodes[0]?.type === 'INSTANCE') child0 = childNodes[0].executeTemplate().example
if (childNodes[1]?.type === 'INSTANCE') child1 = childNodes[1].executeTemplate().example

export default {
  example: figma.code`
    <Hero variant="subtle">
      ${child0}${child1}
    </Hero>
  `,
  imports: ['import { Hero } from "compositions"'],
  id: 'hero-actions',
  metadata: { nestable: true },
}
