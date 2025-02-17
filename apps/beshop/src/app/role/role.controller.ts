import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
  import {RoleService } from './role.service';
  @Controller('role')
  export class RoleController {
    constructor(private readonly RoleService:RoleService) {}
  
    @Post()
    create(@Body() data: any) {
      return this.RoleService.create(data);
    }
    @Get()
    async findAll() {
      return await this.RoleService.findAll();
    }
    @Get('findid/:id')
    async findOne(@Param('id') id: string) {
      return await this.RoleService.findid(id);
    }
    @Get('findslug/:slug')
    async findslug(@Param('slug') slug: string) {
      return await this.RoleService.findslug(slug);
    }
    @Get('pagination')
    async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
         return await this.RoleService.findPagination(page,perPage);
      }
    @Post('search')
      async findQuery(@Body() SearchParams: any){
        return await this.RoleService.findQuery(SearchParams);
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() data: any) {
      return this.RoleService.update(id, data);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.RoleService.remove(id);
    }
  }