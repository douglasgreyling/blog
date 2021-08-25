---
id: 5
title: SQL Stored Procedures
date: May 14 2020
---

SQL allows us to create something called a stored procedure. It’s basically code which has been saved so that we can call it and reuse it when we need it.

We can even add things like parameters to our stored procedures, so it’s super useful when we don’t want to repetitively write and call a common query.

Let’s dive into some of the basics of stored procedures.

## Creating a stored procedure:

We create a stored procedure like this:

```sql
DELIMITER $$

CREATE PROCEDURE get_invoices ()
BEGIN
  SELECT * FROM invoices;
END$$

DELIMITER ;
```

There’s a lot going on here so let’s pick it apart.

MySQL clients like MySQL workbench use the `;` delimiter to separate and execute statements.

A stored procedure consists of multiple statements, but we need to define our stored procedure in a single statement so that SQL reads in the whole procedure definition at once. In order to do this, we need to use the `DELIMITER` keyword to temporarily redefine the default delimiter. We conventionally use the `$$` delimiter.
Once we’ve done this, then our procedure definition is read as one statement, instead multiple separate statements.

Next we give the stored procedure a name (`get_invoices` in this case) and we add the required parenthesis. We’ll talk about placing parameters inside the parenthesis later on.

Everything between the `BEGIN` and `END` is called the procedure body and this is where we define our stored procedure.

Once we’ve defined the procedure body we’ll close it with `END` and our new delimiter on the end to finish up our statement.

Don’t forget to set the default delimiter back to `;`!

## Calling a stored procedure:

We can call/execute a stored procedure like so:

```sql
CALL get_invoices();
```

You might also see the same thing like this:

```sql
EXEC get_invoices();
```

## Adding parameters to stored procedures:

We can add parameters to our stored procedures by giving the parameter a name and a type between the procedure’s parenthesis:

```sql
DELIMITER $$

CREATE PROCEDURE get_invoices(amount_due DECIMAL(9, 2))
BEGIN
  SELECT * FROM invoices i
  WHERE c.amount_due <= amount_due;
END$$

DELIMITER ;
```

We can then call our store procedure like this:

```sql
CALL get_invoices(1000);
```

## Some stored procedure fun:

We can do a bunch of cool things in stored procedures like default conditions when parameters are null.

Here we return all invoices when our parameter is `NULL`:

```sql
DELIMITER $$

CREATE PROCEDURE get_invoices(amount_due DECIMAL(9, 2))
BEGIN
  SELECT * FROM invoices i
  WHERE i.amount_due = IFNULL(amount_due, i.amount_due);
END$$

DELIMITER ;
```

And then call it like this:

```sql
CALL get_invoices(NULL);
```

## Validating parameters

We can validate our parameters and use a signal statement to throw an error with the appropriate code which will describe what type of error occurred.

```sql
DELIMITER $$

CREATE PROCEDURE update_invoice(invoice_id INT, amount_due decimal(9, 2))
BEGIN
  IF amount_due < 0 THEN
   SIGNAL SQLSTATE ‘22003’
      SET MESSAGE_TEXT = ‘Invalid amount_due;
  END IF;

  UPDATE invoices i
  SET
     i.amount_due = amount_due
  WHERE i.invoice_id = invoice_id;
END$$

DELIMITER ;
```

There’s like a million different kinds of error codes. [Check them out here](https://www.ibm.com/support/knowledgecenter/en/SSEPEK_11.0.0/codes/src/tpc/db2z_sqlstatevalues.html).

## Deleting/dropping stored procedures:

For the last part of our stored procedure crash course let's delete/drop a stored procedure:

```sql
DROP PROCEDURE get_invoices;
```

It’s that simple!
