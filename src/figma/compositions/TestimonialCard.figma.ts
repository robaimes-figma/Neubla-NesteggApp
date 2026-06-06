// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=7717-3946
import figma from 'figma'
const instance = figma.selectedInstance

const headingNode = instance.findInstance('Text Heading', { traverseInstances: true })
const avatarBlockNode = instance.findInstance('Avatar Block', { traverseInstances: true })

let heading = ''
if (headingNode && headingNode.type === 'INSTANCE') {
  heading = headingNode.getString('Text')
}

let name = ''
let username = ''
if (avatarBlockNode && avatarBlockNode.type === 'INSTANCE') {
  name = avatarBlockNode.getString('Title')
  username = avatarBlockNode.getString('Description')
}

export default {
  example: figma.code`
    <TestimonialCard
      heading="${heading}"
      src={placeholder}
      name="${name}"
      username="${username}"
    />
  `,
  imports: [
    'import { TestimonialCard } from "compositions"',
    'import { placeholder } from "images"',
  ],
  id: 'testimonial-card',
  metadata: { nestable: true },
}
