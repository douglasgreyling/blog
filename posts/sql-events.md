---
id: 8
title: SQL Events
date: May 21 2020
---

An event in SQL is task, or block, of SQL code which gets executed based on a schedule. We can use it in situations where we’d like to automate the maintenance of db data, like deleting stale audit data (at least in this example). This post continues on from #7, so be sure to read that one if you haven’t.

To start we need to turn the event scheduler on. This is the variable which tells our db to enable this kind of feature.

We can try find it by doing something like this:

```sql
SHOW VARIABLES LIKE ‘event%’;
```

We should see the variable name, and its value which will either be `ON` or `OFF`. We need it to be on and we can turn it on like this:

```sql
SET GLOBAL event_scheduler = ON;
```

## Creating an event

Let’s create our first event:

```sql
DELIMITER $$

CREATE EVENT yearly_delete_stale_audit_rows
ON SCHEDULE
	EVERY 1 YEAR STARTS ‘2020-01-01’ ENDS ‘2022-01-01’
DO BEGIN
	DELETE FROM post_audits
	WHERE date < NOW() – INTERVAL 1 YEAR;
END $$

DELIMITER ;
```

And just like that we’ve created an event, given it a name which describes when its gonna kick in. Events can either be a once off type thing and we can do that by replacing `ON SCHEDULE` with `USE AT ‘2020-01-01’` which will only run this event on that date.

In this case, we’d like to make it run on a schedule where it starts on ‘2020-01-01’ and it should end on ‘2022-01-01’, although the `STARTS` and `END` keywords are completely optional.

## Viewing events

We can view our events like this:

```sql
SHOW EVENTS;
```

And don’t forget that we can also append `LIKE` to filter down results if we need to.

## Dropping events

Like most things we can delete them when we don’t want them anymore.

```sql
DROP EVENT yearly_delete_stale_audit_rows;
```

## Altering events

But what about when we want to change or disable or events?

To change an event, use `ALTER EVENT`:

```sql
DELIMITER $$

ALTER EVENT yearly_delete_stale_audit_rows
ON SCHEDULE
	EVERY 1 YEAR STARTS ‘2019-01-01’ ENDS ‘2029-01-01’
DO BEGIN
	DELETE FROM post_audits
	WHERE action_date < NOW() – INTERVAL 2 YEAR;
END $$

DELIMITER ;
```

But that might be heavy handed, when all we want to do is temporarily disable an event like so:

```sql
ALTER EVENT yearly_delete_stale_audit_rows DISABLE;
```

We can later replace `DISABLE` with `ENABLE` when we want to turn it back on!

And just like that we have an event which cleans up our stale audit data!
