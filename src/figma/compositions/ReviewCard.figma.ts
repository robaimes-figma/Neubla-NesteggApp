// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2236-16106
import figma from 'figma'
const instance = figma.selectedInstance

const headingNode = instance.findInstance('Text Heading', { traverseInstances: true })
const bodyNode = instance.findInstance('Text', { traverseInstances: true })
const avatarBlockNode = instance.findInstance('Avatar Block', { traverseInstances: true })

let heading = ''
if (headingNode && headingNode.type === 'INSTANCE') {
  heading = headingNode.getString('Text')
}

let body = ''
if (bodyNode && bodyNode.type === 'INSTANCE') {
  body = bodyNode.getString('Text')
}

let name = ''
let date = ''
if (avatarBlockNode && avatarBlockNode.type === 'INSTANCE') {
  name = avatarBlockNode.getString('Title')
  date = avatarBlockNode.getString('Description')
}

export default {
  example: figma.code`
    <ReviewCard
      stars={5}
      src={placeholder}
      title="${heading}"
      body="${body}"
      date="${date}"
      name="${name}"
    />
  `,
  imports: [
    'import { ReviewCard } from "compositions"',
    'import { placeholder } from "images"',
  ],
  id: 'review-card',
  metadata: { nestable: true },
}
