# Grocery Store 

A grocery store needs to prepare updates for two systems every night at 12:00 AM. The systems consume data in their own proprietary formats, one is already generated and needs to be updated and the other needs to be manually generated.  The first system is used for stock ordering. It needs to know how many products have been consumed throughout the day so that it can generate orders for the store. This data is formatted as XML. The second system is used for promotions to customers. It needs to know what products each customer purchased. It will only receive information about customers who used their customer loyalty card when ordering. This data is formatted as JSON.

The orders for the day are available in a CSV. Each order contains the order ID, department, product & customer ID (if available).

## Data Samples (files present in data folder of the repository)
 - `Customers.json`
 - `Orders.csv` 
 - `Stock.xml`

## Challenge

### Part 1: Customer Order Grouping

For each customer that made a purchase on the day, group any orders together by their customer ID only including the products purchased & the quantity of each product purchased.

Do not include any orders that did not include a customer ID.

Write this JSON output to a file named `summaries/GroupedOrders.json`.

Treat the `Customers.json` file like a database — not all customers in the `Customers.json` file would have made a purchase that day, and when reading from the file consider memory efficient approaches.

### Part 2: Process XML and convert to Object asynchronously 

The Stock.xml file includes the quantity of each item purchased that day & it is incorrect until updated from today's orders. For each order, update the corresponding quantities in the `Stock.xml` file.

Remove any duplicates & add products if they do not exist.

The updated Stock should be placed in `summaries/Stock.xml`.

## Considerations

1. Be memory efficient — although this challenge only has ~30000 total records, in the real world databases can contain trillions of records.

2. Treat the filesystem like a database — consider IOPS & the impact of many write operations at once.

3. Use asynchronous `fs` methods if you're doing the challenge in TypeScript.

