---
sidebar_position: 1
title: The Format
---

# The Format

:::note
This page isn't finished yet and will be improved in the future.
:::

At it's core, qARK is a list of values being assigned to a path.

```qark
example.0.name = Example
example.0.description = Description of the example
example.1.name = Other example
example.1.description = Lorem ipsum dolor sit amet
```

This exaxmple could be used to describe the contents of this in C#.

```csharp
var example = new List<ExampleItem>()
{
    new ExampleItem()
    {
        name = "Example",
        description = "Description of the example"
    },
    new ExampleItem()
    {
        name = "Other example",
        description = "Lorem ipsum dolor sit amet"
    }
};

public struct ExampleItem
{
    public string name;
    public string description;
}
```

Of course, serialization like this by itself is quite annoying, which is where the other types of elements come in.

## Comments

As many markup languages, qARK supports comments, which are defined by preceding a line with `#`.

```qark
# I am a comment
```

:::warning
Comments must be defined in a separate line.

```qark
# This is a comment
example = hello # This is not a comment
```

The value of `example` is `hello # This is not a comment`.
:::

## Group element

A group gives a prefix for all entry paths below it. For example:

```qark
config.version = 3.0

--- config.user ---
name = Harold
startMinimized = True
```

...would be the same as...

```qark
config.version = 3.0

config.user.name = Harold
config.user.startMinimized = True
```

---

A group can be closed by writing `---`

```qark
--- settings ---
# Full path: settings.resolutionX
resolutionX = 1920
# Full path: settings.resolutionY
resolutionY = 1080
---

# Full path: currentLevel
currentLevel = level3
```

## Array entries

Entries can be defined by assigning multiple values to the same path.

```qark
colors = red
colors = green
colors = blue
```

In C#, this would look like this.

```csharp
var colors = new string[]
{
    "red",
    "green",
    "blue"
}
```

To avoid having to retype the same path over and over, we can use an **array item entry** instead.

```qark
colors = red
* green
* blue
```

Values prefixed with a `*` will create new entries that copy the previous entry's path.

But this can still be better. It's possible to create entries that contain no value, by writing out a path and ending it with a `|`.

```qark
# This entry has no value
colors|
```

By itself, this is useless, but combined with the **array item entry**, we can do this:

```qark
colors|
* red
* green
* blue
```

:::tip Good practices
1. When creating an array, define the path as a **array head entry** and it's values as **array item entries**.
```qark
# Correct
array|
* item 1
* item 2
* item 3

# Will work, but makes editing more difficult
array = item 1
* item 2
* item 3

# Will work, but degrades readibility
array = item 1
array = item 2
array = item 3
```

2. Don't scatter array items over the document.
```qark
array|
* item 1

...

# Makes it more difficult to see the values of "array" at a glance.
array|
* item 2
* item 2
```
:::

## Object arrays

Array entries are great for arrays of single values. However, what if we want to serialize something like this:

```csharp
var items = new List<Item>();

public struct Item
{
    public string name;
    public float value;
}
```

This is where we use object arrays. In short: put a number in the path to identify items.

```qark
items.0.name = "Item 1"
items.0.value = 1
items.1.name = "Item 2"
items.1.value = 7
```

In C#, the above could represent a structure like this:

```csharp
var items = new List<Item>()
{
    new Item()
    {
        name = "Item 1".
        value = 1f
    },
    new Item()
    {
        name = "Item 2",
        value = 7f
    }
};
```

:::warning
The actual numbers aren't important. When deserializing, new items will be created when their path for the item will be different.

```qark
# This will create new items "Item 1" and "Item 2"
# It's possible to use other values than just numbers, but it's not recommended
items.asd.name = Item 1
items.asd.value = 1
items.692.name = Item 2
items.692.value = 7
```
:::

To further improve on the experience, you can use `@` and `_` instead of the numbers.

| Character | Behaviour |
| :-- | :-- |
| `@` | Get's replaced by an incremented number. |
| `_` | Get's replaced by the previous number. |

```qark
items.@.name = Item 1
items._.value = 1
items.@.name = Item 2
items._.value = 7
```

...is the same as...

```qark
items.0.name = Item 1
items.0.value = 1
items.1.name = Item 2
items.1.value = 7
```

:::note
These numbers are path-specific. When used on a path with a different beginning, the number will start over from 0.

```qark
# Full path: items.0.name
items.@.name = Item 1
# Full path: otherItems.0.name
otherItems.@.name = Item 2
# Full path: otherItems.1.name
otherItems.@.name = Item 3

# Full path: items.1.name
items.@.name = Item 4
:::

:::tip Good practives
1. Place array objects inside groups and use `@` and `_` for sub arrays.

```qark
--- items.@ ---
name = Item 1
children.@.name = Child 1
children._.age = 1
children.@.name = Child 2
children._.age = 2
---

--- items.@ ---
name = Item 2
children.@.name = Child 1
children._.age = 1
---
```
:::
