// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2287-22651
import figma from 'figma'
const instance = figma.selectedInstance

export default {
  example: figma.code`<Header />`,
  imports: ['import { Header } from "compositions"'],
  id: 'header',
  metadata: { nestable: true },
}
