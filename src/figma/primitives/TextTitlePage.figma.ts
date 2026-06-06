// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2087-8490
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')

export default {
  example: figma.code`<TextTitlePage>${text}</TextTitlePage>`,
  imports: ['import { TextTitlePage } from "primitives"'],
  id: 'text-title-page',
  metadata: { nestable: true },
}
