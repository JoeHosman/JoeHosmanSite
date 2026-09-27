import { withBase } from "../lib/urls.mjs";

/** Root-relative Markdown links share the same base contract as page components. */
export default function siteUrls({ base = "/" } = {}) {
  return function transform(tree) {
    function visit(node) {
      if (node.type === "element" && node.properties) {
        for (const property of ["href", "src"]) {
          if (typeof node.properties[property] === "string")
            node.properties[property] = withBase(
              node.properties[property],
              base,
            );
        }
      }
      for (const child of node.children ?? []) visit(child);
    }
    visit(tree);
  };
}
