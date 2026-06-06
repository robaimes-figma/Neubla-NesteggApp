// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2104-22325
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')

export default {
  example: figma.code`<TextCode>${text}</TextCode>`,
  imports: ['import { TextCode } from "primitives"'],
  id: 'text-code',
  metadata: { nestable: true },
}
