import { ProductService, CartService } from "@medusajs/medusa";
import axios from "axios";

class OrderNotifierSubscriber {
  protected readonly productService: ProductService;
  constructor({ eventBusService, productService }) {
    this.productService = productService;
    eventBusService.subscribe(
      ProductService.Events.CREATED,
      this.handleProductCreated
    );
  }

  handleProductCreated = async (data: { id: string }) => {
    const product = await this.productService.retrieve(data.id);
    const productData = {
      productName: product.title,
      productDescription: product.description,
      serialId: product.id,
      imageURL: product.thumbnail,
    };
    const response = await axios.post(
      `${process.env.ONBOARDEX_API_URL}/tenants/single-mint-client`,
      productData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ONBOARDEX_API_KEY}`,
        },
      }
    );
    console.log(response.data);
  };
}

export default OrderNotifierSubscriber;
