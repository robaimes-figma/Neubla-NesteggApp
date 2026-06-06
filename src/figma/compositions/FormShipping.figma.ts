// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=197:23153
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const legend = snippet('Text')
const childNodes = instance.findConnectedInstances(
  (node) =>
    ['Input Field', 'Select Field', 'Textarea Field', 'Checkbox Field', 'Button Group'].includes(
      node.name,
    ),
  { traverseInstances: true },
)
let child0, child1, child2, child3, child4, child5, child6
if (childNodes[0]?.type === 'INSTANCE') child0 = childNodes[0].executeTemplate().example
if (childNodes[1]?.type === 'INSTANCE') child1 = childNodes[1].executeTemplate().example
if (childNodes[2]?.type === 'INSTANCE') child2 = childNodes[2].executeTemplate().example
if (childNodes[3]?.type === 'INSTANCE') child3 = childNodes[3].executeTemplate().example
if (childNodes[4]?.type === 'INSTANCE') child4 = childNodes[4].executeTemplate().example
if (childNodes[5]?.type === 'INSTANCE') child5 = childNodes[5].executeTemplate().example
if (childNodes[6]?.type === 'INSTANCE') child6 = childNodes[6].executeTemplate().example

export default {
  example: figma.code`
    <FormBox onSubmit={() => {}}>
      <Flex direction="column" gap="100">
        ${legend}
      </Flex>
      ${child0}${child1}${child2}${child3}${child4}${child5}${child6}
    </FormBox>
  `,
  imports: [
    'import { FormBox } from "compositions"',
    'import { Flex } from "layout"',
  ],
  id: 'form-shipping',
  metadata: { nestable: true },
}
