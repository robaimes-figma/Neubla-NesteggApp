// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=348:13517
import figma from 'figma'
const instance = figma.selectedInstance

const padding = instance.getEnum('Platform', { Desktop: '1600', Mobile: '600' })
const gap = instance.getEnum('Platform', { Desktop: '1200', Mobile: '600' })
const majorSize = instance.getEnum('Platform', { Desktop: 'major', Mobile: 'full' })
const controlNodes = instance.findConnectedInstances(
  (node) => ['Search', 'Tag Toggle Group'].includes(node.name),
  { traverseInstances: true },
)
let control0, control1
if (controlNodes[0]?.type === 'INSTANCE') control0 = controlNodes[0].executeTemplate().example
if (controlNodes[1]?.type === 'INSTANCE') control1 = controlNodes[1].executeTemplate().example
const cardNodes = instance.findConnectedInstances(
  (node) => node.name === 'Product Info Card',
  { traverseInstances: true },
)
let card0, card1, card2, card3, card4, card5
if (cardNodes[0]?.type === 'INSTANCE') card0 = cardNodes[0].executeTemplate().example
if (cardNodes[1]?.type === 'INSTANCE') card1 = cardNodes[1].executeTemplate().example
if (cardNodes[2]?.type === 'INSTANCE') card2 = cardNodes[2].executeTemplate().example
if (cardNodes[3]?.type === 'INSTANCE') card3 = cardNodes[3].executeTemplate().example
if (cardNodes[4]?.type === 'INSTANCE') card4 = cardNodes[4].executeTemplate().example
if (cardNodes[5]?.type === 'INSTANCE') card5 = cardNodes[5].executeTemplate().example
const asideNodes = instance.findConnectedInstances(
  (node) => ['Text', 'Tag', 'Checkbox Group', 'Slider Field'].includes(node.name),
  { traverseInstances: true },
)
let aside0, aside1, aside2, aside3, aside4
if (asideNodes[0]?.type === 'INSTANCE') aside0 = asideNodes[0].executeTemplate().example
if (asideNodes[1]?.type === 'INSTANCE') aside1 = asideNodes[1].executeTemplate().example
if (asideNodes[2]?.type === 'INSTANCE') aside2 = asideNodes[2].executeTemplate().example
if (asideNodes[3]?.type === 'INSTANCE') aside3 = asideNodes[3].executeTemplate().example
if (asideNodes[4]?.type === 'INSTANCE') aside4 = asideNodes[4].executeTemplate().example

export default {
  example: figma.code`
    <Section padding="${padding}">
      <Flex container wrap type="quarter" gap="${gap}">
        <FlexItem size="minor">
          <Card variant="stroke">${aside0}${aside1}${aside2}${aside3}${aside4}</Card>
        </FlexItem>
        <FlexItem size="${majorSize}">
          <Flex direction="column" gap="${gap}" alignSecondary="stretch">
            <Flex type="auto" alignPrimary="space-between" wrap gap="600">
              ${control0}${control1}
            </Flex>
            <Flex type="third" wrap gap="600">
              ${card0}${card1}${card2}${card3}${card4}${card5}
            </Flex>
          </Flex>
        </FlexItem>
      </Flex>
    </Section>
  `,
  imports: [
    'import { Card } from "compositions"',
    'import { Flex, FlexItem, Section } from "layout"',
  ],
  id: 'page-product-results',
  metadata: { nestable: true },
}
