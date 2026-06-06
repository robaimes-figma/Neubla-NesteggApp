// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=197:19744
import figma from 'figma'
const instance = figma.selectedInstance

const childNodes = instance.findConnectedInstances(
  (node) => ['Input Field', 'Button Group'].includes(node.name),
  { traverseInstances: true },
)
let child0, child1, child2, child3
if (childNodes[0]?.type === 'INSTANCE') child0 = childNodes[0].executeTemplate().example
if (childNodes[1]?.type === 'INSTANCE') child1 = childNodes[1].executeTemplate().example
if (childNodes[2]?.type === 'INSTANCE') child2 = childNodes[2].executeTemplate().example
if (childNodes[3]?.type === 'INSTANCE') child3 = childNodes[3].executeTemplate().example

export default {
  example: figma.code`
    <FormBox onSubmit={() => {}}>
      ${child0}${child1}${child2}${child3}
    </FormBox>
  `,
  imports: ['import { FormBox } from "compositions"'],
  id: 'form-forgot-password',
  metadata: { nestable: true },
}
