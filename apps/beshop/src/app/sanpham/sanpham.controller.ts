import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SanphamService } from './sanpham.service';
@Controller('sanpham')
export class SanphamController {
  constructor(private readonly sanphamService:SanphamService) {}

  @Post()
  create(@Body() createSanphamDto: any) {
    return this.sanphamService.create(createSanphamDto);
  }
  @Post('sync')
  sync(@Body() data: any) {
    return this.sanphamService.sync(data);
  }
  @Get()
  async findAll() {
    return await this.sanphamService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.sanphamService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.sanphamService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.sanphamService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.sanphamService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.sanphamService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sanphamService.remove(id);
  }
}