import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";
import { createComponentFiles } from "./componentfile";
import { createHtmlFiles } from "./htmlfile";
import { createCssFiles } from "./cssfile";
import { createMockDataFiles } from "./mockdata";
import { createServiceFiles } from "./service";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function kataFullcomSchematic(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const currentPath = _options.path || '/src/app'; 
    const fileName = _options.name || "dashboard";
    createComponentFiles(tree, currentPath, fileName);
    createHtmlFiles(tree, currentPath, fileName);
    createCssFiles(tree, currentPath, fileName);
    createMockDataFiles(tree, currentPath, fileName);
    createServiceFiles(tree, currentPath, fileName);
    return tree;
  };
}
