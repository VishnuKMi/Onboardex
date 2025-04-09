import { Module } from '@nestjs/common';
import { TenantsModule } from '@modules/tenants/tenants.module';
import { AdminModule } from '@modules/admin/admin.module';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CommonModule } from '@modules/common/common.module';

@Module({
  imports: [
    CommonModule,
    AdminModule,
    AuthModule,
    EventEmitterModule.forRoot(),
    TenantsModule,
    UsersModule,
  ],
  controllers: [],
})
export class AppModule {}
