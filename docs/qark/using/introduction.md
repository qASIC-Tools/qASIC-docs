---
title: Introduction
sidebar_position: 0
---

# Introduction

Outside of our application, qARK documents are stored as plain text. This is great for saving qARK to a text file, but not so great for reading and managing it in code. So instead, we use a **serializer**, to convert **plain text** to a **`qARK document`** and vice versa.

## qARK Document

The document is how we interact with qARK in code. It's a container for different types of elements such as comments or entries. We can create or deserialize one from text using a **serializer**.

## Storing values

When deserialized, values are stored as a string, so when adding or reading an entry's value, it first has to go through conversion.
