import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { TenantsService } from '../tenants/tenants.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tenantsService: TenantsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (user) {
      return {
        ...user,
        accessToken: this.jwtService.sign({
          sub: user.id,
          userId: user.id,
          email: email,
        }),
      };
    }
    return null;
  }

  async validateTenantUser({ email, password }) {
    const tenantUser = await this.tenantsService.getTenantUserByEmail(email);
    if (tenantUser) {
      const result = compareSync(password, tenantUser.password);
      if (!result) {
        return null;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: hashedPassword, ...rest } = tenantUser;
      const payload = {
        sub: tenantUser.id,
        tenantId: tenantUser.tenant.id,
        email: email,
      };
      return {
        ...rest,
        accessToken: this.jwtService.sign(payload),
      };
    }
    return null;
  }
}
