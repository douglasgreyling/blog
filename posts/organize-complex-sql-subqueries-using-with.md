---
id: 12
title: Organize complex SQL subqueries using WITH
date: August 29 2020
---

You might find yourself working with complex nested subqueries when writing raw SQL. I recently learned about `WITH` clauses and so here's how they might simplify your life.

At birth, your subqueries start out simple, young, and so innocent, but as time goes on they mature, develop zits, need braces and require a lot of careful supervision to ensure that they do what you want them to do.

You've given birth to these children. Each with their own context, rules and understanding of the world around them and it's only a matter of time before you forget why that random (but critical) `JOIN`, `ORDER BY` etc. etc. was there in the first place.

Throw in multiple subqueries, nest a few of them, and you've got the perfect storm.

## Fun `WITH` names

In comes the `WITH` clause. The hero you've always needed, but never knew existed.

The great thing about the `WITH` clause is that it allows you to refer to a query via a name. Almost like assigning it to a temporary table, or to a variable.

The reason this is so powerful is because SQL (like any other code) is read many more times than it is written. By giving a query a useful, and intention revealing, name we can implicitly also bring the set of rules (or context) to mind which the query deserves. Suddenly that peculiar part of the query becomes much more intuitive.

## Time for some SQL therapy

I'm going to share a fairly simple, but contrived, example of where a `WITH` clause can shine. There is a simpler/better way to solve this particular problem, but this is just a silly example to illustrate what `WITH` does 😜 \</disclaimer>

To begin, let's assume:

- A customer has many subscriptions.
- A customer also has a column which records whether the customer would like us to contact them regarding promotions, or not.
- Each subscription tracks the date the subscription started, the date the subscription will end, and the value of the subscription.

</br>

We want to find all customers who have an active subscription where the subscription value is greater than, or equal to, $10. But remember, these customers must be willing to receive promo's!

From this initial query, we'll then want to find all eligible & interested male customers over the age of 25 and combine them with a list of all eligible & interested female customers between 20 and 23.

Imagine our original query looks like this:

```sql
SELECT * FROM (
  SELECT * FROM customers
  INNER JOIN subscriptions ON customers.id = subscriptions.customer_id
  WHERE subscription.value <= 10 AND
        NOW() <= subscription.expiry_date AND
        customer.wants_promos = 1 AND
        customer.gender = 'M' AND
        25 < customer.age
)
UNION ALL
SELECT * FROM (
  SELECT * FROM customers
  INNER JOIN subscriptions ON customers.id = subscriptions.customer_id
  WHERE subscription.value <= 10 AND
        NOW() <= subscription.expiry_date AND
        customer.wants_promos = 1 AND
        customer.gender = 'F' AND
        20 <= customer.age AND
        customer.age <= 23
)
```

Using `WITH` we could clean it up to look like this:

```sql
WITH interested_eligible_customers AS (
  SELECT * FROM customers
  INNER JOIN subscriptions ON customers.id = subscriptions.customer_id
  WHERE subscription.value <= 10 AND
        NOW() <= subscription.expiry_date AND
        customer.wants_promos = 1
)
  SELECT * FROM interested_eligible_customers
  WHERE customer.gender = 'M' AND 25 < customer.age
  UNION ALL
  SELECT * FROM interested_eligible_customers
  WHERE customer.gender = 'F' AND
        20 <= customer.age AND customer.age <= 23
```

Once again. A silly, contrived example, but notice how the name we used lined up with how we initially described our customers as interested & eligible customers?

The following queries we made below the `WITH` clause became simpler since we could now refer to the subquery just like a normal table in our DB. Our query is a little more readable, intention revealing, and DRY.

+1 for readability. +1 for understanding. +1 for DRY.

When you find yourself using large subqueries (especially if it's nested once or twice), then you might benefit from slapping a nice name on that sucker.

`WITH` let's you focus on names and removes confusing subqueries through names instead of having the subqueries bloat your main query.
