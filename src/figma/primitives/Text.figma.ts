// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2087-8487
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')

export default {
  example: figma.code`<Text>${text}</Text>`,
  imports: ['import { Text } from "primitives"'],
  id: 'text',
  metadata: { nestable: true },
}
