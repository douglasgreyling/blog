---
id: 2
title: SQL Cross Join
date: May 8 2020
---

Let’s say we’re working in a database for a yet-to-be world-famous shoe company, named Shoe-pple. Shoe-pple is a bit of a peculiar company. Shoe-pple’s unique spin on shoes involves selling one type of shoe in almost any shade of colour possible.

Our co-founder, Carl, is finally ready to launch the company’s first line of shoes, but first we need to list every shoe size and colour our manufacturer needs to make.

We’ve got our planned shoe sizes stored in a database table named `sizes` and we also have our first set of colours stored in a database table named `shoe_colours`. We need to extract all of this data and then we need to create a list of every possible combination.

Sounds tricky, but suddenly we remember that SQL Cross Joins can save the day!

We can query all this information and then mix together all the possible combinations by making use of a SQL Cross Join, so let’s do it!

We’ll assume our table `sizes` consists of 3 basic sizes: 6, 7, and 8.
We’ll also assume our table `shoe_colours` consists of 3 wonderful colours: lavender, maroon, and azure.

Let’s build a cross join to mix every combination like so:

```sql
SELECT sizes.size, shoe_colours.colour
FROM sizes
CROSS JOIN shoe_colours;
```

And BOOM! Our result:

| size | colour   |
| ---- | -------- |
| 6    | Lavender |
| 6    | Maroon   |
| 6    | Azure    |
| 7    | Lavender |
| 7    | Maroon   |
| 7    | Azure    |
| 8    | Lavender |
| 8    | Maroon   |
| 8    | Azure    |

Pretty simple, right? Our example might be a little contrived. Our example is simple to do by hand, but given a larger list things could get a little more complicated.

You can also create a cross join by doing something like this:

```sql
SELECT sizes.size, shoe_colours.colour
FROM sizes, shoe_colours;
```

So just a friendly heads up in case you ever see that in the wild.

Now that Shoe-pple has our list, it’s time to begin its world shoe domination!
