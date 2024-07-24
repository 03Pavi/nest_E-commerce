import { Body, Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ParseDatePipe } from '../user/pipes/parse-date.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }


  @Post()
  @HttpCode(HttpStatus.OK)
  async getAll(@Body(ParseDatePipe) date: Date) {
    return { date };
  }
}