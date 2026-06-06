// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=322-9321
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const itemLayers = instance.findLayers(
  (node) => node.name === 'Text Link List Item',
  { traverseInstances: true },
)
let item1, item2, item3, item4, item5, item6, item7, item8
const itemNodes = itemLayers.filter((n) => n.type === 'INSTANCE')
if (itemNodes[0]) item1 = itemNodes[0].executeTemplate().example
if (itemNodes[1]) item2 = itemNodes[1].executeTemplate().example
if (itemNodes[2]) item3 = itemNodes[2].executeTemplate().example
if (itemNodes[3]) item4 = itemNodes[3].executeTemplate().example
if (itemNodes[4]) item5 = itemNodes[4].executeTemplate().example
if (itemNodes[5]) item6 = itemNodes[5].executeTemplate().example
if (itemNodes[6]) item7 = itemNodes[6].executeTemplate().example
if (itemNodes[7]) item8 = itemNodes[7].executeTemplate().example
const hasTitle = instance.getBoolean('Has Title')
const title = hasTitle ? snippet('Text Strong') : undefined
const density = instance.getEnum('Density', {
  Default: 'default',
  Tight: 'tight',
})

export default {
  example: figma.code`
    <TextLinkList density="${density}">
      ${title}
      ${item1}
      ${item2}
      ${item3}
      ${item4}
      ${item5}
      ${item6}
      ${item7}
      ${item8}
    </TextLinkList>
  `,
  imports: ['import { TextLinkList } from "primitives"'],
  id: 'text-link-list',
  metadata: { nestable: true },
}
