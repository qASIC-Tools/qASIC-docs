---
title: Formatting
sidebar_position: 4
---

# Formatting

## Tags

Logs have their own tags, which can be later used for changing their color in the console's output.

TODO: write more here.

## Format of `qLog.ToString`

You can change how the output of `qLog.ToString` looks with a format string.

```csharp
var format = "[%TIME:HH:mm:ss.fff%] [%TYPE:App,Usr,Int,Clr%] %MESSAGE%"
```

| Special value | Description |
| :-- | :-- |
| `%TIME%`, `%TIME:[format]%` | Gets replaced by the `time` field. You can also specify the [DateTime](https://learn.microsoft.com/en-us/dotnet/api/system.datetime.tostring?view=net-9.0#system-datetime-tostring(system-string)) format after the `:` character. |
| `%MESSAGE%` | Gets replaced by the `message` field. |
| `%TYPE%`, `%TYPE:[names]%` | Gets replaced by the `logType` field. You can also specify names for the values of the `LogType` enum: `%TYPE:Application,User,Internal,Clear%`.  |
| `%TAG%` | Gets replaced by the `tag` field. |
| `%COLOR%` | Gets replaced by the `color` field. |
| `%%` | Gets replaced by the % character. |
