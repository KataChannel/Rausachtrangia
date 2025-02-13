import { Controller, Get, Post, Body, Patch, Param, Delete,Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsergroupService } from '../usergroup/usergroup.service';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private _UsergroupService: UsergroupService,
    ) {}

  @UseGuards(AuthGuard('rausachtrangia'))
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get('findid/:id')
  async findid(@Param('id') id: string) {
    const user = await this.usersService.findid(id);
    const Groups = await this._UsergroupService.findAll()
    user['Groups'] = Groups.find((v)=>v.id==user.idGroup)?.ListMenu
    return user
  }
  @Get('SDT/:sdt')
  async findSDT(@Param('sdt') sdt: string) {
    const user = await this.usersService.findSDT(sdt);
    const Groups = await this._UsergroupService.findAll()
    user['Groups'] = Groups.find((v)=>v.id==user.idGroup)
    return user
  }
  @Get('admin')
  @UseGuards(AuthGuard('rausachtrangia'))
  findAdmin() {
    return this.usersService.findAdmin();
  }
  @Patch(':id')
  @UseGuards(AuthGuard('rausachtrangia'))
  update(@Param('id') id: string, @Body() data: any) {
    return this.usersService.update(id, data);
  }
  @Post('search')
  async findQuery(@Body() SearchParams: any){
    return await this.usersService.findQuery(SearchParams);
}
  @Post('changepass')
  @UseGuards(AuthGuard('rausachtrangia'))
  changepass(@Body() data: any)
  {
    return this.usersService.changepass(data);
  }
  @Delete(':id')
  @UseGuards(AuthGuard('rausachtrangia'))
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
  @Post('dangky')
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    if(newUser[0])
    {
      //this._emailService.sendEmail(newUser[1])
      return [true, 'Đăng Ký Thành Công']; 
    }
    else {
      return newUser
    }
  }
  @Post('dangnhap')
  async login(@Body() user: any) {
    return await this.usersService.login(user);
  }
  @Post('loginbygoogle')
  async loginbygoogle(@Body() user: any) {    
    return await this.usersService.loginsocial(user);
  }
  @UseGuards(AuthGuard('rausachtrangia'))
  @Get('profile')
  async getProfile(@Request() req:any) {
    const userPromise = this.usersService.findbySDT(req.user);
    const groupsPromise = this._UsergroupService.findAll();
    const [user, Groups] = await Promise.all([userPromise, groupsPromise]); 
    if (user) {
      delete user.password;
     user['Groups'] = Groups.find((v) => v.id === user.idGroup)?.ListMenu;
     user['Groups'] = user['Groups']?.filter((v:any) => v.Checked === true);
      return user;
    } else {
      return false;
    }
  }
}
