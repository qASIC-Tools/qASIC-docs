---
title: Configuration
sidebar_position: 0
---

# Configuration

There are many ways of configuring a `qConsole`.

## What can be configured

| Property  | Config Path | Description |
| :-- | :-- | :-- |
| `Name` | `name` | Name of the console that will be used in the Remote Inspector |
| `SetAsMain()` | `isMain` | When true, the console will be added to a static field `qConsole.Main` (singleton pattern) |
| `LogQDebug` | `logs.logQDebug` | Should `qDebug` logs be passed to the console? |
| `UseLogModifierAttributes` | `logs.useLogModifiers` | Should modifier attributes such as `LogColor` be used when styling logs? |
| `IncludeStackTraceInCommandExceptions` | `logs.traceInCommandExceptions` | Should the stack trace be included in command exceptions (e.g. when the argument count for the command is mismatched)? It's recommended to keep this set to false |
| `IncludeStackTraceInUnknownCommandExceptions` | `logs.traceInUnknownExceptions` | Should the stack trace be included in non-command exceptions. It's recommended to keep this set to true |
| --- | `logs.saveLogs` | When true, saving logs will be enabled |
| `Logs.RawFilePath` | `logs.logFilePath` | The path of where the logs should be saved |
| `Logs.FileLogFormat` | `logs.logFileFormat` | How the logs will be formatted in the logs file |
| `CommandList.AddBuiltInCommands` | `commandList.addBuiltIn` | If the built in commands should be added to the list. |
| `CommandList.FindCommands` | `commandList.findCommands` | If the command list should look for every `IConsoleLogic` class marked with the `qCommandMark` attribute |
| `CommandList.FindAttributeCommands` | `commandList.findAttributeCommands` | If the command list should look for every command created with the `qCommand` attribute |
| `CommandList.AddCommand` | `commandList.findAttributeCommands` | Use this is you want to manually add extra commands. |


## Configuring via the editor (Unity only)

TODO: add text here when I actually add this

:::tip Pros
- The simplest way of configuring
- Automatically integrates the console with the engine
:::

:::danger Cons
- Less control
:::

## Configuring via the editor (Stride only)

TODO: add text here when I actually add this

:::tip Pros
- The simplest way of configuring
- Automatically integrates the console with the engine
:::

:::danger Cons
- Less control
:::

## Manual

The simplest way of configuring a `qConsole` is to just do it via code.

```csharp
var cmds = new qCommandList()
    .AddBuiltInCommands()
    .FindCommands()
    .FindAttributeCommands();

var parser = new QuashParser();
// If you are using Stride
parser.ForStride();

var theme = new qConsoleTheme();
theme.defaultColor = qColor.White;
theme.warningColor = qColor.Yellow;
theme.errorColor = qColor.Red;
theme.customColors.Add("my_custom_color", qColor.Blue);

var console = new qConsole("example", cmds, parser)
{
    Instance = MyQasicInstance,
    Theme = theme,
    LogQDebug = true,
};

console.SetAsMain();

console.Logs.RawFilePath = "%APP%/logs.txt";
console.Logs.FilePathFormat = "[%TIME:HH:mm:ss.fff%] [%TYPE%] %MESSAGE%";

console.Logs.FileRenameOld("logs-old.txt")
    .FileWriteExisting();
```

:::note
Most of the things here are optional, to get a qConsole up and running you just need to instantiate it.

```csharp
var console = new qConsole("example");
```

The "example" name is also optional ;)
:::

:::tip Pros
- Full control over everything
- The most intuitive
- Good for code-only projects
- Can't be tampered with by end users
:::

:::danger Cons
- Configuration is hard-coded
:::

## Configuration in a text file

The console can be configured in a `.qark` file. Here's an example configuration:

```qark
# Used for identifying the console in the Remote Inspector
name = example
# When true, the console becomes a singleton
isMain = True

# LOGGING
--- logging ---
# If logs should be saved to a file
saveLogs = True
# Path of the log file
logFilePath = %APP%/logs.txt
# How logs will be formatted in the file
logFileFormat = [%TIME:HH:mm:ss.fff%] [%TYPE%] %MESSAGE%

# If the console should show qDebug messages
logQDebug = True
# If the console should style logs using the [LogColor] and [LogPrefix] attributes
useLogModifiers = True
# If the stack trace should be included in qCommand Exceptions (it's recommended to set this to false)
traceInCommandExceptions = False
# If the stack trace should be included in non qCommand Exceptions (it's recommended to set this to true)
traceInUnknownExceptions = True
---

# THEME
--- logTheme ---
# Colors of logs for each tag
default = rgb(255, 255, 255)
warning = rgb(255, 255, 0)
error = rgb(255, 0, 0)
settings = rgb(0, 0, 255)
settings_set = rgb(0, 0, 255)
settings_set_multiple = rgb(0, 0, 255)
settings_ensure_targets = rgb(0, 0, 255)
settings_init = rgb(0, 0, 255)
settings_save_success = rgb(0, 0, 255)
settings_load_success = rgb(0, 0, 255)
---

# COMMANDS
--- commandList ---
# If the built in commands should be added to the list
addBuiltIn = True
# If the command list should add every 'Command Logic' class marked with the [qConsoleMark] attribute
findCommands = True
# If the command list should add every command created with the [qCommand] attribute
findAttributeCommands = True
# List of manually defined command types that should be added
commands|

---
```

This file can be then loaded to a `qConsoleConfig`.

```csharp
using qASIC.Console;

var config = new qConsoleConfig();
config.LoadConfig("path/to/file.txt");

var console = config.CreateConsole()
```

:::tip Pros
- The easiest to implement in any engine or project
- Easy to modify
- Can be copied between projects
:::

:::danger Cons
- Depending on the way you load it, the txt file can be tampered with
- Can be more annoying to deal with than doing things via code
:::

## Configuration in a qConsoleConfig

You can also skip using a text file an configure everything in a `qConsoleConfig`.

```csharp
using qASIC.Console;

var config = qConsoleConfig.CreateDefault();
config.name = "example";
config.isMain = true;

var console = config.CreateConsole();
```

:::tip Pros
- As simple as the text file approach
- Everything is done in code
:::

:::danger Cons
- Not really recommended. By this point, you should just do it [manually](#manual)
:::
