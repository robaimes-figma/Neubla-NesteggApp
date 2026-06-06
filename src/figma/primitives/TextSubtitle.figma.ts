// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2103-22298
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')

export default {
  example: figma.code`<TextSubtitle>${text}</TextSubtitle>`,
  imports: ['import { TextSubtitle } from "primitives"'],
  id: 'text-subtitle',
  metadata: { nestable: true },
}
