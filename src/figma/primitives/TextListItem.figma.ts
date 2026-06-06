// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2077-11663
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')

export default {
  example: figma.code`<TextListItem>${text}</TextListItem>`,
  imports: ['import { TextListItem } from "primitives"'],
  id: 'text-list-item',
  metadata: { nestable: true },
}
