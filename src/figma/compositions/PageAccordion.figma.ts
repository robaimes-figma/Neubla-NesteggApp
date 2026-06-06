// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=348:13173
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const padding = instance.getEnum('Platform', { Desktop: '1600', Mobile: '600' })
const gap = instance.getEnum('Platform', { Desktop: '1200', Mobile: '600' })
const title = snippet('Text Content Heading')
const children = snippet('Accordion')

export default {
  example: figma.code`
    <Section padding="${padding}">
      <Flex container alignSecondary="center" direction="column" gap="${gap}">
        ${title}
        <FlexItem>
          <Flex container type="third" alignPrimary="center">
            <FlexItem size="major">${children}</FlexItem>
          </Flex>
        </FlexItem>
      </Flex>
    </Section>
  `,
  imports: [
    'import { Flex, FlexItem, Section } from "layout"',
  ],
  id: 'page-accordion',
  metadata: { nestable: true },
}
