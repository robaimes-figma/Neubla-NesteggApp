// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=157-10352
import figma from 'figma'
const instance = figma.selectedInstance

const toggleLayers = instance.findLayers(
  (node) => node.name === 'Tag Toggle',
  { traverseInstances: true },
)
let toggle1, toggle2, toggle3, toggle4, toggle5, toggle6, toggle7, toggle8
const toggleNodes = toggleLayers.filter((n) => n.type === 'INSTANCE')
if (toggleNodes[0]) toggle1 = toggleNodes[0].executeTemplate().example
if (toggleNodes[1]) toggle2 = toggleNodes[1].executeTemplate().example
if (toggleNodes[2]) toggle3 = toggleNodes[2].executeTemplate().example
if (toggleNodes[3]) toggle4 = toggleNodes[3].executeTemplate().example
if (toggleNodes[4]) toggle5 = toggleNodes[4].executeTemplate().example
if (toggleNodes[5]) toggle6 = toggleNodes[5].executeTemplate().example
if (toggleNodes[6]) toggle7 = toggleNodes[6].executeTemplate().example
if (toggleNodes[7]) toggle8 = toggleNodes[7].executeTemplate().example

export default {
  example: figma.code`
    <TagToggleGroup>
      <Label>Label this!</Label>
      <TagToggleList>
        ${toggle1}
        ${toggle2}
        ${toggle3}
        ${toggle4}
        ${toggle5}
        ${toggle6}
        ${toggle7}
        ${toggle8}
      </TagToggleList>
    </TagToggleGroup>
  `,
  imports: ['import { Label, TagToggleGroup, TagToggleList } from "primitives"'],
  id: 'tag-toggle-group',
  metadata: { nestable: true },
}
