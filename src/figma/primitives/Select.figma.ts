// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2136-2336
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
const defaultSelectedKey = instance.getString('Value')
const isDisabled = instance.getEnum('State', {
  Disabled: true,
  Default: false,
  Hover: false,
  Focus: false,
  Error: false,
})

export default {
  example: figma.code`
    <Select
      defaultSelectedKey="${defaultSelectedKey}"
      ${value !== undefined ? figma.code`value="${value}"` : ''}
      ${placeholder !== undefined ? figma.code`placeholder="${placeholder}"` : ''}
      ${isDisabled ? 'isDisabled' : ''}
    >
      <SelectItem>${defaultSelectedKey}</SelectItem>
      <SelectItem>Option 2</SelectItem>
      <SelectItem>Option 3</SelectItem>
      <SelectItem>Option 4</SelectItem>
      <SelectItem>Option 5</SelectItem>
    </Select>
  `,
  imports: ['import { Select, SelectItem } from "primitives"'],
  id: 'select',
  metadata: { nestable: true },
}
