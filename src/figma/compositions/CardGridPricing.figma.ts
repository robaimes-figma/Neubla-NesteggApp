// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=348:14983
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const schedule = snippet('Navigation Pill List')
const cardNodes = instance.findConnectedInstances(
  (node) => node.name === 'Pricing Card',
  { traverseInstances: true },
)
let card0, card1, card2
if (cardNodes[0]?.type === 'INSTANCE') card0 = cardNodes[0].executeTemplate().example
if (cardNodes[1]?.type === 'INSTANCE') card1 = cardNodes[1].executeTemplate().example
if (cardNodes[2]?.type === 'INSTANCE') card2 = cardNodes[2].executeTemplate().example

export default {
  example: figma.code`
    <Section padding="1200">
      <Flex container direction="column" gap="1200">
        ${schedule}
        <Flex container direction="row" gap="1200">
          ${card0}${card1}${card2}
        </Flex>
      </Flex>
    </Section>
  `,
  imports: [
    'import { Flex, Section } from "layout"',
  ],
  id: 'card-grid-pricing',
  metadata: { nestable: true },
}
