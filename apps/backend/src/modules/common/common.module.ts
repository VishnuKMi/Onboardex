import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { EmailService } from './email.service';
import { BlockChainService } from './block-chain.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '8h',
      },
    }),
  ],
  providers: [BlockChainService, EmailService, PrismaService, JwtService],
  exports: [BlockChainService, EmailService, PrismaService, JwtService],
})
export class CommonModule {}
