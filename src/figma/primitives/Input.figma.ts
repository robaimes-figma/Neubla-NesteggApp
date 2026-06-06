// url=https://www.figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2136-2263
// variant={"Has Label": false}
import figma from 'figma'
const instance = figma.selectedInstance

const isDisabled = instance.getEnum('State', {
  Disabled: true,
  Default: false,
})
const valueType = instance.getEnum('Value Type', {
  Default: 'default',
  Placeholder: 'placeholder',
})
const value = valueType === 'default' ? instance.getString('Value') : undefined
const placeholder =
  valueType === 'placeholder'
    ? instance.getString('Value')
    : 'I am a placeholder...'

export default {
  example: figma.code`
    <Input
      ${isDisabled ? 'isDisabled' : ''}
      ${value ? figma.code`value="${value}"` : ''}
      placeholder="${placeholder}"
    />
  `,
  imports: ['import { Input } from "primitives"'],
  id: 'input',
  metadata: { nestable: true },
}
