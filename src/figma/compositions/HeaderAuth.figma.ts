// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=18-9389
import figma from 'figma'
const instance = figma.selectedInstance

export default {
  example: figma.code`<HeaderAuth />`,
  imports: ['import { HeaderAuth } from "compositions"'],
  id: 'header-auth',
  metadata: { nestable: true },
}
