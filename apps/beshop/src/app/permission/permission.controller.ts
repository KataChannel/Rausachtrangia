import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
  import {PermissionService } from './permission.service';
  @Controller('Permission')
  export class PermissionController {
    constructor(private readonly PermissionService:PermissionService) {}
  
    @Post()
    create(@Body() data: any) {
      return this.PermissionService.create(data);
    }
    @Get()
    async findAll() {
      return await this.PermissionService.findAll();
    }
    @Get('findid/:id')
    async findOne(@Param('id') id: string) {
      return await this.PermissionService.findid(id);
    }
    @Get('findslug/:slug')
    async findslug(@Param('slug') slug: string) {
      return await this.PermissionService.findslug(slug);
    }
    @Get('pagination')
    async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
         return await this.PermissionService.findPagination(page,perPage);
      }
    @Post('search')
      async findQuery(@Body() SearchParams: any){
        return await this.PermissionService.findQuery(SearchParams);
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() data: any) {
      return this.PermissionService.update(id, data);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.PermissionService.remove(id);
    }
  }