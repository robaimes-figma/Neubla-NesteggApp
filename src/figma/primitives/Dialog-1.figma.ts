// url=https://www.figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=192-31534
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const children = snippet('Dialog Body')

export default {
  example: figma.code`
    <DialogModal isDismissable isOpen={true} onOpenChange={() => {}}>
      ${children}
    </DialogModal>
  `,
  imports: ['import { DialogModal } from "primitives"'],
  id: 'dialog-modal',
  metadata: { nestable: true },
}
