// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2142-11380
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const heading = instance.getString('Heading')
const body = instance.getString('Body')
const direction = instance.getEnum('Direction', {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
})
const variant = instance.getEnum('Variant', { Stroke: 'stroke' })
const assetType = instance.getEnum('Asset Type', { Image: 'image', Icon: 'icon' })
const iconSwap = instance.getInstanceSwap('Icon')
let assetCode
if (assetType === 'icon' && iconSwap && iconSwap.type === 'INSTANCE') {
  assetCode = iconSwap.executeTemplate().example
} else {
  assetCode = figma.code`<Image alt="Always use alt text" aspectRatio="1-1" size="small" />`
}
const actions = snippet('Button Group')

export default {
  example: figma.code`
    <Card
      direction="${direction}"
      variant="${variant}"
      ${assetCode ? figma.code`asset={${assetCode}}` : ''}
    >
      <TextHeading>${heading}</TextHeading>
      <Text>${body}</Text>
      ${actions}
    </Card>
  `,
  imports: [
    'import { Card } from "compositions"',
    'import { Image, Text, TextHeading } from "primitives"',
  ],
  id: 'card',
  metadata: { nestable: true },
}
