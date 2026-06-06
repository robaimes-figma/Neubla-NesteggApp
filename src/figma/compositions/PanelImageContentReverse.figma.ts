// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=348-15101
import figma from 'figma'
const instance = figma.selectedInstance

const padding = instance.getEnum('Platform', { Desktop: '1600', Mobile: '600' })
const gap = instance.getEnum('Platform', { Desktop: '1200', Mobile: '600' })
const childNodes = instance.findConnectedInstances(
  (node) => ['Text Content Heading', 'Text'].includes(node.name),
  { traverseInstances: true },
)
let child0, child1
if (childNodes[0]?.type === 'INSTANCE') child0 = childNodes[0].executeTemplate().example
if (childNodes[1]?.type === 'INSTANCE') child1 = childNodes[1].executeTemplate().example

export default {
  example: figma.code`
    <Section padding="${padding}">
      <Panel gap="${gap}" type="half">
        <FlexItem size="half">
          <Flex direction="column" gap="600">
            ${child0}${child1}
          </Flex>
        </FlexItem>
        <Image
          src={placeholder}
          alt="Always use image alt"
          aspectRatio="4-3"
          size="medium"
        />
      </Panel>
    </Section>
  `,
  imports: [
    'import { Panel } from "compositions"',
    'import { placeholder } from "images"',
    'import { Flex, FlexItem, Section } from "layout"',
    'import { Image } from "primitives"',
  ],
  id: 'panel-image-content-reverse',
  metadata: { nestable: true },
}
