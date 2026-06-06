// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2136-2336
// variant={ "Has Label": true }
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const description = instance.getBoolean('Has Description', {
  true: instance.getString('Description'),
  false: undefined,
})
const valueType = instance.getPropertyValue('Value Type') as string
const value = valueType === 'Default' ? instance.getString('Value') : undefined
const placeholder =
  valueType === 'Placeholder'
    ? instance.getString('Value')
    : valueType === 'Default'
      ? 'I am a placeholder...'
      : undefined
const defaultSelectedKey = instance.getString('Value')
const isDisabled = instance.getEnum('State', {
  Disabled: true,
  Default: false,
  Hover: false,
  Focus: false,
  Error: false,
})
const state = instance.getPropertyValue('State') as string
const errorMessage = state === 'Error' ? instance.getString('Error') : undefined

export default {
  example: figma.code`
    <SelectField
      label="${label}"
      defaultSelectedKey="${defaultSelectedKey}"
      ${description ? figma.code`description="${description}"` : ''}
      ${value !== undefined ? figma.code`value="${value}"` : ''}
      ${placeholder !== undefined ? figma.code`placeholder="${placeholder}"` : ''}
      ${isDisabled ? 'isDisabled' : ''}
      ${errorMessage ? figma.code`errorMessage="${errorMessage}"` : ''}
    >
      <SelectItem>${defaultSelectedKey}</SelectItem>
      <SelectItem>Option 2</SelectItem>
      <SelectItem>Option 3</SelectItem>
      <SelectItem>Option 4</SelectItem>
      <SelectItem>Option 5</SelectItem>
    </SelectField>
  `,
  imports: ['import { SelectField, SelectItem } from "primitives"'],
  id: 'select-field',
  metadata: { nestable: true },
}
