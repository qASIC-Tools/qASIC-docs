---
title: Serialization
sidebar_position: 1
---

# Serialization

Outside of code, qARK is contained as text. Inside of code, **we read and write to qARK using a `qARKDocument`**.

Conversion between these two containers is handled by a `qARKSerializer`.

## Serializing (doc to text)

To convert a `qARKDocument` to text, we use `qARKSerializer.Serialize`.

```csharp
var serializer = new qARKSerializer();
var doc = new qARKDocument();

//Fill the document however you want

var txt = serializer.Serialize(doc);
```

## Deserializing (text to doc)

To convert text to a `qARKDocument`, we use `qARKSerializer.Deserialize`.

```csharp
var serializer = new qARKSerializer();
var txt = @"example=value

--- group ---
name = Example
age = 10
---"

var doc = serializer.Deserialize(txt);
```

