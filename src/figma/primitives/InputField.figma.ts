// url=https://www.figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2136-2263
// variant={"Has Label": true}
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const description = instance.getBoolean('Has Description', {
  true: instance.getString('Description'),
  false: undefined,
})
const state = instance.getEnum('State', {
  Error: 'error',
  Disabled: 'disabled',
  Default: 'default',
})
const isDisabled = state === 'disabled'
const errorMessage = state === 'error' ? instance.getString('Error') : undefined
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
    <InputField
      label="${label}"
      ${description ? figma.code`description="${description}"` : ''}
      ${isDisabled ? 'isDisabled' : ''}
      ${errorMessage ? figma.code`errorMessage="${errorMessage}"` : ''}
      ${value ? figma.code`value="${value}"` : ''}
      placeholder="${placeholder}"
    />
  `,
  imports: ['import { InputField } from "primitives"'],
  id: 'input-field',
  metadata: { nestable: true },
}
