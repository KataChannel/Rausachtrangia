import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {SlideService } from './slide.service';
@Controller('slide')
export class SlideController {
  constructor(private readonly slideService:SlideService) {}

  @Post()
  create(@Body() data: any) {
    return this.slideService.create(data);
  }
  @Get()
  async findAll() {
    return await this.slideService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.slideService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.slideService.findslug(slug);
  }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.slideService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.slideService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.slideService.remove(id);
  }
}