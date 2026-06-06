// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=9762-3088
// variant={ "Has Label": false }
import figma from 'figma'
const instance = figma.selectedInstance

const valueType = instance.getPropertyValue('Value Type') as string
const value = valueType === 'Default' ? instance.getString('Value') : undefined
const placeholder =
  valueType === 'Placeholder'
    ? instance.getString('Value')
    : valueType === 'Default'
      ? 'I am a placeholder...'
      : undefined
const isDisabled = instance.getEnum('State', {
  Disabled: true,
  Default: false,
  Hover: false,
  Focus: false,
  Error: false,
})

export default {
  example: figma.code`
    <Textarea
      ${value !== undefined ? figma.code`value="${value}"` : ''}
      ${placeholder !== undefined ? figma.code`placeholder="${placeholder}"` : ''}
      ${isDisabled ? 'isDisabled' : ''}
    />
  `,
  imports: ['import { Textarea } from "primitives"'],
  id: 'textarea',
  metadata: { nestable: true },
}
