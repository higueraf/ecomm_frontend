export interface OrderInterface {
  orderId?: string;
  clientId?: string;
  paymentMethodId?: string;
  orderDate?: Date;
  subTotal?: number;
  tax?: number;
  total?: number;
}
