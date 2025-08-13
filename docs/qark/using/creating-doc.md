---
title: Creating a document
sidebar_position: 2
---

# Creating a document

`qARK Document` supports the builder pattern to make creating easier.

```csharp
var doc = new qARKDocument()
    .AddComment("This is a comment")
    .AddEntry("isOn", true)
    .AddSpace()
    .StartGroup("item")
    .StartArrayEntry("values")
    .AddArrayItem(TimeSpan.FromSeconds(100))
    .AddArrayItem(TimeSpan.FromSeconds(10))
    .FinishGroup();
```

After serialization, the resulting string would look like this:

```qark
# This is a comment
isOn = True

--- item ---
values|
* 100 seconds
* 10 seconds
---
```

## Changing a value

When creating a document from scratch, the builder pattern is great. But what if you already have a document and would like to change a couple of values?

This is where `SetValue` and `SetValues` come in handy.

### Changing a single value

Let's change the value of `isOn` from our previous example.

```csharp
doc.SetValue("isOn", false);
```

Now if we were to serialize the document, we would get this result:

```qark
# This is a comment
// highlight-next-line
isOn = True

--- item ---
values|
* 100 seconds
* 10 seconds
---
```

:::note
`SetValue` will only change the value of the first instance of an entry.

```csharp
doc.SetValue("values", TimeSpan.FromSeconds(20));
```

```qark
--- item ---
values|
# This one has the new value
* 20 seconds
# This one is using the previous one
* 10 seconds
---
```

When working with array entries, read the [next section](#changing-the-value-of-an-array).
:::

### Changing the value of an array

Let's change the value of `item.values` from the first example.

```csharp
doc.SetValues("item.values", [ 1, 4, 8 ]);
```

Now if we were to serialize the document, we would get this result:

```qark
# This is a comment
isOn = True

--- item ---
// highlight-start
values|
* 1
* 4
* 8
// highlight-end
---
```

The `SetValues` method will modify, add and remove entries in order to make the value of the path we provided be equal to what we set.
