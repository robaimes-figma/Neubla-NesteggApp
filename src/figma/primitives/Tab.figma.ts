// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=3729-12963
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')

export default {
  example: figma.code`
    <Tab id="${label}">${label}</Tab>
  `,
  imports: ['import { Tab } from "primitives"'],
  id: 'tab',
  metadata: { nestable: true },
}
