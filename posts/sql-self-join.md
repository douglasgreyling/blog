---
id: 1
title: SQL Self Join
date: May 4 2020
---

I recently learnt that SQL has the ability to join a table to itself, this is called a self-join. This is possible when you have a table which has a column referencing the primary key.

Let’s say for example we have an employees table which looks something like this:

| employee_id | first_name | last_name | manager_id |
| ----------- | ---------- | --------- | ---------- |
| 1           | Abraham    | Lincoln   |            |
| 2           | Benjamin   | Franklin  | 1          |
| 3           | Charlie    | Brown     | 1          |
| 4           | Douglas    | Greyling  | 2          |

So, for this example, `employee_id` is our primary key for all of our employees. The employees table has another column, `manager_id`, which tracks whether, or not, this employee has a manager. No manager id could mean that this employee is the head honcho in charge, or that they are a manager who reports to another manager. Makes sense?

Either way, we can do a self-join on this table to find all employees who have managers.

```sql
SELECT e.first_name, e.last_name, m.first_name AS manager
FROM employees e
JOIN employees m
ON e.manager_id = m.employee_id;
```

Or to be more succinct:

```sql
SELECT e.first_name, e.last_name, m.first_name AS manager
FROM employees e, employees m
WHERE e.manager_id = m.employee_id;
```

Our result should look something like this:

| first_name | last_name | manager  |
| ---------- | --------- | -------- |
| Benjamin   | Franklin  | Abraham  |
| Charlie    | Brown     | Abraham  |
| Douglas    | Greyling  | Benjamin |

And that’s it. I knew about the concept of joins, but I didn’t realise that one could do a self-join. I thought this was pretty awesome!
