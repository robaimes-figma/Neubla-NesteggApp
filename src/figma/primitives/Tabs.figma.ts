// url=https://figma.com/design/InsQQpbbtYip36AFbVBoWv?node-id=3729-13362
import figma from 'figma'
const instance = figma.selectedInstance

const tabLayers = instance.findLayers(
  (node) => node.name === 'Tab',
  { traverseInstances: true },
)
let tab1, tab2, tab3, tab4, tab5, tab6, tab7, tab8
const tabNodes = tabLayers.filter((n) => n.type === 'INSTANCE')
if (tabNodes[0]) tab1 = tabNodes[0].executeTemplate().example
if (tabNodes[1]) tab2 = tabNodes[1].executeTemplate().example
if (tabNodes[2]) tab3 = tabNodes[2].executeTemplate().example
if (tabNodes[3]) tab4 = tabNodes[3].executeTemplate().example
if (tabNodes[4]) tab5 = tabNodes[4].executeTemplate().example
if (tabNodes[5]) tab6 = tabNodes[5].executeTemplate().example
if (tabNodes[6]) tab7 = tabNodes[6].executeTemplate().example
if (tabNodes[7]) tab8 = tabNodes[7].executeTemplate().example

export default {
  example: figma.code`
    <Tabs>
      <TabList>
        ${tab1}
        ${tab2}
        ${tab3}
        ${tab4}
        ${tab5}
        ${tab6}
        ${tab7}
        ${tab8}
      </TabList>
      <TabPanel id="match-each-tab">Some stuff</TabPanel>
    </Tabs>
  `,
  imports: ['import { TabList, TabPanel, Tabs } from "primitives"'],
  id: 'tabs',
  metadata: { nestable: true },
}
