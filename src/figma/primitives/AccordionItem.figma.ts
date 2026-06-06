// url=https://www.figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=7753-4634
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const children = instance.getString('Content')

export default {
  example: figma.code`
    <AccordionItem title="${title}">
      ${children}
    </AccordionItem>
  `,
  imports: ['import { AccordionItem } from "primitives"'],
  id: 'accordion-item',
  metadata: { nestable: true },
}
