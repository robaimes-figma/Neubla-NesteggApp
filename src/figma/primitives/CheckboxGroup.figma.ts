// url=https://www.figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=9762-1426
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const children = snippet('Checkbox Field')

export default {
  example: figma.code`
    <CheckboxGroup>
      ${children}
    </CheckboxGroup>
  `,
  imports: ['import { CheckboxGroup } from "primitives"'],
  id: 'checkbox-group',
  metadata: { nestable: true },
}
