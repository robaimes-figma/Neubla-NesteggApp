// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=7753-4465
import figma from 'figma'
const instance = figma.selectedInstance

const textNode = instance.findInstance('Text', { traverseInstances: true })
const priceNode = instance.findInstance('Text Strong', { traverseInstances: true })
const descriptionNode = instance.findInstance('Text Small', { traverseInstances: true })

let text = ''
if (textNode && textNode.type === 'INSTANCE') {
  text = textNode.getString('Text')
}

let price = ''
if (priceNode && priceNode.type === 'INSTANCE') {
  price = priceNode.getString('Text')
}

let description = ''
if (descriptionNode && descriptionNode.type === 'INSTANCE') {
  description = descriptionNode.getString('Text')
}

export default {
  example: figma.code`
    <ProductInfoCard
      asset={
        <Image
          src={placeholder}
          size="medium"
          aspectRatio="natural"
          alt="Always describe images"
        />
      }
      rating={4.5}
      heading="${text}"
      price="${price}"
      description="${description}"
    />
  `,
  imports: [
    'import { ProductInfoCard } from "compositions"',
    'import { placeholder } from "images"',
    'import { Image } from "primitives"',
  ],
  id: 'product-info-card',
  metadata: { nestable: true },
}
