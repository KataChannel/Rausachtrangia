import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService:MenuService) {}

  @Post()
  create(@Body() data: any) {
    return this.menuService.create(data);
  }
  @Get()
  async findAll() {
    return await this.menuService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.menuService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.menuService.findslug(slug);
  }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.menuService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.menuService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}