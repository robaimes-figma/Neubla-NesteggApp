// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2087-8488
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')

export default {
  example: figma.code`<TextHeading>${text}</TextHeading>`,
  imports: ['import { TextHeading } from "primitives"'],
  id: 'text-heading',
  metadata: { nestable: true },
}
