import csv from 'csv-parser';
import fs from 'fs';
import { IOrder } from './types/interfaces';

export class Orders {
  groupBy = async (ordersArray: Array<IOrder>, property: string) => {
    try {
      return ordersArray.reduce((objectArray: any, orderObj: any) => {
        let key = orderObj[property];
        if (!objectArray[key]) {
          objectArray[key] = [];
        }
        objectArray[key].push(orderObj.product);
        return objectArray;
      }, {});
    } catch (e) {
      console.log(`Error running GroupBy function: ${e}`);
    }
  };

  process_orders = () => {
    
    const dir = `${__dirname}/summaries`;
    const orderCSVFile: string = `${__dirname}/data/Orders.csv`;
    const results: Array<IOrder> = [];

    fs.promises.mkdir(dir, { recursive: true }).catch((e) => {
      console.log('error creating directory', e);
    });
    fs.createReadStream(orderCSVFile) //read orders data
      .on('error', (e: Error) => {
        console.log('ReadStream error happened', e);
      })
      .pipe(csv())
      .on('data', (order: IOrder) => {
        if (order.customerId !== '') results.push(order);
      })
      .on('end', async () => {
        const groupedOrders = await this.groupBy(results, 'customerId');
        const jsonGroupedOrders = JSON.stringify(groupedOrders);
        fs.createWriteStream(`${dir}/GroupedOrders.json`).write(
          jsonGroupedOrders,
          (error) => {
            if (error) {
              console.log('writing to disk failed', error);
            }
          }
        );
      });
  };
}
