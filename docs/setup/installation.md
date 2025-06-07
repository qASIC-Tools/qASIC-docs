---
sidebar_position: 0
title: Installation
---

# Installation

Choose your version of qASIC:
- [C# project](#for-c-projects)
- [Stride Integration](#for-stride)

## For C# projects

1. Go to [qASIC's github page](https://github.com/qASIC-Tools/qASIC) and clone the repository to your computer.

2. Open the `src` folder.

3. Copy `qASIC.Core` and other folders containing the projects you want to use. The full list includes `qASIC.Core`, `qASIC.Console` and `qASIC.Options`.

4. Add the copied `.csproj` files that are inside of those folders to your project's dependencies.

## For Stride

:::note
As of the time of writing, qASIC doesn't have an official Stride implementation, so you have to follow the same steps as in [the C# projects guide](#for-c-projects).
:::