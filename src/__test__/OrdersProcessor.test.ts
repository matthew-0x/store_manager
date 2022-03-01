import { groupBy } from '../OrdersProcessor';

const actual = [
  { product: 'apple', id: '1', department: 'grocery', customerId: '220' },
  { product: 'apple', id: '1', department: 'grocery', customerId: '223' },
  { product: 'awesomeBread', id: '2', department: 'bakery', customerId: '220' },
  { product: 'awesomeMeat', id: '3', department: 'meat', customerId: '223' },
];

describe('groupBy function', () => {
  test('must group objects by "customerId" property', () => {
    const result = {
      '220': ['apple', 'awesomeBread'],
      '223': ['apple', 'awesomeMeat'],
    };
    expect(groupBy(actual, 'customerId')).toStrictEqual(result);
  });
  test('must group objects by "product" property', () => {
    const result = {
      apple: ['apple'],
      awesomeBread: ['awesomeBread'],
      awesomeMeat: ['awesomeMeat'],
    };
    expect(groupBy(actual, 'customerId')).not.toStrictEqual(result);
  });
});
