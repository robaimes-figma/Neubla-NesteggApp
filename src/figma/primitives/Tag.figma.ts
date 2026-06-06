// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=56-8830
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const onRemove = instance.getBoolean('Removable', {
  true: () => {},
  false: undefined,
})
const variant = instance.getEnum('Variant', {
  Primary: 'primary',
  Secondary: 'secondary',
})
const scheme = instance.getEnum('Scheme', {
  Brand: 'brand',
  Danger: 'danger',
  Positive: 'positive',
  Warning: 'warning',
  Neutral: 'neutral',
})

export default {
  example: figma.code`
    <Tag
      variant="${variant}"
      scheme="${scheme}"
      ${onRemove ? figma.code`onRemove={() => {}}` : ''}
    >
      ${label}
    </Tag>
  `,
  imports: ['import { Tag } from "primitives"'],
  id: 'tag',
  metadata: { nestable: true },
}
