// url=https://www.figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=9762-1441
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const description = instance.getBoolean('Has Description', {
  true: instance.getString('Description'),
  false: undefined,
})
const valueType = instance.getEnum('Value Type', {
  Checked: 'checked',
  Indeterminate: 'indeterminate',
  Unchecked: 'unchecked',
})
const defaultSelected =
  valueType === 'checked' || valueType === 'indeterminate'
const isIndeterminate = valueType === 'indeterminate'
const isDisabled = instance.getEnum('State', {
  Disabled: true,
  Default: false,
})

export default {
  example: figma.code`
    <CheckboxField
      label="${label}"
      ${description ? figma.code`description="${description}"` : ''}
      ${defaultSelected ? 'defaultSelected' : ''}
      ${isIndeterminate ? 'isIndeterminate' : ''}
      ${isDisabled ? 'isDisabled' : ''}
    />
  `,
  imports: ['import { CheckboxField } from "primitives"'],
  id: 'checkbox-field',
  metadata: { nestable: true },
}
