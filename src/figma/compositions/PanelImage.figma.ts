// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=348-15098
import figma from 'figma'
const instance = figma.selectedInstance

const padding = instance.getEnum('Platform', { Desktop: '1600', Mobile: '600' })

export default {
  example: figma.code`
    <Section padding="${padding}">
      <Panel type="auto">
        <FlexItem size="full">
          <Image
            src={placeholder}
            alt="Always use image alt"
            aspectRatio="fill"
            size="medium"
          />
        </FlexItem>
      </Panel>
    </Section>
  `,
  imports: [
    'import { Panel } from "compositions"',
    'import { placeholder } from "images"',
    'import { FlexItem, Section } from "layout"',
    'import { Image } from "primitives"',
  ],
  id: 'panel-image',
  metadata: { nestable: true },
}
