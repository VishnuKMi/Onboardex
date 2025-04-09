export interface MintMetaData {
  metadataCID: string
  serialId: string
  email: string
}

export interface Client {
  contractAddress: string
  contractABI: string
  privateKey: string
}
