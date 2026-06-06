// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2087-8483
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')

export default {
  example: figma.code`<TextLink href="#">${text}</TextLink>`,
  imports: ['import { TextLink } from "primitives"'],
  id: 'text-link',
  metadata: { nestable: true },
}
