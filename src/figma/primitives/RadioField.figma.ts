// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=9762:1412
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const description = instance.getBoolean('Has Description', {
  true: instance.getString('Description'),
  false: undefined,
})
const isDisabled = instance.getEnum('State', {
  Disabled: true,
  Default: false,
  Hover: false,
  Focus: false,
})

export default {
  example: figma.code`
    <RadioField
      value="Initial value"
      label="${label}"
      ${description ? figma.code`description="${description}"` : ''}
      ${isDisabled ? 'isDisabled' : ''}
    />
  `,
  imports: ['import { RadioField } from "primitives"'],
  id: 'radio-field',
  metadata: { nestable: true },
}
