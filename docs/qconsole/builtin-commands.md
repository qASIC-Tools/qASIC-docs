---
sidebar_position: 2
title: Built-in Commands
---

# Built-in Commands

qASIC includes many built-in methods. For more information about any of them, try running `help [command name]` in the console.

## Console commands

These are commands that are added by default or when calling `AddBuiltInCommands` on the command list.

| Name | Aliases | Description |
| :-- | :-- | :-- |
| `clear` | `cls`, `clr` | Clears the console. |
| `echo` | `print` | Echos a message. |
| `exit` | `quit` | Closes the application. |
| `helloworld` | `hello` | Logs a test message to the console. |
| `help` | none | Displays a list of all available commands. |
| `remote` | none | Shows information about the remote inspector server. |
| `sleep` | `wait` | Does nothing for the specified amount of time. |
| `unstick` | none | Unsticks all logs marked as sticky. |
| `version` | `info`, `about` | Displays current project version. |

All of these commands can be configured in the console configuration file.

```python
# General template for every built-in command
--- commandList.commandConfig.clear ---
commandName = clear
aliases|
* cls
* clr

description = Clears the console.
detailedDescription = 
---

# On top of the above, some commands have additional things you can configure
--- commandList.commandConfig.hello ---
# The message that will be logged when running the command
helloMessage = Hello World :)
# The tag of the logged message
tag = 
# The color of the logged message
color = rgb(0, 255, 0)
---

--- commandList.commandConfig.help ---
# Whenever to split commands into multiple pages
multiplePages = True
# The amount of commands displayed on a single page
pageCommandLimit = 16
# Defines if it can display information about a command
allowDetailedDescription = True
---
```

## Option commands

These are commands that are added when calling `AddBuildInOptionsCommands` on the command list.

| Name | Aliases | Description |
| :-- | :-- | :-- |
| `applyoptions` | `applysettings`, `optionsapply`, `settingsapply` | Saves options to disk. |
| `changeoption` | `setoption`, `changesetting`, `setsetting` | Changes the value of an option. |
| `optionslist` | `settingslist`, `listoptions`, `listsettings` | Shows a list of options. |
| `revertoptions` | `revertsettings`, `optionsrevert`, `settingsrevert` | Loads options from disk while discarding any unsaved changes. |