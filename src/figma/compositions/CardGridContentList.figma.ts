// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=348:13407
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const gap = instance.getEnum('Platform', { Desktop: '1200', Mobile: '600' })
const padding = instance.getEnum('Platform', { Desktop: '1200', Mobile: '600' })
const top = snippet('Text Content Heading')
const cardNodes = instance.findConnectedInstances(
  (node) => node.name === 'Card',
  { traverseInstances: true },
)
let card0, card1, card2
if (cardNodes[0]?.type === 'INSTANCE') card0 = cardNodes[0].executeTemplate().example
if (cardNodes[1]?.type === 'INSTANCE') card1 = cardNodes[1].executeTemplate().example
if (cardNodes[2]?.type === 'INSTANCE') card2 = cardNodes[2].executeTemplate().example

export default {
  example: figma.code`
    <Section padding="${padding}">
      <Flex container gap="1200" direction="column" alignSecondary="stretch">
        ${top}
        <FlexItem>
          <Flex wrap direction="column" gap="${gap}">
            ${card0}${card1}${card2}
          </Flex>
        </FlexItem>
      </Flex>
    </Section>
  `,
  imports: [
    'import { Flex, FlexItem, Section } from "layout"',
  ],
  id: 'card-grid-content-list',
  metadata: { nestable: true },
}
