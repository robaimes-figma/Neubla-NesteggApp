// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=315-32700
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const hasBody = instance.getBoolean('Has Body')
const bodyText = hasBody ? instance.getString('Body') : undefined
const placement = instance.getEnum('Placement', {
  Bottom: 'bottom',
  Top: 'top',
  Right: 'right',
  Left: 'left',
})

export default {
  example: figma.code`
    <Tooltip placement="${placement}">
      <TextStrong>${title}</TextStrong>
      ${bodyText ? figma.code`<TextSmall>${bodyText}</TextSmall>` : ''}
    </Tooltip>
  `,
  imports: ['import { TextSmall, TextStrong, Tooltip } from "primitives"'],
  id: 'tooltip',
  metadata: { nestable: true },
}
