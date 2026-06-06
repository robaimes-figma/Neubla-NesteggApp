// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2153-7834
import figma from 'figma'
const instance = figma.selectedInstance

const heading = instance.getString('Heading')
const subheading = instance.getString('Subheading')
const align = instance.getEnum('Align', {
  Left: 'left',
  Center: 'center',
  Right: 'right',
})

export default {
  example: figma.code`
    <TextContentHeading
      heading="${heading}"
      subheading="${subheading}"
      align="${align}"
    />
  `,
  imports: ['import { TextContentHeading } from "primitives"'],
  id: 'text-content-heading',
  metadata: { nestable: true },
}
