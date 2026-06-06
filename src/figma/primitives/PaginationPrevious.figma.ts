// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=9762:880
import figma from 'figma'
const instance = figma.selectedInstance

const href = instance.getEnum('State', {
  Default: '?previous',
  Hover: '?previous',
})

export default {
  example: figma.code`
    <PaginationPrevious href="${href}" />
  `,
  imports: ['import { PaginationPrevious } from "primitives"'],
  id: 'pagination-previous',
  metadata: { nestable: true },
}
