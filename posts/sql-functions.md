---
id: 6
title: SQL Functions
date: May 15 2020
---

Functions in SQL are very similar to stored procedures, but they are still different.

Here’s a list of some basic differences between the two:

1. A function must return a value, but a stored procedure doesn’t have to. Stored procedures can return 0, or more, values/result sets.
2. Functions can be called from procedures, but procedures cannot be called from functions.
3. Stored procedures cannot be called in SQL statements using `SELECT`/`WHERE`/`HAVING`, but functions can be.

This isn’t a complete list, and I’m not sure that I’d bore you with those facts, but these are some of the cool ones I found. There’s definitely more!

The syntax for creating functions is very similar to the syntax used to create stored procedures.

```sql
DELIMITER $$

CREATE FUNCTION get_average_amount_due(customer_id INT)
RETURNS DECIMAL(9,2)
READS SQL DATA
BEGIN
  DECLARE average_amount_due DECIMAL(9, 2) DEFAULT 0;
  DECLARE total_amount_due DECIMAL(9,2);
  DECLARE total_invoices INT;

  SELECT SUM(i.amount_due), COUNT(*)
  INTO total_amount_due, total_invoices
  FROM invoices i
  WHERE i.customer_id = customer_id;

  SET average_amount_due = total_amount_due / invoices_count;
  RETURN IFNULL(average_amount_due, 0);
END$$

DELIMITER ;
```

Ok! That’s it. Done. Next post!

Nah, let’s break this down since there’s a lot going on. Be sure to read post #5 – SQL Stored Procedures to catch up on any explanations I leave out.

So, we start by stating that we’re creating a function. It’s much like the definition for creating a stored procedure, except we also define what this function returns, and in this case its `DECIMAL(9,2)`. This is required when we define a function.

Next we define some attributes for this function. Here we’ve stated that this function reads sql data. There’s not many attributes so I’ll quickly cover them:

1. `DETERMINISTIC` – Given the same values, this function returns the same result. For example, imagine providing values which result in the cost of shipping on an order.
2. `READS SQL DATA` – This function reads data from the database.
3. `MODIFIES SQL DATA` – This function uses `UPDATE`, `INSERT` or `DELETE` statements.

We can mix and match any of these, for example a function can use `READS SQL DATA` and `MODIFIES SQL DATA`. To do so, just add the next attribute after the other. So that’s attributes done and dusted

Inside our function body we define some variables and their types using `DECLARE`. Our statement then sets `total_amount_due` and `total_invoices` in our select statement. After that we then set the value of `average_amount_due` to be `total_amount_due`/ `total_invoices`. Nothing too complex.

Finally, we have to return a value for this function and it has to be a `DECIMAL(9,2)` and luckily it is. We’re doing a slight trick here to make sure that if the value is `NULL`, then we return 0.

That’s it!

Now we can call this function inside a SQL statement like this:

```sql
SELECT customer_id, get_average_amount_due(customer_id)
FROM invoices;
```

Which would return a table that looks something like this:

| customer_id | get_average_amount_due(customer_id) |
| ----------- | ----------------------------------- |
| 1           | 90.21                               |

To end this post, you can also remove a function when you don’t need it anymore and that’s done like this:

```sql
DROP FUNCTION get_average_amount_due;
```

And boom! It’s gone!
