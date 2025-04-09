import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { MintBody, TenantRegisterBody, ClientBody } from '../../types/tenant';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { TenantAuthGuard } from './tenant.auth.guard';
import { TenantApiKeyGuard } from '@modules/tenants/tenant-api-key.guard';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get('health')
  health() {
    const data = this.tenantsService.generateWallet();
    return data;
  }

  @Post('register')
  async register(@Body() body: TenantRegisterBody) {
    return this.tenantsService.register(body);
  }

  @Get('verify')
  async verifyUser(@Query('token') token: string, @Res() res: Response) {
    try {
      const isVerified = await this.tenantsService.verifyUser(token);

      // if (isVerified) {
      //   return res.redirect('/login')
      // } else {
      //   return res.status(400).send('Invalid token')
      // }
      return true;
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  @UseGuards(TenantAuthGuard)
  @Get('products')
  async products(@Req() req: any) {
    const tenantId = req.user.tenantId;
    try {
      const data = await this.tenantsService.products(tenantId);
      return {
        data,
        message: 'Products fetched',
        success: true,
      };
    } catch (error) {
      return {
        data: null,
        message: 'Products fetch failed',
        success: false,
      };
    }
  }

  @UseGuards(TenantAuthGuard)
  @Get('api-key')
  async getAPIKeys(@Req() req: any) {
    const tenantId = req.user.tenantId;
    try {
      const data = await this.tenantsService.getAPIKeys(tenantId);
      return {
        data,
        message: 'API Keys fetched',
        success: true,
      };
    } catch (error) {
      return {
        data: null,
        message: 'API Keys fetch failed',
        success: false,
      };
    }
  }

  @UseGuards(TenantAuthGuard)
  @Post('api-key')
  async createAPIKey(@Req() req: any) {
    const tenantId = req.user.tenantId;
    try {
      const data = await this.tenantsService.createAPIKey(tenantId);
      return {
        data,
        message: 'API Key created',
        success: true,
      };
    } catch (error) {
      return {
        data: null,
        message: 'API Key creation failed',
        success: false,
      };
    }
  }

  @UseGuards(TenantAuthGuard)
  @Post('single-mint')
  async singleMint(@Body() body: MintBody, @Req() req: any) {
    const tenantId = req.user.tenantId;
    try {
      const data = await this.tenantsService.singleMint(body, tenantId);
      return {
        data,
        message: 'Mint successful',
        success: true,
      };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        message: 'Mint failed',
        success: false,
      };
    }
  }

  @UseGuards(TenantApiKeyGuard)
  @Post('single-mint-client')
  async singleMintClient(@Body() body: MintBody, @Req() req: any) {
    const tenantId = req.tenantId;
    try {
      const data = await this.tenantsService.singleMint(body, tenantId);
      return {
        data,
        message: 'Mint successful',
        success: true,
      };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        message: 'Mint failed',
        success: false,
      };
    }
  }

  @UseGuards(TenantAuthGuard)
  @Post('batch-mint')
  async batchMint(@Body() body: MintBody, @Req() req: any) {
    const tenantId = req.user.tenantId;
    try {
      const data = await this.tenantsService.batchMint(body, tenantId);
      return {
        data,
        message: 'Mint successful',
        success: true,
      };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        message: 'Mint failed',
        success: false,
      };
    }
  }

  @UseGuards(TenantApiKeyGuard)
  @Post('initiate-transfer')
  async initiateTransfer(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: ClientBody,
  ) {
    try {
      const data = await this.tenantsService.initiateTransfer(body);
      res.json({
        data,
        message: 'Claim Initiated',
        success: true,
      });
    } catch (error) {
      res.json({
        data: null,
        message: error.message,
        success: false,
      });
    }
  }

  @UseGuards(TenantAuthGuard)
  @Post('initiate-self-transfer')
  async initiateTransferTenantApp(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: ClientBody,
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const email = req.user.email;
    try {
      const data = await this.tenantsService.initiateTransfer({
        ...body,
        clientEmail: email,
      });
      res.json({
        data,
        message: 'Claim Initiated',
        success: true,
      });
    } catch (error) {
      res.json({
        data: null,
        message: error.message,
        success: false,
      });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('protected')
  getProtected(@Req() req) {
    // TODO : Require JWT

    return `You are in ${req.user.email}`;
  }

  @UseGuards(TenantAuthGuard)
  @Get('txn-history')
  async txnHistory(@Req() req: any) {
    const tenantId = req.user.tenantId;
    try {
      const data = await this.tenantsService.txnHistory(tenantId);
      return {
        data,
        message: 'Transaction History fetched',
        success: true,
      };
    } catch (error) {
      return {
        data: null,
        message: 'Transaction History fetch failed',
        success: false,
      };
    }
  }
}
