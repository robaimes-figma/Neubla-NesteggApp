// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=1443-10386
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const currency = instance.getString('Currency')
const price = instance.getString('Price')
const size = instance.getEnum('Size', {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
})

export default {
  example: figma.code`
    <TextPrice
      label="${label}"
      currency="${currency}"
      price="${price}"
      size="${size}"
    />
  `,
  imports: ['import { TextPrice } from "primitives"'],
  id: 'text-price',
  metadata: { nestable: true },
}
