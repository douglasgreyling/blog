---
id: 4
title: SQL Views
date: May 10 2020
---

The more I learn about SQL the more I realize that there’s a million different ways to query the same data, but sometimes you actually just want to use the same query over and over again to get some useful information.

SQL views are the perfect way to ensure that you aren’t copying and pasting the same verbose SQL statement over and over again just to query data from your database.

A view is essentially a SQL statement which has been saved to create a type of in memory database. It’s super handy since it can take a complicated query and break it down so that you have time to focus on what matters most. There are so caveats though, no solution is perfect. Let’s dive in and learn about SQL views!

## Creating a SQL View

Let’s imagine we have a table called `suppliers` which tracks various information about the suppliers a business uses to get resources to perform various projects.

If, for example, our business found that we kept performing the same sort of query where we want to find all suppliers where the amount of money spent on that supplier exceeded some threshold, then we could save ourselves some time by creating a SQL view like so:

```sql
CREATE VIEW useful_suppliers AS
SELECT name, address, amount_spent
FROM suppliers
WHERE 1000 < amount_spent;
```

Now, instead of having to write the same select query a million times, we have it saved in our SQL db as a view which we can query like a table.

## Querying data from a SQL View

We can query a view much like any other SQL table.

```sql
SELECT SUM(amount_spent) AS total_spent
FROM useful_suppliers;
```

Inserting/updating data into a view is a little trickier since there are certain conditions which dictate when this is possible.

For example, it’s possible to update our view based on the following rules:

1. Our query does not use the DISTINCT keyword.
2. Our query does not use any summary function or set functions/operators.
3. Our query does not use the ORDER BY clause.
4. Our query does not join multiple tables.
5. Our query does not use a WHERE clause containing subqueries.
6. Our query does not use the GROUP BY or HAVING clauses.

Provided we follow these rules, we can insert/update our view like anything else in SQL:

```sql
INSERT INTO useful_suppliers (name, address, amount_spent)
VALUES (‘Tools R Us’, ‘123 Sesame Road’, 1200);
```

And likewise delete anything:

```sql
DELETE FROM useful_suppliers
WHERE name = ‘Tools R Us’;
```

This does not mean that we cannot create a view which breaks these rules, but it just means that if we do break these rules, then we can no longer update the values directly using our view.

## Changing/replacing a SQL View

We can also change a view we’ve created if our requirements ever change.

```sql
REPLACE VIEW useful_suppliers
SELECT name, amount_spent
FROM suppliers
WHERE 9999 < amount_spent;
```

## Deleting a SQL view

We can also get rid of views which we don’t need. It’s much like dropping any normal table in SQL.

```sql
DROP VIEW useful_customers;
```

I hope this crash course on views has been insightful. I’ve had the unfortunate opportunity to have to come back to a database every few months, or so, just to perform the same painful and difficult-to-remember query.

So, I was relieved to hear that such a thing existed in SQL. Next time you find yourself with the same issue, try to save yourself the pain and consider using a view!
