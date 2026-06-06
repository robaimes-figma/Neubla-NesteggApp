// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=515-5459
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const hasIcon = instance.getBoolean('Has Icon')
const iconSwap = hasIcon ? instance.getInstanceSwap('Icon') : null
let iconCode
if (iconSwap && iconSwap.type === 'INSTANCE') {
  iconCode = iconSwap.executeTemplate().example
}
const isSelected = instance.getEnum('State', {
  Active: true,
  Default: undefined,
  Hover: undefined,
})

export default {
  example: figma.code`
    <NavigationButton
      ${isSelected ? 'isSelected' : ''}
      ${iconCode ? figma.code`icon={${iconCode}}` : ''}
    >
      ${label}
    </NavigationButton>
  `,
  imports: ['import { NavigationButton } from "primitives"'],
  id: 'navigation-button',
  metadata: { nestable: true },
}
