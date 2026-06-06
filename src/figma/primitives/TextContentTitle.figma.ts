// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2153-7838
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const subtitle = instance.getString('Subtitle')
const align = instance.getEnum('Align', {
  Left: 'left',
  Center: 'center',
  Right: 'right',
})

export default {
  example: figma.code`
    <TextContentTitle
      title="${title}"
      subtitle="${subtitle}"
      align="${align}"
    />
  `,
  imports: ['import { TextContentTitle } from "primitives"'],
  id: 'text-content-title',
  metadata: { nestable: true },
}
