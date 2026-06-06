// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=9762:903
import figma from 'figma'
const instance = figma.selectedInstance

const childLayers = instance.findLayers(
  (node) => node.name === 'Pagination Page' || node.name === 'Pagination Gap',
  { traverseInstances: true },
)
let child1, child2, child3, child4, child5, child6, child7, child8
const childNodes = childLayers.filter((n) => n.type === 'INSTANCE')
if (childNodes[0]) child1 = childNodes[0].executeTemplate().example
if (childNodes[1]) child2 = childNodes[1].executeTemplate().example
if (childNodes[2]) child3 = childNodes[2].executeTemplate().example
if (childNodes[3]) child4 = childNodes[3].executeTemplate().example
if (childNodes[4]) child5 = childNodes[4].executeTemplate().example
if (childNodes[5]) child6 = childNodes[5].executeTemplate().example
if (childNodes[6]) child7 = childNodes[6].executeTemplate().example
if (childNodes[7]) child8 = childNodes[7].executeTemplate().example

export default {
  example: figma.code`
    <PaginationList>
      ${child1}
      ${child2}
      ${child3}
      ${child4}
      ${child5}
      ${child6}
      ${child7}
      ${child8}
    </PaginationList>
  `,
  imports: ['import { PaginationList } from "primitives"'],
  id: 'pagination-list',
  metadata: { nestable: true },
}
