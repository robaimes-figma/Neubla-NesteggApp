// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=197:19743
import figma from 'figma'
const instance = figma.selectedInstance

const childNodes = instance.findConnectedInstances(
  (node) => ['Input Field', 'Button'].includes(node.name),
  { traverseInstances: true },
)
let child0, child1, child2
if (childNodes[0]?.type === 'INSTANCE') child0 = childNodes[0].executeTemplate().example
if (childNodes[1]?.type === 'INSTANCE') child1 = childNodes[1].executeTemplate().example
if (childNodes[2]?.type === 'INSTANCE') child2 = childNodes[2].executeTemplate().example

export default {
  example: figma.code`
    <Form singleLine onSubmit={() => {}}>
      ${child0}${child1}${child2}
    </Form>
  `,
  imports: [
    'import { Form } from "primitives"',
  ],
  id: 'form-newsletter',
  metadata: { nestable: true },
}
