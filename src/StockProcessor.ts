import Parser from 'node-xml-stream';
import fs from 'fs';
import { IProductOrders } from './types/interfaces';
// variables to construct final object from xml file
let id: string;
let productName: string;
let quantitySoldToday: string;
let tag_name: string;
const parser = new Parser();

export class Stocks {
  stocks = { productOrders: [] as Array<IProductOrders> };
  process_stock = () => {
    const dir = `${__dirname}/summaries`;
    const stockXMLFile: string = `${__dirname}/data/Stock.xml`;
    parser.on('opentag', (name: string, attrs: any) => {
      tag_name = name;
    });

    // </tag>
    parser.on('closetag', (name: string) => {
      if (name === 'productOrders')
        this.stocks['productOrders'].push({
          id,
          productName,
          quantitySoldToday,
        });
    });

    // <tag>TEXT</tag>
    parser.on('text', (text: string) => {
      if (tag_name === 'id') {
        id = text;
      }
      if (tag_name === 'productName') {
        productName = text;
      }
      if (tag_name === 'quantitySoldToday') {
        quantitySoldToday = text;
      }
    });

    parser.on('error', (err: Error) => {
      console.log('Error: Parsing XML failed', err);
    });

    parser.on('finish', () => {
      console.log('Finished Streaming');
    });

    fs.createReadStream(stockXMLFile)
      .on('error', (e: Error) => {
        console.log('Error reading the file', e);
      })
      .pipe(parser);
  };
}
