---
id: 9
title: SQL Transactions
date: May 23 2020
---

A transaction is a group of SQL statements which represent a single unit of work. So, all of the statements inside the transaction must be completed successfully or else the transaction will fail.

A prime example could be a bank transaction. We’d have a problem if the withdrawal was successful, but the deposit never occurred. We’ve just lost money! Both events must be successful for the transaction to be complete.

There are 4 key properties (ACID) of a good transaction:

Atomicity: All statements are performed as one operation. They must all be successful, or else the transaction has failed. Think all or nothing.

Consistency: The data must be consistent when a transaction starts and finishes. Like a bank transaction, we have not lost, or created, any extra money. The amount of funds is consistent.

Isolation: Transactions are isolated from each other if they try to update the same data. Transactions are queued up to run one by one.

Durability: The changes made by a transaction must persist if the transaction is successful. The changes must not be lost.

## Creating a transaction:

```sql
START TRANSACTION;

INSERT INTO users (points)
VALUES (100);

COMMIT;
```

This is fairly simple example, but the point is clear. We just have to wrap our SQL statements with `START TRANSACTION` and `COMMIT`.

## Concurrency:

So, when working with transactions, it’s possible that two, or more, transactions might attempt to retrieve, or change, fields on one row in a database table. Because of this possibility we have some potential concurrency headaches we have to take note of:

### Lost updates:

This is when two transactions try to update the same row. The transaction that commits last will overwrite the changes the first transaction committed thus losing any updates which the first made.

Imagine having a users table which tracks things like the users name and age.
We might have a user like this:

| name | age |
| ---- | --- |
| Abe  | 20  |

Transaction A updates the name like this:

| name    | age |
| ------- | --- |
| Abraham | 20  |

But whilst this is happening, transaction B comes along and updates the age:

| name | age |
| ---- | --- |
| Abe  | 21  |

Not good! We’ve lost some data!

### Dirty reads:

This occurs when we have a transaction which reads data which hasn’t yet been committed.

For example, transaction A is updating points belonging to a user. We then have transaction B do a calculation using points, and it reads the points which transaction A has set (but transaction A has not yet finished and committed its change). For some reason, transaction A fails and rolls back the value of the users’ points. The issue here is that transaction B might be using a value for points which is invalid, or which no longer exists (yet).

### Non-repeating reads:

This is where data is read at two different times in one transaction, but the value has changed each time. For example, with the points. This might sound similar to dirty reads, but here’s the difference: We could be reading values which have been successfully committed.

So essentially, we want the points to remain constant/consistent in the transaction.

Imagine if transaction A queried points multiple times in a transaction, but transaction B came along and made a quick change to the points for the same user. Imagine trying to debug or recalculate that. Yikes!

### Phantom reads:

This sort of issue occurs where we have transaction A which queries a table based on a certain criterion, let’s say where points are greater than ten, but then right afterwards transaction B updates a user to have enough points to match the criteria.

In some cases, it might be critical to ensure that we don’t have anyone excluded from some queries we’ve made.
In this case, the solution would be to track and wait for transactions which to finish which could potentially cause phantom reads.

So how do we solve these issues?

Luckily SQL has ways for transactions to overcome these issues using isolation levels. The following table shows the isolation level in the first column and what the isolation solves, marked with an ‘X’:

|                  | Lost Updates | Dirty Reads | Non-Repeating Reads | Phantom Reads |
| ---------------- | ------------ | ----------- | ------------------- | ------------- |
| READ UNCOMMITTED |              |             |                     |               |
| READ COMMITTED   |              | X           |                     |               |
| REPEATABLE READ  | X            | X           | X                   |               |
| SERIALIZABLE     | X            | X           | X                   | X             |

As we move from `READ UNCOMMITTED` to `SERIALIZABLE` we’re increasing our isolation level (and vice versa) which means that we are solving more of our concurrency issues.

Not all databases need the highest level of isolation, and one has to find the right balance of isolation vs performance. Increasing the level of isolation can slow down our transactions since we have to add locks and do things like wait for other transaction to finish etc.

By default, MySQL’s transaction isolation level is set to `REPEATABLE READ`.

## Viewing our isolation level:

You can see your isolation level like this:

```sql
SHOW VARIABLES LIKE ‘transaction_isolation’;
```

## Setting our isolation level:

We can set our isolation level to something different like this:

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

However, this will only set the isolation level for the next transaction run. We can set it for all transaction in our session/connection like so:

```sql
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

And finally, we can also set it globally for all sessions:

```sql
SET GLOBAL TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

## Deadlocks:

So, deadlocks really suck. I’ve had some bad experiences with them in the past, but they occur when different transactions cannot complete because each transaction has a lock on a row which the other transaction needs to access.

For example:

Transaction A

```sql
START TRANSACTION;

UPDATE customers SET state = ‘VA’ where customer_id = 1;
UPDATE orders SET status = 1 WHERE order_id = 1;

COMMIT;
```

Transaction B

```sql
START TRANSACTION;

UPDATE orders SET status = 1 WHERE order_id = 1;
UPDATE customers SET state = ‘VA’ where customer_id = 1;

COMMIT;
```

Both transactions could be run at roughly the same time, and a deadlock occurs because are waiting on each other. Transaction A needs the same orders row which transaction B is using, and transaction B is using the same customers row which transaction A needs.

It can be a little difficult to deal with deadlocks, but we can keep an eye open for them when we write our queries. There are also strategies we can use to minimize this, like keeping our transactions as small as possible so that they complete as quick as possible (reducing the chance that the deadlock occurs), but that might be a topic for another day’s blog.
