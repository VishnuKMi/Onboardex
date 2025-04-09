import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';
import { EmailService } from '@modules/common/email.service';
import { AuthService } from '@modules/auth/auth.service';

@Injectable()
export class MagicLoginStrategy extends PassportStrategy(
  Strategy,
  'magiclogin',
) {
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
  ) {
    super({
      secret: process.env.JWT_SECRET,
      jwtOptions: {
        expiresIn: '5m',
      },

      callbackUrl: `${process.env.PORTAL_DOMAIN}/login/callback`,
      sendMagicLink: async (email, href) => {
        await this.emailService.sendUserMagicLinkEmail(email, href);
      },
      verify: async (payload, callback) =>
        callback(null, this.validate(payload)),
    });
  }

  validate(payload: { destination: string }) {
    const user = this.authService.validateUser(payload.destination);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
