---
title: Official Implementations
sidebar_position: 2
sidebar_class_name: side-header-getting-started
---

# Official Implementations

qASIC has official implementations for some game engines...

...is what I would say, but it currently doesn't :/

## Available

None

## Planned

This list is organized by priority and likely chronological time of release.
- [Stride](https://www.stride3d.net/)
- [Unity](https://unity.com/)

## What are official implementations?

In order to make qASIC be easier to setup and integrate with an engine, there has to be additional code written. For example:
- Parsers for engine-specific values (vectors, colors, etc.)
- Ui interface for `qConsole`
- Ability to initialize components with engine-features

Of course, you are able to ignore the official implementations and use the base qASIC libraries with your own code to tie-them in. qASIC is created in a way where you don't have to modify the source code to make it work.

## FAQ

### What about Godot?

On one hand Godot seems like a great candidate for receiving the official implementation treatment. It has built-in* C# support and is open source.

However, I put an asterisk there, because to use C# you have to download a different version of the editor, that isn't available on platforms like [Steam](https://store.steampowered.com). A lot of Godot users use the base editor that doesn't have C# support, which would already limit qASIC's reach.

Instead of C# Godot uses GDScript - it's own proprietary language made for game development. GDScript can call C# methods, but it doesn't support certain C# features that make qASIC the easy-to-use library that it is. Instead of making you add an attribute to a method to make it a command, we would have to create a brand new Godot-specific way of creating commands and at that point, we would have an entirely different library at our hands.

Yet still, we haven't completely rolled out an official Godot implementation, because we believe in open source and Godot is something we would *really* want to support. It's most likely that the UI client for the **Remote Inspector** will be created with Godot, even if qASIC will not be supported.

So for today, this hasn't been decided yet and will most likely be put off to the very far future, after qASIC will become more feature-complete.
