// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=9762:899
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const paginationPrevious = snippet('Pagination Previous')
const paginationList = snippet('Pagination List')
const paginationNext = snippet('Pagination Next')

export default {
  example: figma.code`
    <Pagination>
      ${paginationPrevious}
      ${paginationList}
      ${paginationNext}
    </Pagination>
  `,
  imports: ['import { Pagination } from "primitives"'],
  id: 'pagination',
  metadata: { nestable: true },
}
