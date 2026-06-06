// url=https://www.figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=9762-1103
import figma from 'figma'
const instance = figma.selectedInstance

const square = instance.getEnum('Shape', {
  Square: true,
  Circle: false,
})
const size = instance.getEnum('Size', {
  Large: 'large',
  Medium: 'medium',
  Small: 'small',
})
const type = instance.getEnum('Type', {
  Initial: 'initial',
  Image: 'image',
})
const initials = type === 'initial' ? instance.getString('Initials') : undefined
const hasImage = type === 'image'

export default {
  example: figma.code`
    <Avatar
      ${square ? 'square' : ''}
      size="${size}"
      ${initials ? figma.code`initials="${initials}"` : ''}
      ${hasImage ? 'src={placeholder}' : ''}
    />
  `,
  imports: [
    'import { placeholder } from "images"',
    'import { Avatar } from "primitives"',
  ],
  id: 'avatar',
  metadata: { nestable: true },
}
