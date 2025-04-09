import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  // async enableShutdownHooks(app: INestApplication) {
  //   this.$on('beforeExit', async () => {
  //     await app.close();
  //   });
  // }

  async getProductDetails(email: string) {
    const product = await this.user.findUnique({
      where: {
        email,
      },
      select: {
        claims: {
          select: {
            nft: {
              select: {
                product: {
                  select: {
                    productName: true,
                    description: true,
                    imageUrl: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return product;
  }
}
