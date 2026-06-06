// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2153-7973
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')

export default {
  example: figma.code`
    <TextListItem>
      <TextLink href="#">${text}</TextLink>
    </TextListItem>
  `,
  imports: ['import { TextLink, TextListItem } from "primitives"'],
  id: 'text-list-item-1',
  metadata: { nestable: true },
}
