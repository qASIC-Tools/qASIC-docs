---
title: How To Log
sidebar_position: 0
---

# How To Log

qASIC's log system is made to support every logging setup for any project.

## qDebug
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

## Log to console

You can also log directly to the console. This is useful when having multiple console instances.
```csharp
var console = new qConsole();
console.Log("This log is blue.", qColor.Blue);
```

## Log to a logger
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
