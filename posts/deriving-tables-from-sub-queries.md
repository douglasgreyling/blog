---
id: 3
title: Deriving Tables From Sub-Queries
date: May 10 2020
---

# #3 SQL Deriving tables from sub-queries

Here’s a quick lesson I learnt about. Hopefully it comes in handy some time.

I’ve been learning a little about SQL sub-queries lately and I recently discovered that you can query a sub-query. I hope this makes sense, but I’m sure an actual example might make more sense.

Let’s say we have a table of customers like this:

| first_name | last_name | points |
| ---------- | --------- | ------ |
| Andy       | Warhol    | 1000   |
| Bobby      | Brown     | 234    |
| Candace    | Lady-face | 687    |

Let’s say we made a query like so:

```sql
SELECT first_name, points
FROM customers;
```

And then we decided (for some strange reason) that we wanted to make another query on this result where we want to find our customers with 1000 points or more. We can do this like so:

```sql
SELECT first_name
FROM (
SELECT first_name, points
FROM customers
) AS gold_customers
WHERE points >= 1000;
```

Now, at first this might not seem super powerful, but it could save us some effort. For example, imagine instead that we wanted to query the result of joining 2 tables together.

We could derive a new table by joining those 2 tables and then we could query that new derived table in the same way we normally query any other table.
