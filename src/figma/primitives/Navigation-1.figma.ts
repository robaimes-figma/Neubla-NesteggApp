// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=524-503
import figma from 'figma'
const instance = figma.selectedInstance

const direction = instance.getEnum('Direction', {
  Row: 'row',
  Column: 'column',
})
const buttonLayers = instance.findLayers(
  (node) => node.name === 'Navigation Button',
  { traverseInstances: true },
)
let button1, button2, button3, button4, button5, button6, button7, button8
const buttonNodes = buttonLayers.filter((n) => n.type === 'INSTANCE')
if (buttonNodes[0]) button1 = buttonNodes[0].executeTemplate().example
if (buttonNodes[1]) button2 = buttonNodes[1].executeTemplate().example
if (buttonNodes[2]) button3 = buttonNodes[2].executeTemplate().example
if (buttonNodes[3]) button4 = buttonNodes[3].executeTemplate().example
if (buttonNodes[4]) button5 = buttonNodes[4].executeTemplate().example
if (buttonNodes[5]) button6 = buttonNodes[5].executeTemplate().example
if (buttonNodes[6]) button7 = buttonNodes[6].executeTemplate().example
if (buttonNodes[7]) button8 = buttonNodes[7].executeTemplate().example

export default {
  example: figma.code`
    <Navigation direction="${direction}">
      ${button1}
      ${button2}
      ${button3}
      ${button4}
      ${button5}
      ${button6}
      ${button7}
      ${button8}
    </Navigation>
  `,
  imports: ['import { Navigation } from "primitives"'],
  id: 'navigation-1',
  metadata: { nestable: true },
}
