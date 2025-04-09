import {
  OrderService,
  CartService,
  ProductService,
  ProductVariantService,
} from "@medusajs/medusa";
import axios from "axios";

class OrderCompletedSubscriber {
  protected readonly orderService: OrderService;
  protected readonly cartService: CartService;
  protected readonly productService: ProductService;
  protected readonly productVariantService: ProductVariantService;
  constructor({
    eventBusService,
    orderService,
    cartService,
    productService,
    productVariantService,
  }) {
    this.orderService = orderService;
    this.cartService = cartService;
    this.productService = productService;
    this.productVariantService = productVariantService;
    eventBusService.subscribe(
      OrderService.Events.FULFILLMENT_CREATED,
      this.handleOrder
    );
  }

  handleOrder = async (data) => {
    console.log("Order completed");
    const order = await this.orderService.retrieve(data.id, {
      relations: ["items"],
    });
    for (const item of order.items) {
      const variant = await this.productVariantService.retrieve(
        item.variant_id,
        {
          relations: ["product"],
        }
      );
      const product = variant.product;
      if (product.metadata["nft"] && product.metadata["nft"] === "true") {
        const response = await axios.post(
          `${process.env.ONBOARDEX_API_URL}/tenants/initiate-transfer`,
          {
            clientEmail: "muhammed8089@gmail.com",
            destination: order.email,
            serialId: variant.product_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.ONBOARDEX_API_KEY}`,
            },
          }
        );
        console.log("Claiming product");
      }
    }
  };
}

export default OrderCompletedSubscriber;
