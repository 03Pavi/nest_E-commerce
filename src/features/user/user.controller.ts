import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, HttpException, Req, Headers, UseGuards, ParseIntPipe, UsePipes, DefaultValuePipe, ParseUUIDPipe, UseFilters } from '@nestjs/common';
import { UserService } from './services/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { IdException } from './exceptions/Id-exceptions';
import { IdExceptionFilter } from './exceptions/exception-filter';
import { HTTPExceptionFilter } from './exceptions/http-exception.filter';
import { AppExceptionFilter } from './exceptions/app-exception-filter';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto);
      return user;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Could not create user',
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Headers('authorization') authorization: string, @Req() req: any) {
    console.log(req.user)
    return this.userService.findAllUser();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe, new DefaultValuePipe(1)) id: number) {
    console.log(typeof id)
    return this.userService.findOne(+id);
  }

  @Patch(':uuid')
  update(@Param('uuid', new ParseUUIDPipe({ version: '3' })) uuid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(uuid, updateUserDto);
  }

  @Delete(':id')
  @UseFilters(AppExceptionFilter)
  remove(@Param('id', ParseIntPipe) id: number) {
    if (id < 0) {
      throw new HttpException("invalid Request", 400)
    }
    return this.userService.remove(+id);
  }
}
