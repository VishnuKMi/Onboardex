import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserAuthGuard } from './user.auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(UserAuthGuard)
  @Get('claims')
  getClaims(@Req() req, @Query() query: { claimed: string }) {
    const userId = req.user.userId;
    return this.usersService.getClaims(userId, Boolean(query.claimed || false));
  }

  @UseGuards(UserAuthGuard)
  @Post('transfer')
  async transferNft(@Body() body) {
    console.log(body);
    try {
      const transfer = await this.usersService.transferNft(body.claimId);

      return {
        data: transfer,
        message: 'Transfer successful',
        success: true,
      };
    } catch (error) {
      return {
        data: null,
        message: 'Transfer failed',
        success: false,
      };
    }
  }
}
