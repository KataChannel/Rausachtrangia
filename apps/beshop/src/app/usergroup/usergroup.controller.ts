import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {UsergroupService } from './usergroup.service';
@Controller('usergroup')
export class UsergroupController {
  constructor(private readonly usergroupService:UsergroupService) {}

  @Post()
  create(@Body() data: any) {
    return this.usergroupService.create(data);
  }
  @Get()
  async findAll() {
    return await this.usergroupService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.usergroupService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.usergroupService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.usergroupService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.usergroupService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.usergroupService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usergroupService.remove(id);
  }
}