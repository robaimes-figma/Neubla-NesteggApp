// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=2236-14989
import figma from 'figma'
const instance = figma.selectedInstance

const valueType = instance.getPropertyValue('Value Type') as string
const value = valueType === 'Default' ? instance.getString('Value') : undefined
const placeholder =
  valueType === 'Placeholder'
    ? instance.getString('Value')
    : valueType === 'Default'
      ? 'Placeholder here...'
      : undefined
const disabled = instance.getEnum('State', {
  Disabled: true,
  Default: false,
  Hover: false,
  Focus: false,
})

export default {
  example: figma.code`
    <Search
      ${value !== undefined ? figma.code`value="${value}"` : ''}
      ${placeholder !== undefined ? figma.code`placeholder="${placeholder}"` : ''}
      ${disabled ? 'disabled' : ''}
    />
  `,
  imports: ['import { Search } from "primitives"'],
  id: 'search',
  metadata: { nestable: true },
}
