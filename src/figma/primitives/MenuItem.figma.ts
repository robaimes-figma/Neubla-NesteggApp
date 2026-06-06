// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=9762:743
import figma from 'figma'
const instance = figma.selectedInstance

function snippet(layerName: string) {
  const node = instance.findInstance(layerName, { traverseInstances: true })
  if (node && node.type === 'INSTANCE') return node.executeTemplate().example
}

const label = instance.getString('Label')
const hasIcon = instance.getBoolean('Has Icon')
const iconSwap = hasIcon ? instance.getInstanceSwap('Icon') : null
let iconCode
if (iconSwap && iconSwap.type === 'INSTANCE') {
  iconCode = iconSwap.executeTemplate().example
}
const descriptionText = instance.getBoolean('Has Description', {
  true: instance.getString('Description'),
  false: undefined,
})
const hasShortcut = instance.getBoolean('Has Shortcut')
let shortcutCode
if (hasShortcut) {
  shortcutCode = snippet('Menu Shortcut')
}

export default {
  example: figma.code`
    <MenuItem>
      ${iconCode}
      <MenuLabel>${label}</MenuLabel>
      ${shortcutCode}
      ${descriptionText ? figma.code`<MenuDescription>${descriptionText}</MenuDescription>` : ''}
    </MenuItem>
  `,
  imports: ['import { MenuDescription, MenuItem, MenuLabel } from "primitives"'],
  id: 'menu-item',
  metadata: { nestable: true },
}
