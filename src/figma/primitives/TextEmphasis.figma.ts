// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2087-8485
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')

export default {
  example: figma.code`<TextEmphasis>${text}</TextEmphasis>`,
  imports: ['import { TextEmphasis } from "primitives"'],
  id: 'text-emphasis',
  metadata: { nestable: true },
}
