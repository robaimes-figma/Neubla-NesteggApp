// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=9762:1902
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const description = instance.getBoolean('Has Description', {
  true: instance.getString('Description'),
  false: undefined,
})
const defaultSelected = instance.getEnum('Value Type', {
  Checked: true,
  Default: false,
  Unchecked: false,
})
const isDisabled = instance.getEnum('State', {
  Disabled: true,
  Default: false,
  Hover: false,
  Focus: false,
})

export default {
  example: figma.code`
    <SwitchField
      label="${label}"
      ${description ? figma.code`description="${description}"` : ''}
      ${defaultSelected ? 'defaultSelected' : ''}
      ${isDisabled ? 'isDisabled' : ''}
    />
  `,
  imports: ['import { SwitchField } from "primitives"'],
  id: 'switch-field',
  metadata: { nestable: true },
}
