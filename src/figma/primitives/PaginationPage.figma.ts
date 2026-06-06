// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=9762:890
import figma from 'figma'
const instance = figma.selectedInstance

const number = instance.getString('Number')
const href = number
const current = instance.getEnum('State', {
  Current: true,
  'Current Hover': true,
  Default: false,
  Hover: false,
})

export default {
  example: figma.code`
    <PaginationPage href="${href}" ${current ? 'current' : ''}>${number}</PaginationPage>
  `,
  imports: ['import { PaginationPage } from "primitives"'],
  id: 'pagination-page',
  metadata: { nestable: true },
}
