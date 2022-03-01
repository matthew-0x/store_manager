import { Orders } from './OrdersProcessor';
import { Stocks } from './StockProcessor';

const main = () => {
  const orders = new Orders();
  const stocks = new Stocks();
  orders.process_orders();
  stocks.process_stock();
};
main();
