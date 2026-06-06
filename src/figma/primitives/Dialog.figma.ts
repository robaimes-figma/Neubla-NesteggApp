// url=https://www.figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=9762-696
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const type = instance.getEnum('Type', {
  Card: 'card',
  Sheet: 'sheet',
})
const heading = instance.getString('Heading')
const body = instance.getString('Body')
const buttons = snippet('Button Group')

export default {
  example: figma.code`
    <Dialog type="${type}">
      <DialogClose onPress={() => {}} />
      <DialogTitle>${heading}</DialogTitle>
      <DialogBody>${body}</DialogBody>
      ${buttons}
    </Dialog>
  `,
  imports: [
    'import { Dialog, DialogBody, DialogClose, DialogTitle } from "primitives"',
  ],
  id: 'dialog-body',
  metadata: { nestable: true },
}
