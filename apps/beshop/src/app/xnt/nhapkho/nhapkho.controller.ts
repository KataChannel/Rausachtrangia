import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NhapkhoService } from './nhapkho.service';
@Controller('nhapkho')
export class NhapkhoController {
  constructor(private readonly nhapkhoService:NhapkhoService) {}

  @Post()
  create(@Body() createNhapkhoDto: any) {
    return this.nhapkhoService.create(createNhapkhoDto);
  }
  @Get()
  async findAll() {
    return await this.nhapkhoService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.nhapkhoService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.nhapkhoService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.nhapkhoService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.nhapkhoService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.nhapkhoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nhapkhoService.remove(id);
  }
}