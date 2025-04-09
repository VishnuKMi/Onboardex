import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MagicLoginStrategy } from './magiclogin.strategy';
import { TenantRegisterBody } from '../../types/tenant';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private strategy: MagicLoginStrategy,
  ) {}

  @Post('users/login')
  async userLogin(@Req() req, @Res() res, @Body() body) {
    const user = await this.authService.validateUser(body.destination);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.strategy.send(req, res);
  }

  @UseGuards(AuthGuard('magiclogin'))
  @Get('users/login/callback')
  callback(@Req() req) {
    try {
      const user = req.user;

      if (!user) {
        throw new NotFoundException('Account not found');
      }

      return {
        data: user,
        message: 'Login successful',
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: 'Login failed',
        success: false,
      };
    }
  }

  @Post('tenants/login')
  async tenantLogin(@Body() body: TenantRegisterBody) {
    try {
      const user = await this.authService.validateTenantUser(body);

      if (!user) {
        throw new NotFoundException('Account not found');
      }

      return {
        data: user,
        message: 'Login successful',
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        message: 'Login failed',
        success: false,
      };
    }
  }
}
