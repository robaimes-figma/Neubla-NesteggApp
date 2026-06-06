// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=1444-11846
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const textHeadingNode = instance.findInstance('Text Heading', { traverseInstances: true })
const textPriceNode = instance.findInstance('Text Price', { traverseInstances: true })
const buttonNode = instance.findInstance('Button', { traverseInstances: true })
const variant = instance.getEnum('Variant', { Stroke: 'stroke', Brand: 'brand' })
const list = snippet('Text List')

let heading = ''
if (textHeadingNode && textHeadingNode.type === 'INSTANCE') {
  heading = textHeadingNode.getString('Text')
}

let price = ''
let priceCurrency = ''
let priceLabel = ''
let size = 'large'
if (textPriceNode && textPriceNode.type === 'INSTANCE') {
  price = textPriceNode.getString('Price')
  priceCurrency = textPriceNode.getString('Currency')
  priceLabel = textPriceNode.getString('Label')
  size = textPriceNode.getEnum('Size', { Large: 'large', Small: 'small' })
}

let actionLabel = ''
let actionVariant = 'primary'
let actionIconCode
if (buttonNode && buttonNode.type === 'INSTANCE') {
  actionLabel = buttonNode.getString('Label')
  actionVariant = buttonNode.getEnum('Variant', {
    Primary: 'primary',
    Neutral: 'neutral',
    Subtle: 'subtle',
  })
  const iconSwap = buttonNode.getInstanceSwap('Icon End')
  if (iconSwap && iconSwap.type === 'INSTANCE') {
    actionIconCode = iconSwap.executeTemplate().example
  }
}

export default {
  example: figma.code`
    <PricingCard
      heading="${heading}"
      action="${actionLabel}"
      ${actionIconCode ? figma.code`actionIcon={${actionIconCode}}` : ''}
      actionVariant="${actionVariant}"
      onAction={() => {}}
      listSlot={${list}}
      interval="month"
      sku="example_sku"
      price="${price}"
      priceCurrency="${priceCurrency}"
      priceLabel="${priceLabel}"
      size="${size}"
      variant="${variant}"
    />
  `,
  imports: ['import { PricingCard } from "compositions"'],
  id: 'pricing-card',
  metadata: { nestable: true },
}
