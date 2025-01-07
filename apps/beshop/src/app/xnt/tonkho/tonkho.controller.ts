import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TonkhoService } from './tonkho.service';
@Controller('tonkho')
export class TonkhoController {
  constructor(private readonly tonkhoService:TonkhoService) {}

  @Post()
  create(@Body() createTonkhoDto: any) {
    return this.tonkhoService.create(createTonkhoDto);
  }
  @Get()
  async findAll() {
    return await this.tonkhoService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.tonkhoService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.tonkhoService.findslug(slug);
  }
  @Get('findidsp/:slug')
  async findidsp(@Param('findidsp') findidsp: string) {
    return await this.tonkhoService.findidsp(findidsp);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.tonkhoService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.tonkhoService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.tonkhoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tonkhoService.remove(id);
  }
}