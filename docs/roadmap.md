---
label: Roadmap
sidebar_position: 1
---

# Roadmap

qASIC is still in **active development**, meaning that there is still a lot in store in terms of features and functionality.

## Console
`status: nearing completion`

qConsole let's you run commands and view logs. As of the time of writing, it's nearing completion with most of the API being finalized. However, it's still far from complete.

Planned features
- history - an ability to cycle between previous commands
- script support - an ability to load and store user-scripts that can be executed via the console

## Options
`status: in development`

The Options Manager takes care of saving, loading and changing settings of your game / project. Currently it's usable, but most of the API needs to be changed and it likes to quite often throw exceptions when faced with non-ideal conditions.

Planned features
- less bugs :P
- better API
- ability to save only one setting

## Input Management
`status: planned`

The Input Manager will be a system that will... manage input.

...

It will take care of devices, players, ui prompts and more.

:::note
The Input Manager will take input **from your engine** (at least at first). The Input Manager only handles which device should correspond where and which button does what.
:::

Planned features:
- Input remapping
- Shortcut support
- Device support
- Gamepad support
- Easy switching between gamepad and keyboard
- Mixing input devices (e.g. gamepad and keyboard)
- Ability to automatically generate a dictionary of key icons from a folder with images
- Support for multiple players

## Remote Inspector

The Remote Inspector let's you externally connect to applications containing an active `qInstance` to inspect logs and run commands.

Currently, it's only a command line tool that can only be described as: it works. We plan on remaking it and creating a GUI version in Godot. 
