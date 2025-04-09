import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { MintABI } from 'contract/abi';
import { PrismaService } from '@modules/common/prisma.service';
import { BlockChainService } from '@modules/common/block-chain.service';
import { format } from 'date-fns';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private blockChainService: BlockChainService,
  ) {}
  async getClaims(userId: string, isClaimed: boolean) {
    // console.log(this.prisma.claim);
    const claims = await this.prisma.claim.findMany({
      where: {
        userId: parseInt(userId),
        ...(isClaimed && {
          isClaimed: true,
        }),
      },
      select: {
        id: true,
        createdAt: true,
        isClaimed: true,
        nft: {
          select: {
            product: {
              select: {
                productName: true,
                description: true,
                serialId: true,
                imageUrl: true,
              },
            },
          },
        },
        tenant: {
          select: {
            name: true,
          },
        },
      },
    });

    return claims.map((claim) => ({
      id: claim.id,
      createdAt: format(claim.createdAt, 'dd MMM yyyy'),
      status: claim.isClaimed ? 'CLAIMED' : 'PENDING',
      product: {
        brand: claim.tenant.name,
        name: claim.nft.product.productName,
        description: claim.nft.product.description,
        imageUrl: claim.nft.product.imageUrl,
        serialId: claim.nft.product.serialId,
      },
    }));
  }

  async transferNft(id: number) {
    const claim = await this.prisma.claim.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        nft: {
          select: {
            tokenId: true,
            ownerAddress: true,
          },
        },
        tenant: {
          select: {
            contract: {
              select: {
                contractAddress: true,
              },
            },
            tenantWallet: {
              select: {
                encryptedPrivateKey: true,
                address: true,
              },
            },
          },
        },
        user: {
          select: {
            userWallet: {
              select: {
                address: true,
                encryptedPrivateKey: true,
              },
            },
          },
        },
      },
    });

    const userWalletAddr = claim.user.userWallet.address; // userWallet is detected as an Array
    // const tokenId = claim.nft.tokenId;

    // const signer = this.getSigner(claim.tenant.tenantWallet.encryptedPrivateKey)
    // const signer = this.getSigner(
    //   '98814abf7fbcfee31749fdf78f0209f7b0e526ee9388bb0402ac2023ef36a699',
    // );
    // const contractInst = new ethers.Contract(
    //   // claim.tenant.contract.contractAddress,
    //   this.blockChainService.contractAddress,
    //   MintABI,
    //   signer,
    // );

    // const result = await contractInst.transferNFTs(userWalletAddr, [tokenId]);

    // Store the record of txn
    // const transactionId = result.hash;
    const transactionDate = new Date();
    await this.prisma.transactionHistory.create({
      data: {
        transactionId: Math.random().toString(36).substring(7),
        transactionDate,
        fromAddress: claim.tenant.tenantWallet.address,
        toAddress: userWalletAddr,
        isActive: false,
        type: {
          connect: {
            code: 'TRANSFER',
            name: 'transfer',
          },
        },
      },
    });

    // Set as Claimed
    await this.prisma.claim.update({
      where: {
        id: claim.id,
      },
      data: {
        isClaimed: true,
      },
    });
  }

  getSigner(key) {
    const provider = new ethers.providers.InfuraProvider(
      'maticmum',
      process.env.INFURA_SIGN_KEY,
    );
    return new ethers.Wallet(key, provider);
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
