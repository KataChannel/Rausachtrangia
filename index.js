#!/usr/bin/env node

import fs from 'fs-extra';
import inquirer from 'inquirer';
import path from 'path';
import chalk from 'chalk';

// Prompt user for component details
async function promptUser() {
  const questions = [
    {
      type: 'input',
      name: 'componentName',
      message: 'Enter the component name:',
      validate: (input) => (input ? true : 'Component name cannot be empty.'),
    },
    {
      type: 'input',
      name: 'outputDir',
      message: 'Enter the output directory (default: ./src/components):',
      default: './src/components',
    },
  ];

  return inquirer.prompt(questions);
}

// Create the component file with dynamic content
async function generateComponent({ componentName, outputDir }) {
  try {
    const componentClassName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
    const componentFileName = `${componentName}.component.ts`;
    const componentFilePath = path.join(outputDir, componentFileName);

    // Ensure the output directory exists
    await fs.ensureDir(outputDir);

    // Component content
    const content = `
import { Component } from '@nestjs/common';

@Component()
export class ${componentClassName}Component {
  constructor() {
    console.log('${componentClassName} Component created!');
  }
}
`;

    // Write the file
    await fs.writeFile(componentFilePath, content.trim());

    console.log(chalk.green(`Component created successfully at: ${componentFilePath}`));
  } catch (error) {
    console.error(chalk.red('Error generating component:'), error.message);
  }
}

// Main function
(async function main() {
  const answers = await promptUser();
  await generateComponent(answers);
})();
