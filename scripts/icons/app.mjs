import fs from "fs";

// run with node --env-file=.env app.mjs
const TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;
const URL_BASE = "https://api.figma.com/v1/files";
const URL_BASE_IMAGES = "https://api.figma.com/v1/images";
const FIGMA_ICONS_BASE = "https://figma.com/design/InsQQpbbtYip36AFbVBoWv";
const ICONS_PAGE_NAME = "Icons";
// Section used when exporting SVG React components from Figma.
const ICON_EXPORT_SIZE = "16";
// Section linked in Code Connect templates (standalone symbols, fixed size in snippet).
const ICON_CODE_CONNECT_SIZE = "24";
// The name of the variant for each icon in a component set (legacy file structure).
const ICON_VARIANT_NAME = "Size=16";
// Skipping REST API allows you to run this script using ./icons.json and icons-index.txt in their current state.
const SKIP_REST_API = process.argv.includes("--skip-rest-api");

function toIconId(name) {
  return name
    .replace(/^Icon/, "icon-")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

function figmaNameToIconName(figmaName) {
  return (
    "Icon" +
    figmaName
      .split(/[^a-zA-Z0-9]+/)
      .map((part) => part.charAt(0).toUpperCase() + part.substring(1))
      .join("")
  );
}

function buildIconFigmaTemplate(name, nodeId, size = ICON_CODE_CONNECT_SIZE) {
  const url = `${FIGMA_ICONS_BASE}?node-id=${nodeId.replace(":", "-")}`;
  const id = toIconId(name);
  return [
    `// url=${url}`,
    `import figma from 'figma'`,
    `export default {`,
    `  example: figma.code\`<${name} size="${size}" />\`,`,
    `  imports: ['import { ${name} } from "icons"'],`,
    `  id: '${id}',`,
    `  metadata: { nestable: true },`,
    `}`,
    ``,
  ].join("\n");
}

function findChildByName(parent, name) {
  return parent?.children?.find((node) => node.name === name);
}

function collectIconsFromSection(section, size) {
  const iconsByName = {};
  section.children.forEach((component) => {
    const icon =
      component.type === "COMPONENT_SET"
        ? component.children.find((child) => child.name === ICON_VARIANT_NAME)
        : component.type === "COMPONENT"
          ? component
          : null;
    if (!icon) return;
    const name = figmaNameToIconName(component.name);
    iconsByName[name] = { exportId: icon.id, connectId: icon.id, size };
  });
  return iconsByName;
}

/**
 * Get icon data from Figma and write data to disk (unless skipping REST API)
 * Create Code Connect template files, create icon React component files, and create index file export.
 */
async function go() {
  // Writing the data files to disk based on icons in Figma.
  // Storing data to disk allows us to parse it later, independent of REST API requests if we want to change the output.
  if (!SKIP_REST_API) {
    // Get icon data from Figma
    const data = await getIconComponents();
    const names = data.map((a) => a[0]).sort();
    // Write index export file to disk (".txt" extension prevents unnecessary parsing)
    fs.writeFileSync(
      "./icons-index.txt",
      names.map((n) => `export { ${n} } from "./${n}.tsx";`).join("\n"),
    );
    // Write icon component JSON data file to disk (used for both code connect docs and React component file gen)
    fs.writeFileSync("./icons.json", JSON.stringify(data, null, 2));
  }

  // Parse the JSON icon component data
  const json = JSON.parse(fs.readFileSync("./icons.json"));
  const codeConnectNodeIds = JSON.parse(
    fs.readFileSync("./icon-node-ids-24.json"),
  );
  // Copy the index file over to the src and change extension to TypeScript.
  fs.copyFileSync("./icons-index.txt", "../../src/ui/icons/index.ts");
  // Writing individual parserless Code Connect template files for each icon.
  await Promise.all(
    json.map(
      ([fileName]) =>
        new Promise((resolve, reject) => {
          const nodeId = codeConnectNodeIds[fileName];
          if (!nodeId) {
            return reject(new Error(`Missing Code Connect node id for ${fileName}`));
          }
          fs.writeFile(
            `../../src/figma/icons/${fileName}.figma.ts`,
            buildIconFigmaTemplate(fileName, nodeId),
            (err) => (err ? reject(err) : resolve()),
          );
        }),
    ),
  );
  // Writing each Icon React component file to disk. Additive only, does not delete old icons.
  await Promise.all(
    json.map(
      ([fileName, fileContents]) =>
        new Promise((resolve, reject) => {
          fs.writeFile(
            `../../src/ui/icons/${fileName}.tsx`,
            fileContents,
            (err) => (err ? reject(err) : resolve()),
          );
        }),
    ),
  );

  console.log("DONE!");
}

go();

/**
 * Getting all file data from Figma, then parsing it into icon component data
 * @link https://www.figma.com/developers/api#get-files-endpoint
 * @returns {Promise<string[][]>}
 */
async function getIconComponents() {
  try {
    const fileResponse = await fetch(`${URL_BASE}/${FILE_KEY}`, {
      method: "GET",
      headers: { "X-FIGMA-TOKEN": TOKEN },
    });
    const data = await fileResponse.json();
    return await fileRESTResponseToIconComponentsJSON(data);
  } catch (e) {
    throw e;
  }
}

/**
 * Getting image urls from figma for each icon component
 * @link https://www.figma.com/developers/api#get-images-endpoint
 * @param {string[]} nodeIds - array of node ids to export as svg.
 * @returns {{err: string, images: Map<string, string>, status: number}}
 */
async function getSVGImages(nodeIds) {
  try {
    const fileResponse = await fetch(
      `${URL_BASE_IMAGES}/${FILE_KEY}?format=svg&ids=${nodeIds.join(",")}`,
      {
        method: "GET",
        headers: { "X-FIGMA-TOKEN": TOKEN },
      },
    );
    return await fileResponse.json();
  } catch (e) {
    throw e;
  }
}

/**
 * Traverse a Figma file response for all icons, get their svg image data,
 *   and transform it into the data we're storing locally.
 * @param {{document: Node}} response Figma GET file response
 * @returns {Promise<string[][]>} - Array<[IconName, IconSVGString, IconCodeConnectString]>
 */
async function fileRESTResponseToIconComponentsJSON(response) {
  if (!response.document) {
    throw new Error(response.err || "Invalid Figma API response");
  }

  const iconsPage = findChildByName(response.document, ICONS_PAGE_NAME);
  if (!iconsPage) {
    throw new Error(`Page "${ICONS_PAGE_NAME}" not found in Figma file`);
  }

  const exportSection = findChildByName(iconsPage, ICON_EXPORT_SIZE);
  const connectSection = findChildByName(iconsPage, ICON_CODE_CONNECT_SIZE);
  if (!exportSection) {
    throw new Error(`Section "${ICON_EXPORT_SIZE}" not found on Icons page`);
  }
  if (!connectSection) {
    throw new Error(
      `Section "${ICON_CODE_CONNECT_SIZE}" not found on Icons page`,
    );
  }

  const exportIcons = collectIconsFromSection(exportSection, ICON_EXPORT_SIZE);
  const connectIcons = collectIconsFromSection(
    connectSection,
    ICON_CODE_CONNECT_SIZE,
  );

  const codeConnectNodeIds = {};
  Object.entries(connectIcons).forEach(([name, { connectId }]) => {
    codeConnectNodeIds[name] = connectId;
  });
  fs.writeFileSync(
    "./icon-node-ids-24.json",
    JSON.stringify(codeConnectNodeIds, null, 2),
  );

  const idsToNameAndComponentSetId = {};
  Object.entries(exportIcons).forEach(([name, { exportId, connectId }]) => {
    idsToNameAndComponentSetId[exportId] = [name, connectId];
  });

  const nodeIds = Object.keys(idsToNameAndComponentSetId);
  // SVG export for all the icon nodes we found.
  const { images } = await getSVGImages(nodeIds);

  // Waiting a bit for the images to exist on S3. Rarely, it can take a second.
  console.log("Sleeping for ten seconds to wait for images to exist...");
  await new Promise((resolve) => setTimeout(resolve, 10000));
  console.log("Proceeding....");

  // We ultimately write three files to disk. Our result holds the data.
  const result = [];
  // We occasionally fail due to assets not existing on S3.
  // We store those here and revisit a second time.
  const fails = [];
  // Initial attempt to get all node images
  await Promise.all(
    nodeIds.map(async (nodeId) => {
      try {
        await processNodeId(nodeId);
      } catch (e) {
        fails.push(nodeId);
        console.log("Failed once:", nodeId);
      }
    }),
  );
  console.log(`Retrying ${fails.length} failure(s)...`);
  // Second attempt for failed attempts.
  await Promise.all(
    fails.map(async (nodeId) => {
      try {
        await processNodeId(nodeId);
      } catch (e) {
        console.error(e);
        console.log(
          "Failed again:",
          nodeId,
          images[nodeId],
          ...idsToNameAndComponentSetId[nodeId],
        );
      }
    }),
  );

  /**
   * Get the component name, svg code strings, and code connect doc strings
   * @param {string} nodeId
   */
  async function processNodeId(nodeId) {
    // Fetch the S3 url
    const fileResponse = await fetch(images[nodeId], { method: "GET" });
    // Get the raw SVG string from the response
    const svg = await fileResponse.text();
    // Get the name and component set node id
    const [name, componentSetId] = idsToNameAndComponentSetId[nodeId];
    // Building out an svg React component string...
    const svgString = [
      'import { IconProps, Icon } from "primitives";',
      `export const ${name} = (props: IconProps) => (`,
    ];
    // Clean the raw SVG response up (SVG children only, <svg> tag handled by wrapping Icon component)
    const cleanSvg = svg
      .replace(
        /(stroke|fill|line|clip)-(.)/g,
        (_, p1, p2) => p1 + p2.toUpperCase(),
      )
      .replace(/<svg[^>]+>/, "")
      .replace(/<\/svg>/, "")
      .replace(/stroke="#[^"]+"/g, `stroke="var(--svg-stroke-color)"`)
      .replace(/fill="#[^"]+"/g, `fill="var(--svg-fill-color)"`)
      .replace(/\n/g, "");
    // Wrap the cleaned svg in our Icon component (paths only)
    svgString.push(`  <Icon {...props}>${cleanSvg}</Icon>`);
    svgString.push(");");
    const figmaTemplate = buildIconFigmaTemplate(name, componentSetId);
    // Add the strings for this component into our result.
    result.push([name, svgString.join("\n"), figmaTemplate]);
  }

  return result;
}
