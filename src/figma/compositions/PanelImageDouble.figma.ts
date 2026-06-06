// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=348-13470
import figma from 'figma'
const instance = figma.selectedInstance

const padding = instance.getEnum('Platform', { Desktop: '1600', Mobile: '600' })
const gap = instance.getEnum('Platform', { Desktop: '1200', Mobile: '600' })

export default {
  example: figma.code`
    <Section padding="${padding}">
      <Panel gap="${gap}" type="half">
        <Image
          src={placeholder}
          alt="Always use image alt"
          aspectRatio="4-3"
          size="medium"
        />
        <Image
          src={placeholder}
          alt="Always use image alt"
          aspectRatio="4-3"
          size="medium"
        />
      </Panel>
    </Section>
  `,
  imports: [
    'import { Panel } from "compositions"',
    'import { placeholder } from "images"',
    'import { Section } from "layout"',
    'import { Image } from "primitives"',
  ],
  id: 'panel-image-double',
  metadata: { nestable: true },
}
