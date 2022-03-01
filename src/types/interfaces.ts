export interface IOrder {
  id: string;
  department: string;
  product: string;
  customerId: string;
}

export interface IProductOrders {
  id: string;
  productName: string;
  quantitySoldToday: string;
}