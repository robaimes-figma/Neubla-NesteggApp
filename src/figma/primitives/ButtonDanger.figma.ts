// url=https://www.figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=185-852
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const variant = instance.getEnum('Variant', {
  Primary: 'danger-primary',
  Subtle: 'danger-subtle',
})
const size = instance.getEnum('Size', {
  Small: 'small',
  Medium: 'medium',
})
const isDisabled = instance.getEnum('State', {
  Disabled: true,
  Default: false,
})
const hasIconStart = instance.getBoolean('Has Icon Start')
const iconStartSwap = hasIconStart ? instance.getInstanceSwap('Icon Start') : null
let iconStartCode
if (iconStartSwap && iconStartSwap.type === 'INSTANCE') {
  iconStartCode = iconStartSwap.executeTemplate().example
}
const hasIconEnd = instance.getBoolean('Has Icon End')
const iconEndSwap = hasIconEnd ? instance.getInstanceSwap('Icon End') : null
let iconEndCode
if (iconEndSwap && iconEndSwap.type === 'INSTANCE') {
  iconEndCode = iconEndSwap.executeTemplate().example
}

export default {
  example: figma.code`
    <ButtonDanger
      variant="${variant}"
      ${size !== 'medium' ? figma.code`size="${size}"` : ''}
      ${isDisabled ? 'isDisabled' : ''}
      onPress={() => {}}
    >
      ${iconStartCode}${label}${iconEndCode}
    </ButtonDanger>
  `,
  imports: ['import { ButtonDanger } from "primitives"'],
  id: 'button-danger',
  metadata: { nestable: true },
}
