// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2103-22303
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')

export default {
  example: figma.code`<TextSubheading>${text}</TextSubheading>`,
  imports: ['import { TextSubheading } from "primitives"'],
  id: 'text-subheading',
  metadata: { nestable: true },
}
