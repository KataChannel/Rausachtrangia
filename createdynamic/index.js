#!/usr/bin/env node

import fs from 'fs-extra';
import inquirer from 'inquirer';
import path from 'path';
import chalk from 'chalk';

// Prompt user for details
async function promptUser() {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name for the files:',
      validate: (input) => (input ? true : 'Name cannot be empty.'),
    },
    {
      type: 'input',
      name: 'outputDir',
      message: 'Enter the output directory (default: ./src):',
      default: './src',
    },
  ];

  return inquirer.prompt(questions);
}

// Generate file with dynamic content
async function generateFile(filePath, content) {
  try {
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, content.trim());
    console.log(chalk.green(`Created: ${filePath}`));
  } catch (error) {
    console.error(chalk.red(`Error creating ${filePath}:`), error.message);
  }
}

// Generate all files
async function generateFiles({ name, outputDir }) {
  const pascalCaseName = name.charAt(0).toUpperCase() + name.slice(1);
  const dasherizedName = name.toLowerCase().replace(/\s+/g, '-');

  // Define file paths
  const componentFile = path.join(outputDir, `${dasherizedName}.controller.ts`);
  const serviceFile = path.join(outputDir, `${dasherizedName}.service.ts`);
  const moduleFile = path.join(outputDir, `${dasherizedName}.module.ts`);
  const entityFile = path.join(outputDir, `entities/${dasherizedName}.entity.ts`);


  // Define file content
  const componentContent = `
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {${pascalCaseName}Service } from './${pascalCaseName.toLowerCase()}.service';
@Controller('${pascalCaseName}')
export class ${pascalCaseName}Controller {
  constructor(private readonly ${pascalCaseName}Service:${pascalCaseName}Service) {}

  @Post()
  create(@Body() data: any) {
    return this.${pascalCaseName}Service.create(data);
  }
  @Get()
  async findAll() {
    return await this.${pascalCaseName}Service.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.${pascalCaseName}Service.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.${pascalCaseName}Service.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.${pascalCaseName}Service.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.${pascalCaseName}Service.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.${pascalCaseName}Service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.${pascalCaseName}Service.remove(id);
  }
}
`;


  const serviceContent = `
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ${pascalCaseName}Entity } from './entities/${pascalCaseName.toLowerCase()}.entity';
@Injectable()
export class ${pascalCaseName}Service {
  constructor(
    @InjectRepository(${pascalCaseName}Entity)
    private ${pascalCaseName}Repository: Repository<${pascalCaseName}Entity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.${pascalCaseName}Repository.create(data);
      return await this.${pascalCaseName}Repository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }

  async findAll() {
    return await this.${pascalCaseName}Repository.find();
  }
  async findid(id: string) {
    return await this.${pascalCaseName}Repository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.${pascalCaseName}Repository.findOne({
      where: {
        Title: data.Title,
        Type: data.Type
      },
    });
  }
  async findslug(Title: any) {
    return await this.${pascalCaseName}Repository.findOne({
      where: { Title: Title },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.${pascalCaseName}Repository.count();
    const ${pascalCaseName}s = await this.${pascalCaseName}Repository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: ${pascalCaseName}s,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.${pascalCaseName}Repository.createQueryBuilder('${pascalCaseName}');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('${pascalCaseName}.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('${pascalCaseName}.Title LIKE :Title', { SDT: \`%\${params.Title}%\` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, Update${pascalCaseName}Dto: any) {
    this.${pascalCaseName}Repository.save(Update${pascalCaseName}Dto);
    return await this.${pascalCaseName}Repository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.${pascalCaseName}Repository.delete(id);
    return { deleted: true };
  }
}
`;




  const moduleContent = `
import { Module } from '@nestjs/common';
import { ${pascalCaseName}Service } from './${pascalCaseName.toLowerCase()}.service';
import { ${pascalCaseName}Controller } from './${pascalCaseName.toLowerCase()}.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${pascalCaseName}Entity } from './entities/${pascalCaseName.toLowerCase()}.entity';
@Module({
  imports: [TypeOrmModule.forFeature([${pascalCaseName}Entity])],
  controllers: [${pascalCaseName}Controller],
  providers: [${pascalCaseName}Service],
  exports:[${pascalCaseName}Service]
})
export class ${pascalCaseName}Module {}

`;

const entityContent = `
 import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   UpdateDateColumn,
   DeleteDateColumn,
 } from 'typeorm';
 @Entity('${pascalCaseName.toLowerCase()}', {orderBy: { CreateAt: 'DESC' } })
 export class ${pascalCaseName}Entity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ nullable: true,default:'0'})
  ref_id: string;
  @Column()
  SDT: string;
  @Column({collation: "utf8_general_ci"})
  idGroup: string;
  @Column({collation: "utf8_general_ci"})
  Code: string;
  @Column({collation: "utf8_general_ci"})
  Hoten: string;
  @Column({collation: "utf8_general_ci"})
  email: string;
  @Column({ type: "text", collation: "utf8_general_ci" })
  Gioitinh: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
  Image: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  EditChinhanhs: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  Diachi: string;
  @Column()
  password: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  Profile: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  Phanquyen: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  Menu: string;
  @Column({collation: "utf8_general_ci",type:"simple-array"})
  fcmToken: string[];
  @Column({ default: '' })
  Type: string;
  @Column({ default: 1 })
  Ordering: number;
  @Column({ default: 0 })
  Status: number;
  @CreateDateColumn()
  CreateAt: Date;
  @UpdateDateColumn()
  UpdateAt: Date;
  @DeleteDateColumn()
  DeleteAt: Date;
  @Column({ nullable: true })
  idCreate: string;
 }
`;

  // Generate primary files
  await generateFile(componentFile, componentContent);
  await generateFile(serviceFile, serviceContent);
  await generateFile(moduleFile, moduleContent);
  await generateFile(entityFile, entityContent);
}

// Main function
(async function main() {
  const answers = await promptUser();
  await generateFiles(answers);
})();
