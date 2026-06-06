// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2194-14984
import figma from 'figma'
const instance = figma.selectedInstance

const direction = instance.getEnum('Direction', {
  Row: 'row',
  Column: 'column',
})
const pillLayers = instance.findLayers(
  (node) => node.name === 'Navigation Pill',
  { traverseInstances: true },
)
let pill1, pill2, pill3, pill4, pill5, pill6, pill7, pill8
const pillNodes = pillLayers.filter((n) => n.type === 'INSTANCE')
if (pillNodes[0]) pill1 = pillNodes[0].executeTemplate().example
if (pillNodes[1]) pill2 = pillNodes[1].executeTemplate().example
if (pillNodes[2]) pill3 = pillNodes[2].executeTemplate().example
if (pillNodes[3]) pill4 = pillNodes[3].executeTemplate().example
if (pillNodes[4]) pill5 = pillNodes[4].executeTemplate().example
if (pillNodes[5]) pill6 = pillNodes[5].executeTemplate().example
if (pillNodes[6]) pill7 = pillNodes[6].executeTemplate().example
if (pillNodes[7]) pill8 = pillNodes[7].executeTemplate().example

export default {
  example: figma.code`
    <Navigation direction="${direction}">
      ${pill1}
      ${pill2}
      ${pill3}
      ${pill4}
      ${pill5}
      ${pill6}
      ${pill7}
      ${pill8}
    </Navigation>
  `,
  imports: ['import { Navigation } from "primitives"'],
  id: 'navigation',
  metadata: { nestable: true },
}
