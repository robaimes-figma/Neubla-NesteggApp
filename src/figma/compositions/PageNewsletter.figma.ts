// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=348:15133
import figma from 'figma'
const instance = figma.selectedInstance

const padding = instance.getEnum('Platform', { Desktop: '1600', Mobile: '600' })
const gap = instance.getEnum('Platform', { Desktop: '1200', Mobile: '600' })
const childNodes = instance.findConnectedInstances(
  (node) => ['Text Content Heading', 'Form Newsletter'].includes(node.name),
  { traverseInstances: true },
)
let child0, child1
if (childNodes[0]?.type === 'INSTANCE') child0 = childNodes[0].executeTemplate().example
if (childNodes[1]?.type === 'INSTANCE') child1 = childNodes[1].executeTemplate().example

export default {
  example: figma.code`
    <Section padding="${padding}">
      <Flex
        container
        wrap
        gap="${gap}"
        direction="column"
        alignPrimary="center"
        alignSecondary="center"
        type="third"
      >
        ${child0}${child1}
      </Flex>
    </Section>
  `,
  imports: [
    'import { Flex, Section } from "layout"',
  ],
  id: 'page-newsletter',
  metadata: { nestable: true },
}
