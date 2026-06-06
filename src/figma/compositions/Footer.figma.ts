// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=321-11357
import figma from 'figma'
const instance = figma.selectedInstance

export default {
  example: figma.code`<Footer />`,
  imports: ['import { Footer } from "compositions"'],
  id: 'footer',
  metadata: { nestable: true },
}
