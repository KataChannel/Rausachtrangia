import { Tree } from "@angular-devkit/schematics";
export function createCssFiles(tree: Tree, currentPath: string, fileName: string) {
  tree.create(
    `${currentPath}/list${fileName}/list${fileName}.component.scss`,
    ``
  );
  tree.create(
    `${currentPath}/list${fileName}/detail${fileName}/detail${fileName}.component.scss`,
    ``
  );
}
