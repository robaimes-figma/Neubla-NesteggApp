// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=348:15147
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const padding = instance.getEnum('Platform', { Desktop: '1600', Mobile: '600' })
const gap = instance.getEnum('Platform', { Desktop: '1200', Mobile: '600' })
const textHeading = snippet('Text Heading')
const tagAndPriceNodes = instance.findConnectedInstances(
  (node) => ['Tag', 'Text Price'].includes(node.name),
  { traverseInstances: true },
)
let tagAndPrice0, tagAndPrice1
if (tagAndPriceNodes[0]?.type === 'INSTANCE')
  tagAndPrice0 = tagAndPriceNodes[0].executeTemplate().example
if (tagAndPriceNodes[1]?.type === 'INSTANCE')
  tagAndPrice1 = tagAndPriceNodes[1].executeTemplate().example
const text = snippet('Text')
const fieldNodes = instance.findConnectedInstances(
  (node) => node.name === 'Select Field',
  { traverseInstances: true },
)
let field0, field1
if (fieldNodes[0]?.type === 'INSTANCE') field0 = fieldNodes[0].executeTemplate().example
if (fieldNodes[1]?.type === 'INSTANCE') field1 = fieldNodes[1].executeTemplate().example
const button = snippet('Button')
const accordion = snippet('Accordion')

export default {
  example: figma.code`
    <Section padding="${padding}">
      <Flex container type="half" wrap gap="${gap}">
        <Image
          src={placeholder}
          alt="Always use image alt"
          size="large"
          aspectRatio="4-3"
        />
        <FlexItem size="half">
          <Flex direction="column" gap="600" alignSecondary="stretch">
            ${textHeading}
            <FlexItem>
              <Flex direction="column" gap="200">
                ${tagAndPrice0}${tagAndPrice1}
              </Flex>
            </FlexItem>
            ${text}
            <FlexItem>
              <Flex wrap type="half" gap="200">
                ${field0}${field1}
              </Flex>
            </FlexItem>
            ${button}
            ${accordion}
          </Flex>
        </FlexItem>
      </Flex>
    </Section>
  `,
  imports: [
    'import { placeholder } from "images"',
    'import { Flex, FlexItem, Section } from "layout"',
    'import { Image } from "primitives"',
  ],
  id: 'page-product',
  metadata: { nestable: true },
}
