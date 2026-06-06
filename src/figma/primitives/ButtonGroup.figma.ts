// url=https://www.figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2072-9432
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const align = instance.getEnum('Align', {
  Center: 'center',
  End: 'end',
  Justify: 'justify',
  Stack: 'stack',
  Start: 'start',
})
const children = snippet('Button')

export default {
  example: figma.code`
    <ButtonGroup align="${align}">
      ${children}
    </ButtonGroup>
  `,
  imports: ['import { ButtonGroup } from "primitives"'],
  id: 'button-group',
  metadata: { nestable: true },
}
