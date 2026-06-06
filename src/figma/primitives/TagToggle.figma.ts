// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=157-10316
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const iconSwap = instance.getInstanceSwap('Icon')
let iconStart
if (iconSwap && iconSwap.type === 'INSTANCE') {
  iconStart = iconSwap.executeTemplate().example
}

export default {
  example: figma.code`
    <TagToggle
      id="${label}"
      ${iconStart ? figma.code`iconStart={${iconStart}}` : ''}
    >
      ${label}
    </TagToggle>
  `,
  imports: ['import { TagToggle } from "primitives"'],
  id: 'tag-toggle',
  metadata: { nestable: true },
}
