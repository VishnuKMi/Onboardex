import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminLoginBody } from '../../types/admin';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  async login(@Body() body: AdminLoginBody) {
    return this.adminService.login(body);
  }

  @Get('tenants')
  async getTenants() {
    return this.adminService.getTenants();
  }

  @Get('total-usage')
  async getTotalUsage() {
    try {
      const data = await this.adminService.totalUsage();
      return {
        data,
        message: 'Total Usage fetched',
        success: true,
      };
    } catch (error) {
      return {
        data: null,
        message: 'Total Usage fetch failed',
        success: false,
      };
    }
  }

  @Post('toggle-status')
  async toggleStatus(@Body() body: string) {
    try {
      const data = await this.adminService.toggleStatus(body);
      return {
        data,
        message: 'Contract status toggled',
        success: true,
      };
    } catch (error) {
      return {
        data: null,
        message: 'Contract status toggle failed',
        success: false,
      };
    }
  }
}
