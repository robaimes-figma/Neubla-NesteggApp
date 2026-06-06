// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2087-8484
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')

export default {
  example: figma.code`<TextSmall>${text}</TextSmall>`,
  imports: ['import { TextSmall } from "primitives"'],
  id: 'text-small',
  metadata: { nestable: true },
}
