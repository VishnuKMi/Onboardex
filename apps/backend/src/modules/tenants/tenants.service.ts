import { Injectable } from '@nestjs/common';
import { generate } from 'randomstring';
import { hash } from 'bcrypt';
import { MintBody, TenantRegisterBody } from '../../types/tenant';
import { ethers } from 'ethers';
import { MintABI } from '../../contract/abi';
import { PrismaService } from '@modules/common/prisma.service';
import { BlockChainService } from '@modules/common/block-chain.service';
import { EmailService } from '@modules/common/email.service';
import { format } from 'date-fns';

@Injectable()
export class TenantsService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private blockChainService: BlockChainService,
  ) {}

  async register(registerBody: TenantRegisterBody) {
    const { firstName, lastName, companyName, email, password, url } =
      registerBody;

    const hashedPassword = await this.getHashedPassword(password);
    const wallet = this.generateWallet();

    try {
      await this.prisma.$transaction(async (prisma) => {
        const newTenant = await this.prisma.tenant.create({
          data: {
            name: companyName,
            url,
            tenantWallet: {
              create: {
                address: wallet.address,
                encryptedPrivateKey: wallet.privateKey,
              },
            },
          },
          include: {
            users: true,
          },
        });

        const adminRole = await this.prisma.role.findUnique({
          where: {
            code: 'ADMIN',
          },
        });

        const adminUser = await this.prisma.tenantUser.create({
          data: {
            firstName: firstName,
            lastName: lastName,
            email,
            password: hashedPassword,
            isEmailVerified: false,
            tenantId: newTenant.id,
            roleId: adminRole.id,
          },
        });

        await this.sendVerificationToken({
          email: email,
          userId: adminUser.id,
          tenantId: newTenant.id,
        });
      });

      return {
        message: 'Tenant created successfully',
        success: true,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async sendVerificationToken({
    email,
    userId,
    tenantId,
  }: {
    email: string;
    userId: number;
    tenantId: number;
  }) {
    const verificationToken = generate({
      length: 10,
    });

    const verificationLink = `${process.env.TENANT_DOMAIN}/tenants/verify?token=${verificationToken}`;

    this.emailService.sendTenantVerificationEmail(email, verificationLink);

    await this.prisma.verificationToken.create({
      data: {
        token: verificationToken,
        expiration: new Date(Date.now() + 24 * 60 * 60 * 1000),
        user: {
          connect: {
            id: userId,
          },
        },
        tenant: {
          connect: {
            id: tenantId,
          },
        },
      },
    });
  }
  // TODO: @Verify

  async verifyUser(token: string) {
    const verificationToken = await this.prisma.verificationToken.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });
    if (!verificationToken) {
      throw new Error('Invalid verification token');
    }
    await this.prisma.tenantUser.update({
      where: {
        id: verificationToken.user.id,
      },
      data: {
        isEmailVerified: true,
      },
    });
  }

  getHashedPassword(password: string) {
    return hash(password, 10);
  }

  async getTenantUserByEmail(email) {
    return await this.prisma.tenantUser.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        password: true,
        isEmailVerified: true,
        role: {
          select: {
            name: true,
            code: true,
            permissions: {
              select: {
                name: true,
                code: true,
              },
            },
          },
        },
        tenant: {
          select: {
            id: true,
            name: true,
            url: true,
          },
        },
      },
    });
  }

  generateWallet() {
    return this.blockChainService.generateWallet();
  }

  async singleMint(body: MintBody, tenantId: string) {
    console.log(tenantId, 'tenantId');
    const { productName, productDescription, imageURL, serialId } = body;
    const product = await this.prisma.product.create({
      data: {
        productName,
        description: productDescription || '',
        imageUrl: imageURL,
        serialId,
        tenant: {
          connect: {
            id: parseInt(tenantId),
          },
        },
      },
    });

    const tenant = await this.prisma.tenant.findUnique({
      where: {
        id: parseInt(tenantId),
      },
      select: {
        tenantWallet: {
          select: {
            encryptedPrivateKey: true,
            address: true,
          },
        },
        contract: {
          select: {
            contractAddress: true,
          },
        },
      },
    });

    if (!tenant || !product) {
      console.error('Tenant or product not found.');
      return;
    }

    // // const signer = this.getSigner(tenant.tenantWallet.encryptedPrivateKey)
    // const signer = this.getSigner(
    //   '98814abf7fbcfee31749fdf78f0209f7b0e526ee9388bb0402ac2023ef36a699',
    // )
    // const contractInst = new ethers.Contract(
    //   // tenant.contract.contractAddress,
    //   this.blockChainService.contractAddress,
    //   MintABI,
    //   signer,
    // )
    //
    const metadata = `randomCID${Math.random() * 100000000}`;
    //
    // const result = await contractInst.singleMint(metadata)
    // await result.wait()
    //
    // const tokenId = await contractInst.getTokenId(metadata)

    // const stringTokenId = ethers.BigNumber.from(tokenId).toString();
    const nft = await this.prisma.nFT.create({
      data: {
        ownerAddress: tenant.tenantWallet.address,
        tokenId: metadata,
        nftMetadataCid: metadata,
        product: {
          connect: {
            id: product.id,
          },
        },
      },
    });

    // Store the record of txn
    // const transactionId = result.hash;
    const transactionId = metadata;
    const transactionDate = new Date();
    await this.prisma.transactionHistory.create({
      data: {
        transactionId,
        transactionDate,
        fromAddress: '0x0000000000000000000000000000000000000000',
        toAddress: tenant.tenantWallet.address,
        type: {
          connect: {
            code: 'MINT',
            name: 'mint',
          },
        },
      },
    });
  }

  async batchMint(body: MintBody, tenantId: string) {
    console.log('working', tenantId);
  }

  getSigner(key) {
    const provider = new ethers.providers.InfuraProvider(
      'maticmum',
      process.env.INFURA_SIGN_KEY,
    );
    return new ethers.Wallet(key, provider);
  }

  async products(tenantId: number) {
    const products = await this.prisma.product.findMany({
      where: {
        tenantId: tenantId,
      },
      select: {
        description: true,
        imageUrl: true,
        productName: true,
        serialId: true,
        id: true,
        tenantId: true,
        nft: {
          select: {
            claim: {
              select: {
                isClaimed: true,
                user: {
                  select: {
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return products.map((product) => ({
      ...product,
      status: product.nft.claim
        ? product.nft.claim.isClaimed
          ? 'CLAIMED'
          : 'PENDING CLAIM'
        : 'MINTED',
      isClaim: !!product.nft.claim,
      claimEmail: product.nft.claim ? product.nft.claim.user.email : '',
    }));
  }

  async initiateTransfer(body) {
    const { clientEmail, destination: userEmail, serialId } = body;

    let product;

    // Start a Prisma transaction
    try {
      await this.prisma.$transaction(async (prisma) => {
        console.log('PRODUCT ID: ', serialId);

        // Get tenantId out of clientEmail
        const tenantUser = await prisma.tenantUser.findFirst({
          where: {
            email: clientEmail,
          },
          select: {
            tenantId: true,
          },
        });

        if (!tenantUser) {
          throw new Error('Client not found');
        }

        // Find the NFT for the Product
        const product = await prisma.product.findUnique({
          where: {
            serialId: serialId,
          },
        });

        const nft = await prisma.nFT.findUnique({
          where: {
            productId: product.id,
          },
          select: {
            id: true,
          },
        });

        if (!nft) {
          throw new Error('NFT not found');
        }

        const existingUser = await prisma.user.findUnique({
          where: {
            email: userEmail,
          },
        });

        // If the user doesn't exist, create a new user (For Magic-link setup)
        let userId;
        if (!existingUser) {
          const wallet = ethers.Wallet.createRandom();
          const address = wallet.address;
          const privateKey = wallet.privateKey;

          // Create user & wallet
          const newUser = await prisma.user.create({
            data: {
              email: userEmail,
              firstName: '',
              lastName: '',
              userWallet: {
                create: {
                  address: address,
                  encryptedPrivateKey: privateKey,
                },
              },
            },
            select: {
              id: true,
            },
          });
          userId = newUser.id;
        } else {
          userId = existingUser.id;
        }

        // Create a Claim of NFT for the User if one doesn't exist
        const existingClaim = await prisma.claim.findFirst({
          where: {
            nftId: nft.id,
          },
        });

        if (!existingClaim) {
          await prisma.claim.create({
            data: {
              claimType: '', // ?
              tenantId: tenantUser.tenantId,
              userId: userId,
              nftId: nft.id,
            },
          });

          this.emailService.sendNFTClaimEmail(userEmail, product);
        }
      });
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  async txnHistory(tenantId: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: {
        id: parseInt(tenantId),
      },
      select: {
        tenantWallet: {
          select: {
            address: true,
          },
        },
      },
    });

    return await this.prisma.transactionHistory.findMany({
      where: {
        OR: [
          { fromAddress: tenant.tenantWallet.address },
          { toAddress: tenant.tenantWallet.address },
        ],
      },
      include: {
        type: true,
      },
    });
  }

  async getAPIKeys(tenantId: any) {
    const apiKeys = await this.prisma.aPIKey.findMany({
      where: {
        tenantId: tenantId,
      },
      select: {
        id: true,
        apiKey: true,
        createdAt: true,
        isActive: true,
      },
    });
    return apiKeys.map((apiKey) => ({
      ...apiKey,
      createdAt: format(apiKey.createdAt, 'dd-MM-yyyy HH:mm'),
    }));
  }

  async createAPIKey(tenantId: any) {
    const apiKey = generate({
      length: 16,
    });

    return await this.prisma.aPIKey.create({
      data: {
        apiKey: apiKey,
        tenantId: tenantId,
      },
    });
  }
}
