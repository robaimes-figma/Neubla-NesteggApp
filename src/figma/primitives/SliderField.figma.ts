// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=589-17676
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
    <SliderField
      showOutput
      label="${label}"
      ${description ? figma.code`description="${description}"` : ''}
      ${isDisabled ? 'isDisabled' : ''}
    />
  `,
  imports: ['import { SliderField } from "primitives"'],
  id: 'slider-field',
  metadata: { nestable: true },
}
