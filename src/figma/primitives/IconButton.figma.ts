// url=https://www.figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=11-11508
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  Primary: 'primary',
  Neutral: 'neutral',
  Subtle: 'subtle',
})
const size = instance.getEnum('Size', {
  Small: 'small',
  Medium: 'medium',
})
const isDisabled = instance.getEnum('State', {
  Disabled: true,
  Default: false,
})
const iconSwap = instance.getInstanceSwap('Icon')
let iconCode
if (iconSwap && iconSwap.type === 'INSTANCE') {
  iconCode = iconSwap.executeTemplate().example
}

export default {
  example: figma.code`
    <IconButton
      variant="${variant}"
      ${size !== 'medium' ? figma.code`size="${size}"` : ''}
      ${isDisabled ? 'isDisabled' : ''}
      aria-label="Write a nice description of the action."
      onPress={() => {}}
    >
      ${iconCode}
    </IconButton>
  `,
  imports: ['import { IconButton } from "primitives"'],
  id: 'icon-button',
  metadata: { nestable: true },
}
