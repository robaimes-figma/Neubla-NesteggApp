// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2087-8486
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')

export default {
  example: figma.code`<TextStrong>${text}</TextStrong>`,
  imports: ['import { TextStrong } from "primitives"'],
  id: 'text-strong',
  metadata: { nestable: true },
}
