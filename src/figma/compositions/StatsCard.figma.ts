// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2236-15082
import figma from 'figma'
const instance = figma.selectedInstance

const descriptionNode = instance.findInstance('Text', { traverseInstances: true })
const statNode = instance.findInstance('Text Heading', { traverseInstances: true })
const iconSwap = instance.getInstanceSwap('Icon')

let description = ''
if (descriptionNode && descriptionNode.type === 'INSTANCE') {
  description = descriptionNode.getString('Text')
}

let stat = ''
if (statNode && statNode.type === 'INSTANCE') {
  stat = statNode.getString('Text')
}

let iconCode
if (iconSwap && iconSwap.type === 'INSTANCE') {
  iconCode = iconSwap.executeTemplate().example
}

export default {
  example: figma.code`
    <StatsCard
      description="${description}"
      stat="${stat}"
      ${iconCode ? figma.code`icon={${iconCode}}` : ''}
    />
  `,
  imports: ['import { StatsCard } from "compositions"'],
  id: 'stats-card',
  metadata: { nestable: true },
}
