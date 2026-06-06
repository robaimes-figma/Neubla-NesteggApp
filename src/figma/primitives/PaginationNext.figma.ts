// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=9762:870
import figma from 'figma'
const instance = figma.selectedInstance

const href = instance.getEnum('State', {
  Default: '?next',
  Hover: '?next',
})

export default {
  example: figma.code`
    <PaginationNext href="${href}" />
  `,
  imports: ['import { PaginationNext } from "primitives"'],
  id: 'pagination-next',
  metadata: { nestable: true },
}
