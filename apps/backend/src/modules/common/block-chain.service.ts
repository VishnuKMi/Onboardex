import { Injectable } from '@nestjs/common'
import { ethers } from 'ethers'

@Injectable()
export class BlockChainService {
  contractAddress = '0x2C183C9A8243170cfF1c38A891BF1C99bC663e83'

  generateWallet (): { address: string; privateKey: string } {
    const wallet = ethers.Wallet.createRandom()
    const address = wallet.address
    const privateKey = wallet.privateKey

    return { address, privateKey }
  }

  addImageToIpfs (image: string): string {
    //   TODO: Add image to IPFS
    return ''
  }
}
