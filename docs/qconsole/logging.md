---
title: Logging
sidebar_position: 0
---

# Logging

qASIC's log system is made to support every logging setup for any project.

## How to log

### qDebug
The simplest way is to use `qDebug`:
```csharp
using qASIC;

...

qDebug.Log("Initializing something");
qDebug.LogWarning("It looks like something is about to break.");
qDebug.LogError("It broke :(");
```

You can also specify colors or tags that can be later assign colors in the console theme.

```csharp
using qASIC;

...

qDebug.Log("I am red", qColor.Red);
qDebug.Log("I am a log from the main menu.", "main_menu");
```

You can customize the default look of logs for an entire class or method.
```csharp
using qASIC;

[LogColor(0, 255, 0)]
[LogPrefix("MyClass")]
public class MyClass
{
    [LogPrefix("MyClass Init")]
    public void Start()
    {
        qDebug.Log("Initializing..."); //Result: '[MyClass Init] Initializing...' in green
        DoSomething();
        qDebug.Log("Done."); //Result: '[MyClass Init] Done.' in green
    }

    public void DoSomething()
    {
        qDebug.Log("Pretend I'm doing something"); //Result: '[MyClass] Pretend I'm doing something' in green

        //Logs that have a specified tag or color will ignore the color of the class
        qDebug.LogError("Something went wrong"); //Result: '[MyClass] Something went wrong' in red
    }
}
```

### Log to console

You can also log directly to the console. This is useful when having multiple console instances.
```csharp
var console = new qConsole();
console.Log("This log is blue.", qColor.Blue);
```

### Log to a logger
You can use a log manager, which you can register to a console or a qInstance.

```csharp
var console = new qConsole();
var logs = new LogManager();
console.Logs.RegisterManager(logs);

logs.Log("Hello");
```

:::warning
Messages logged before the log manager gets registered will not appear in the console!
:::

### How logging works

Every system in qASIC has it's own `Log Manager`. These managers get registered to each other to synchronize their log output. Most of the time, this ends at the `qConsole` which then outputs every log to the user. Commands also receive their own Log Manager when being executed, that gets unregistered after the command finishes.

The reason for this is to let you choose which messages you want to appear in the logs.

### Update a log
You are able to update a message, by logging it again.

```csharp
var log = qLog.CreateNow("This is my message.");
console.Log(log);
log.message = "The message has changed.";
console.Log(log);
```

This is useful when creating interactable commands.

### Sticky logs
Logs can be made "sticky", meaning that they will stay anchored to the bottom of the logs.

```csharp
var log = qLog.CreateNow("I am permanently attached!");
log.sticky = true;
console.Log(log);
```

You can manually unstick logs by running the `unstick` command.

Again, this is useful when creating interactable commands.
