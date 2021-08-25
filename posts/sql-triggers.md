---
id: 7
title: SQL Triggers
date: May 20 2020
---

SQL triggers are essentially blocks of code which get automatically executed before (or after) insert, update, or delete statements. They’re super handy for things like ensuring data consistency, but in today’s example we’re gonna show how triggers can be a useful auditing tool.

Let’s say we have an app where users can create blogs posts. Users have the ability to create, edit and delete posts, but sometimes some users’ posts contain random changes which they swear they never added. We decide to create audit logs to track some of the changes made to the posts, like updating a blog post for example.

To start things, lets imagine we have an audits table with the following info

| post_audits |
| ----------- |
| user_id     |
| post_id     |
| date        |

We’ll also imagine that our blog post table stores the user who last updated the post.

## Creating a SQL trigger

To begin, we create a SQL trigger like this:

```sql
DELIMITER $$

CREATE TRIGGER posts_after_update
  AFTER UPDATE ON posts
  FOR EACH ROW
BEGIN
  INSERT INTO post_audits
  VALUES(
    NEW.client_id,
    NEW.post_id,
    NEW.last_modified_user_id,
    NOW()
  );
END$$

DELIMITER ;
```

I’m going to skip over some of the code that’s common with creating a stored procedure. If something is missing then be sure to check out post #5.

In this case we’ve created a trigger with a descriptive name which helps us know when this trigger is fired.

We can create triggers whenever data inside a table is inserted, deleted or updated. We can select whether we’d like this trigger to execute before or after the event has occurred. In this case our trigger fires after an update on the posts table, but we could change it to fire before by replacing `AFTER` with `BEFORE`.

We then state that for every row changed, create a row in the `post_audits` table.

The body of our trigger inserts some of the post data into our `post_audits` table. In this instance, we’re interested in the updated values of the record being updated, so we refer to it using `NEW` followed by a `.` and the name of the field we’d like to get.

We can also refer to the old instance of the record using `OLD`.

But just like that we’re able to see what changes have been made for a particular post, but inspecting our `post_audits` table. Neat, right?

## Viewing triggers

We can see all of our triggers with:

```sql
SHOW TRIGGERS;
```

This will show us all sorts of useful info like the trigger’s name, the event which will cause it to fire, the table the trigger is set to watch, the actual trigger code, whether it’s a before/after trigger and more.

In some cases, you might have quite a few triggers, so don’t forget that you can slap a `LIKE` on the end of that bad boy and filter the results.

## Dropping triggers

Dropping triggers is similar to dropping stored procedures.

```sql
DROP TRIGGER payments_after_insert;
```

And that’s it! I hope this post audits example was a useful proof of concept for what can be down with triggers. I really liked it and might consider using it the next time I need to audit key data.
