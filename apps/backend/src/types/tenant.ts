export interface TenantRegisterBody {
  firstName: string;
  lastName: string;
  companyName: string;
  url: string;
  email: string;
  password: string;
}

export interface TenantLoginBody {
  email: string;
  password: string;
}

export interface MintBody {
  productName: string;
  productDescription: string;
  serialId: string;
  productionDate: string;
  imageURL: string;
}

export interface ClientBody {
  clientEmail: string;
  destination: string;
  productID: string;
}
