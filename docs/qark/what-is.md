---
sidebar_position: 0
title: What is qARK?
---

# What is qARK?

qARK is qASIC's own markup language. It's the default option in all qASIC systems when trying to save something to a text file

## Why didn't you use _ instead?

Quite early in development there was a problem with serialization. Because qASIC is made to work with any engine that supports C#, it needs to be as disconnected from other dependencies as it can. For example: Newtonsoft.Json would be a great contendor, but it doesn't exist in Unity*.

:::note
*There is a package made for internal use by Unity, but we can't have certainty that it will always be maintained or avaliable to public.
:::

## What is qARK for?

The format is made for writing configurations and settings. It isn't great for serializing objects, however it is possible to use it for that.
