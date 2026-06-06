// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=7768-19970
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const isSelected = instance.getEnum('State', {
  Active: true,
  Default: undefined,
  Hover: undefined,
})

export default {
  example: figma.code`
    <NavigationPill ${isSelected ? 'isSelected' : ''}>${label}</NavigationPill>
  `,
  imports: ['import { NavigationPill } from "primitives"'],
  id: 'navigation-pill',
  metadata: { nestable: true },
}
