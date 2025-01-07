import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {VisitorService } from './visitor.service';
@Controller('visitor')
export class VisitorController {
  constructor(private readonly visitorService:VisitorService) {}

  @Post()
  create(@Body() data: any) {
    return this.visitorService.create(data);
  }
  @Get()
  async findAll() {
    return await this.visitorService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.visitorService.findid(id);
  }
  @Get('getvisitor')
  async getvisitor() {
    return await this.visitorService.getvisitor();
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.visitorService.findslug(slug);
  }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.visitorService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.visitorService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitorService.remove(id);
  }
}