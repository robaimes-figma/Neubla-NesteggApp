// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2087-8491
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')

export default {
  example: figma.code`<TextTitleHero>${text}</TextTitleHero>`,
  imports: ['import { TextTitleHero } from "primitives"'],
  id: 'text-title-hero',
  metadata: { nestable: true },
}
