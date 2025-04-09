import { Injectable } from '@nestjs/common'
import { AdminLoginBody } from '../../types/admin'
import { ethers } from 'ethers'
import { MintABI } from '../../contract/abi'
import { PrismaService } from '@modules/common/prisma.service'

@Injectable()
export class AdminService {
  constructor (private prisma: PrismaService) {}
  login (body: AdminLoginBody) {
    return true
  }

  async getTenants () {
    return await this.prisma.tenant.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        url: true,
        products: {
          select: {
            nft: {
              select: {
                id: true,
                ownerAddress: true,
                nftMetadataCid: true,
                claim: {
                  select: {
                    isClaimed: true,
                  },
                },
              },
            },
          },
        },
        users: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            isEmailVerified: true,
            isActive: true,
            createdAt: true,
          },
          where: {
            isActive: true,
          },
        },
        contract: {
          select: {
            contractAddress: true,
          },
        },
        tenantWallet: {
          select: {
            address: true,
          },
        },
      },
    })
  }

  async totalUsage () {
    return await this.prisma.transactionHistory.findMany({
      include: {
        type: true,
      },
    })
  }

  async toggleStatus (body) {
    // const contractAddress = body.contract
    const contractAddress = '0x2C183C9A8243170cfF1c38A891BF1C99bC663e83'
    const contract = await this.prisma.contract.findUnique({
      where: {
        contractAddress,
      },
      select: {
        isActive: true,
        tenant: {
          select: {
            tenantWallet: {
              select: {
                encryptedPrivateKey: true,
              },
            },
          },
        },
      },
    })

    // const key = process.env.PRIVATE_KEY
    // const signer = this.getSigner(key)
    const signer = this.getSigner(
      'b6c7b218a0d2f8524a76553118c9884e2c47712010398f75c19c36df8192dd47', // Admin key
    )

    const contractInst = new ethers.Contract(contractAddress, MintABI, signer)

    const result = await contractInst.togglePause()
    await result.wait()

    // Update active status in DB
    const newStatus = !contract.isActive
    await this.prisma.contract.update({
      where: {
        contractAddress,
      },
      data: {
        isActive: newStatus,
      },
    })

    return newStatus
  }

  getSigner (key) {
    const provider = new ethers.providers.InfuraProvider(
      'maticmum',
      process.env.INFURA_SIGN_KEY,
    )
    return new ethers.Wallet(key, provider)
  }
}
