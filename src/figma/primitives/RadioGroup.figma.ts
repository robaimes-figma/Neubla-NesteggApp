// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=624-23642
import figma from 'figma'
const instance = figma.selectedInstance

const fieldLayers = instance.findLayers(
  (node) => node.name === 'Radio Field',
  { traverseInstances: true },
)
let field1, field2, field3, field4, field5, field6, field7, field8
const fieldNodes = fieldLayers.filter((n) => n.type === 'INSTANCE')
if (fieldNodes[0]) field1 = fieldNodes[0].executeTemplate().example
if (fieldNodes[1]) field2 = fieldNodes[1].executeTemplate().example
if (fieldNodes[2]) field3 = fieldNodes[2].executeTemplate().example
if (fieldNodes[3]) field4 = fieldNodes[3].executeTemplate().example
if (fieldNodes[4]) field5 = fieldNodes[4].executeTemplate().example
if (fieldNodes[5]) field6 = fieldNodes[5].executeTemplate().example
if (fieldNodes[6]) field7 = fieldNodes[6].executeTemplate().example
if (fieldNodes[7]) field8 = fieldNodes[7].executeTemplate().example

export default {
  example: figma.code`
    <RadioGroup>
      ${field1}
      ${field2}
      ${field3}
      ${field4}
      ${field5}
      ${field6}
      ${field7}
      ${field8}
    </RadioGroup>
  `,
  imports: ['import { RadioGroup } from "primitives"'],
  id: 'radio-group',
  metadata: { nestable: true },
}
