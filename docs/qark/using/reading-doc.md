---
title: Reading a document
sidebar_position: 3
---

# Reading a document

## Reading a single value

To read a single value, use `GetValue` or `TryGetValue`.

`GetValue` will return the converted value of item at the provided path. If the item does not exist, or if it couldn't be converted to the provided type, it will return the optional parameter `defaultValue`.

Simular to `GetValue`, `TryGetValue` does the same thing and additionally, returns if it was successfull.

```csharp
if (doc.TryGetValue<int>("item.value", 10, out int result))
{
    // The value was able to be read
}
else
{
    // The value couldn't be retrieved
    // result is not equal to the provided default value '10'
}
```

## Reading an array

To read an array, use `GetValueArray`. There is no "try" variant of this one, as if no entries exist, it means that the array is empty.

## Reading an object

An object is a collection of entries, that are prefixed with the same path. We can group them together into a `qARKObject` and then read it separately from the rest of the document.

```qark
something = hello world
number = 10

item.name = My Name
item.value = 30
item.age = 10 days
```

```csharp
var obj = doc.GetObject("item");

// This will return false, as the object doesn't contain a value at path "something"
obj.TryGetValue<string>("something", out var something);

// This will return the value of "item.name" that's equal to "My Name"
var name = obj.GetValue<string>("name");
```

## Reading an object array

We can also read an array of objects.

```qark
--- items.@ ---
name = First
age = 10
---

--- items.@ ---
name = Second
age = 20
---

--- items.@ ---
name = Third
age = 40
---
```

```csharp
var array = doc.GetObjectArray("items");

foreach (var item in array)
{
    var name = item.GetValue<string>("name");
    var age = item.GetValue<int>("age");
    Console.WriteLine($"{name} is {age} years old.");
}

// Output:
// First is 10 years old
// Second is 20 years old
// Third is 40 years old
```
