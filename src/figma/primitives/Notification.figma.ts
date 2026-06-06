// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=124-8256
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const title = instance.getString('Title')
const body = instance.getString('Body')
const hasIcon = instance.getBoolean('Has Icon')
const iconSwap = hasIcon ? instance.getInstanceSwap('Icon') : null
let iconCode
if (iconSwap && iconSwap.type === 'INSTANCE') {
  iconCode = iconSwap.executeTemplate().example
}
const isDismissible = instance.getBoolean('Dismissible')
const button = snippet('Button')
const variant = instance.getEnum('Variant', {
  Message: 'message',
  Alert: 'alert',
})

export default {
  example: figma.code`
    <Notification
      variant="${variant}"
      ${isDismissible ? 'isDismissible' : ''}
      ${iconCode ? figma.code`icon={${iconCode}}` : ''}
    >
      <TextStrong>${title}</TextStrong>
      <Text>${body}</Text>
      ${button}
    </Notification>
  `,
  imports: ['import { Notification, Text, TextStrong } from "primitives"'],
  id: 'notification',
  metadata: { nestable: true },
}
